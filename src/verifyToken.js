const jwt=require("jsonwebtoken");
const{notAuthenticated,forbidden}=require("./utils/apiResponse.helper");
const dotenv=require("dotenv");
dotenv.config();
const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(notAuthenticated(res,"You are not authenticated!"));
       
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
       // console.log(token);
        if(err){
          //  console.log(err);
       return next(forbidden(res,"Token expired or invalid"));
        }
        req.user=user;
        next();
    });
}
module.exports=verifyToken;