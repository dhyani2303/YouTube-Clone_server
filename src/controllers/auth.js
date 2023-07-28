const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const apiResponse=require("../utils/apiResponse.helper");
const dotenv=require("dotenv");
const jwt = require('jsonwebtoken');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const {
  successResponse,
  successResponseWithData,
  notFoundResponse,
  validationError,
} = apiResponse;

dotenv.config();


//SignUp Authentication
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const EmailExists = await User.find({ email }, { email: 1, _id: 0 });
      if (EmailExists.length) {
        validationError(res, "Email id already exists");
      } else {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          const newUser = await User.create({
            name: name,
            email: email,
            password: hash,
          });
          if(newUser){
            successResponse(res,"New User has been registerd!");
          }
        });
      }
    }else{
        validationError(res,"Enter all the details");
    }
  } catch (err) {
       console.log(err.message);
  }
};

// Sign In Authentication
const signin=async (req,res)=>{
try{
const email=req.body.email;
//console.log(email);
const login=await User.findOne({email});
//console.log(login);
if(login){
  bcrypt.compare(req.body.password,login.password,(err,result)=>{
    if(result==true){
      const data={
        email:email,
        name:login.name,
        subscribers:login.subscribers,
        subscribedUsers:login.subscribedUsers
      }
      const token=jwt.sign({id:login._id},process.env.JWT)
      res.cookie("access_token",token,{
        httpOnly:true
      }).status(200).json(data);
      
    }else{
      validationError(res,"Incorrect Password");
    }
  })
}else{
  notFoundResponse(res,"User doesn't exist");
}
}catch(err){
  console.log(err.message);
}
}

const auth={signup,signin};
module.exports=auth;
