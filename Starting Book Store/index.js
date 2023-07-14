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
        id:2,
        title:"Black Swan",
        descriptions:"About",
        price:10,
        cover:"Soft cover"
    },
    {
        id:3,
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
app.get("/api/books/:id",(req,res)=>{
    
    const book=books.find((b=>b.id== parseInt(req.params.id)))
    console.log(book);
    if(book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({message:"not found"});
    }
})

app.listen(PORT,()=>{
    console.log(`server is Runing ${PORT}`);
})