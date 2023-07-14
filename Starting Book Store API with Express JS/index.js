import express from "express";

const app=express()

const books=[
    {
        id:1,
        title:"Black Swan",
        descriptions:"About",
        price:10,
        cover:"Soft cover"
    },
    {
        id:1,
        title:"Black Swan",
        descriptions:"About",
        price:10,
        cover:"Soft cover"
    },
    {
        id:1,
        title:"Black Swan",
        descriptions:"About",
        price:10,
        cover:"Soft cover"
    },
];

const PORT=8800;

app.get("/api/books",(req,res)=>{
    res.json(books);
})

app.listen(PORT,()=>{
    console.log(`server is Runing ${PORT}`);
})