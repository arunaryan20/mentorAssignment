const mongoose=require("mongoose");

const authSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please provide name"]
    },
    email:{
        type:String,
        require:[true,"please provide email"]
    },
    phone:{
        type:Number,
        require:[true,"please provide phone number"]
    },
    password:{
        type:String,
        require:[true,"please provide email"]
    }    
},{timestamps:true})

module.exports=mongoose.model('User',authSchema)