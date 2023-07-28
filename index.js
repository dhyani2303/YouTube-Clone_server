const express=require('express');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
const authRoutes=require("./src/routes/auth");
const userRoutes=require("./src/routes/users");
const videoRoutes=require("./src/routes/videos");
const commentRoutes=require("./src/routes/comments");
const cookieParser =require("cookie-parser");
const cors=require("cors");
const app=express();
app.use(express.urlencoded({ extended: false }));

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const connect=()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Database Connection Sucessful");

    }).catch(err=>{
        throw err;
    })
}

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
//app.use('/api/comment',commentRoutes);
app.use('/api/video',videoRoutes);

app.listen(process.env.PORT,()=>{
    connect()
    console.log("Server Connection Successful");
})