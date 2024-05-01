const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        profileImage: {
            type: String,
            default:"https://th.bing.com/th/id/OIP.R9HMSxN_IRyxw9-iE1usugAAAA?rs=1&pid=ImgDetMain"
        },
        tasks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }]
    },
    {timestamps:true}
);

const User = mongoose.model('User',userSchema);

module.exports = User