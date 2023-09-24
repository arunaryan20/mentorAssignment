const express=require("express");
const app=express();
const cors=require("cors");
const dbConnect = require("./config");
const auth_router = require("./Routes/authRoutes");

dbConnect();
app.use(express.json());
app.use(cors())


app.use("/auth",auth_router)


app.listen(8084);