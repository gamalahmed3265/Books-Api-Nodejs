import { createServer } from "http";

const server=createServer((req,res)=>{
    if(req.url==="/"){
        res.write("welcome");
        res.end();
    }
});

const PORT=8800



server.listen(PORT,()=>{
    console.log("sever is runing "+PORT);
})