const express=require("express");
const auth_router=express.Router();
const auth_data=require("../Controller/authController")

auth_router.post("/create-user",auth_data.registerController);
auth_router.post("/signin",auth_data.signinController);


module.exports=auth_router;