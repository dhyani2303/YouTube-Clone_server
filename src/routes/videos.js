const express=require("express");
const verifyToken = require("../verifyToken");
const {addVideo,deleteVideo,updateVideo,getVideo,addView,randomVideo,trendVideo,subVideo}=require("../controllers/video");

const router=express.Router();

//Create a video
router.post("/",verifyToken,addVideo);

//delete a video
router.delete("/:id",verifyToken,deleteVideo);

//update a video
router.put("/:id",verifyToken,updateVideo);

//get a video
router.get("/find/:id",getVideo);

//view a video
router.put("/view/:id",addView);

//to get trending videos
router.get("/trend",trendVideo);

//random videos on home page

router.get("/random",randomVideo);

//get video of subscribed channel
router.get("/sub",verifyToken,subVideo)





module.exports=router;