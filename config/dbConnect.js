const mongoose = require('mongoose');

const dbConnect = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/taskia");
        console.log("Mongodb connected succesfully");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;