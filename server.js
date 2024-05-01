require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const dbConnect = require('./config/dbConnect');
const userRoutes = require('./routes/users');
const isAuthenticated = require('./middlewares/isAuth');
const app = express();
const PORT = process.env.PORT;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.json({msg:"Welcome to the Task App API"});
})

app.use('/api/v1/users',userRoutes);

// coba
app.get("/dashboard", isAuthenticated, (req, res)=>{
    const username = req.userData.username;
    res.json({status:"succes",msg:`Hi ${username} Welcome to the dashboard`});
});

app.listen(PORT,console.log(`Server is running on port ${PORT}`));

