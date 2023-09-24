const mongoose=require("mongoose");
const url="mongodb://localhost:27017/mentorAssignment";
var mongooseOptions = {  useNewUrlParser: true }
 function dbConnect(){
    mongoose.connect(url);
   var con=mongoose.connection;
   con.on("open",function(){
    console.log("connected to database");
   })

 }

module.exports=dbConnect;
