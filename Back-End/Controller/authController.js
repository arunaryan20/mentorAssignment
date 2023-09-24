const authSchema=require("../Models/authModel")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const registerController=async(req,res)=>{
       try{
               var {name,email,phone,password}=req.body;
               if(!name || !phone || !email || !password){
                res.status(404).json({success:false,message:"All fields are required"})
               }else{
                   const data_exist= await authSchema.findOne({email:email})
                   if(data_exist){
                        res.status(200).json({success:true,message:"data already exist",data:data_exist})
                   }else{
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt,async function(err, hash) {
                           if(err){
                            res.status(400).json({success:false,message:"passoword encryption error",error:err})
                           }else{
                            password=hash;
                            const save_data=await authSchema.create({
                                name,
                                email,
                                phone,
                                password,
                            })
                            res.status(201).json({success:true,message:"User created",data:save_data})
                           }
                        });
                    });
                   
                   }
               }        

       }catch(error){
           res.status(400).json({success:false,message:"This is register controller error"})
       }
}
const signinController=async(req,res)=>{
             try{
                 const {email,password}=req.body;
                 if(!email || !password){
                    res.status(400).json({success:false,message:"All fields are required"})
                 }else{
                          const data=await authSchema.findOne({email:email});
                          if(!data){
                            res.status(404).json({success:true,message:"User not found"})
                          }else{
                            const isMatch=await bcrypt.compare(req.body.password,data.password);
                            if(isMatch){
                                jwt.sign({data},"secretkey", { expiresIn: '1d' }, function(err, token) {
                                    if(err){
                                        res.status(400).json({success:false,message:"Token creating error",error:err})
                                    }else{
                                        res.status(200).json({success:true,message:"data accessible",data:data,token:token})
                                    }
                                  }); 
                            }else{
                                res.status(404).json({success:true,message:"password does not match"})
                            }
                          }
                 }
             }catch(error){
                 res.status(400).json({success:false,message:"SignIn controller error",error:error})
             }
}
module.exports={registerController,signinController};