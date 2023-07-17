import express from "express"
import multer from "multer"
import path from "path"

const router=express.Router()

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },filename:function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g,"-")+file.originalname);
    }
})
const upload=multer({storage:storage})

router.post("/",upload.single("image"),(req,res)=>{
    res.status(200).json({message:"image upload"});
})

export default router;