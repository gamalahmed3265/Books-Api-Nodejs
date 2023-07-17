import mongoose from "mongoose";

export function connectDB(){
    mongoose.connect(process.env.URLMONGOOSE).then(()=>{
        console.log("Connected to MongoStoreDB");
    }).catch((err)=>{
        console.log(err);
    })
}