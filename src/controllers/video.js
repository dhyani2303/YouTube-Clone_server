const Video = require("../models/Video");
const User = require("../models/User");
const {
  successResponse,
  successResponseWithData,
  notFoundResponse,
  validationError,
  forbidden,
} = require("../utils/apiResponse.helper");

//create a video
const addVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, desc, imgUrl, videoUrl } = req.body;
    const newVideo = await Video.create({
      userId: userId,
      title: title,
      desc: desc,
      imgUrl: imgUrl,
      videoUrl: videoUrl,
    });
    console.log(newVideo);
    successResponseWithData(
      res,
      "New Video has been added successfully",
      newVideo
    );
  } catch (err) {
    next(err);
  }
};
//delete a video
const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      next(notFoundResponse(res, "Video not Found"));
    }
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      successResponse(res, "Successfully Deleted the video");
    } else {
      next(forbidden(res, "You can delete only your video"));
    }
  } catch (err) {
    next(err);
  }
};
//update a video
const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      next(notFoundResponse(res, "Video not Found"));
    }
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      successResponseWithData(
        res,
        "Successfully Updated the video",
        updatedVideo
      );
    } else {
      next(forbidden(res, "You can update only your video"));
    }
  } catch (err) {
    next(err);
  }
};
//find a video
const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    successResponseWithData(res, "The Video is", video);
  } catch (err) {
    next(err);
  }
};

const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    successResponse(res, "The view has been increased");
  } catch (err) {
    next(err);
  }
};

const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    successResponseWithData(res, "", videos);
  } catch (err) {
    next(err);
  }
};
const trendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    successResponseWithData(res, "", videos);
  } catch (err) {
    next(err);
  }
};

const subVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

      const list =await Promise.all(
        subscribedChannels.map(async(channelId)=>{
            return await Video.find({userId:channelId});
        })
      )
      console.log(list);
 //  const videoDetailsMap = new Map();

    // await Promise.all(
    //   subscribedChannels.map(async (channelId) => {
    //     const videos = await Video.find({ userId: channelId });
    //     console.log(videos);
    //       videoDetailsMap.set(channelId, videos);
    //   })
    // );

    // console.log(videoDetailsMap);

    // successResponseWithData(res, "", videoDetailsMap);
  } catch (err) {
    next(err);
  }
};

const video = {
  addVideo,
  deleteVideo,
  updateVideo,
  getVideo,
  addView,
  randomVideo,
  trendVideo,
  subVideo,
};

module.exports = video;
