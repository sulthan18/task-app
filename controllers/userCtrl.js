const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/User');

const registerCtrl = async(req, res)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.json({status:"failed" ,msg:"Please enter all fields"});
    }
    try {
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.json({status:"failed" ,msg:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password:passwordHashed
        });

        res.json({status:"success" ,msg:newUser});
    } catch (error) {
        console.log(error);
    }
};

const loginCtrl = async(req, res) =>{
    const {email, password} = req.body;
    if (!email || !password) {
        return res.json({status:"failed" ,msg:"Please enter all fields"});
    }
    try {
        const userFound = await User.findOne({email});
        if (!userFound) {
            return res.json({status:"failed", msg:"Invalid login credentials"});
        }

        const isValid = await bcrypt.compare(password, userFound.password);
        if (!isValid) {
            return res.json({status:"failed", msg:"Invalid login credentials"});
        }

        const token = jwt.sign(
            {
                username : userFound.username,
                role : userFound.role
            },
            process.env.TASKIA,
            {
                expiresIn : "1h"
            }
        );

        res.cookie("token",token,{
            maxAge :3600000,
            httpOnly : true
        });

        res.json({
            message: "Login success",
            token,
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
        });
    } catch (error) {
        console.log(error);
    }
}

const logoutCtrl = (req, res) => {
    res.clearCookie("token");
    res.json({status:"success",message: "Logout success"});
}

module.exports = {registerCtrl, loginCtrl, logoutCtrl};