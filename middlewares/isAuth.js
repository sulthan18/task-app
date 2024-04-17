const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
        return res.json({status:"failed", msg:"Please login again"});
    }
    jwt.verify(token, process.env.TASKIA, (err, decoded) => {
        if (err) return res.json({status:"failed", msg:"Something error"});
        req.userData = decoded;
        next();
    });
};

module.exports = isAuthenticated;