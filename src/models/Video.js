const mongoose=require('mongoose');

const VideoSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true

    },
    desc:{
        type:String,
        required:true
    },
    //thumbnail imageUrl
    imgUrl:{
        type:String,
        required:true
    },
    //video url
    videoUrl:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0,
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[],
    },
    dislikes:{
        type:[String],
        default:[]
    }
   
},
{timestamps:true}
);
const video=mongoose.model("Videos",VideoSchema);
module.exports=video;