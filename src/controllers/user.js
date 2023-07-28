const {successResponse,
	successResponseWithData,
	notFoundResponse,
	validationError,
	notAuthenticated,
	forbidden}=require("../utils/apiResponse.helper");
   const User=require("../models/User");


const update=async (req,res,next)=>{
  //  console.log(req.params.id);
   // console.log(req.user.id);
    if(req.params.id===req.user.id){
       
       try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        successResponseWithData(res,"Sucessfully Updated",updatedUser);

       }catch(err){
        next(err)
       }

    }else{
        forbidden(res,"You can only update your account");

    }
};
const deleteUser=async (req,res,next)=>{
    if(req.params.id===req.user.id){
       
        try{
       await User.findByIdAndDelete(req.params.id);
         successResponse(res,"User has been deleted");
 
        }catch(err){
         next(err)
        }
 
     }else{
         forbidden(res,"You can only delete your account");
 
     }
}
const getUser=async (req,res,next)=>{
     
        try{
         const foundUser=await User.findById(req.params.id,{password:0,_id:0});
         successResponseWithData(res,"User has been found!",foundUser);
 
        }catch(err){
         next(err)
        }
}
const subscribe=async (req,res,next)=>{
       
        try{
       await User.findByIdAndUpdate(req.user.id,{
        $push:{subscribedUsers:req.params.id}
       });
       await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1},
       });
       successResponse(res,"Subscription Successfull!");
 
        }catch(err){
         next(err)
        }
 
     
}
const unsubscribe=async (req,res,next)=>{ 
        try{
            await User.findByIdAndUpdate(req.user.id,{
                $pull:{subscribedUsers:req.params.id}
            });
            await User.findByIdAndUpdate(req.params.id,{
                $inc:{subscribers:-1},
               });
               successResponse(res,"Unsubscribed the Channel successfully!");
 
        }catch(err){
         next(err)
        }
 
}
const like=async (req,res,next)=>{
    if(req.params.id==req.user.id){
       
        try{
         const updatedUser=await User.findByIdAndUpdate(req.params.id,{
             $set:req.body
         },{new:true})
         successResponseWithData(res,"Sucessfully Updated",updatedUser);
 
        }catch(err){
         next(err)
        }
 
     }else{
         forbidden(res,"You can only update your account");
 
     }
}
const dislike=async (req,res,next)=>{
    if(req.params.id==req.user.id){
       
        try{
         const updatedUser=await User.findByIdAndUpdate(req.params.id,{
             $set:req.body
         },{new:true})
         successResponseWithData(res,"Sucessfully Updated",updatedUser);
 
        }catch(err){
         next(err)
        }
 
     }else{
         forbidden(res,"You can only update your account");
 
     }
}


const user={update,deleteUser,getUser,subscribe,unsubscribe,like,dislike}

module.exports=user;