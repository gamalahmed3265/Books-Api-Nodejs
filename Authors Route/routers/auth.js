import express from "express";
import Joi from "joi";

const router=express.Router();


const users=[
    {
        id:1,
        name:"Nasim",
        lastName:"Tablbt",
        nationality:"Labanon",
        image:"2.png"
    },
    {
        id:2,
        name:"gamal",
        lastName:"ahmed",
        nationality:"egyption",
        image:"1.png"
    }
]

router.get("/", (req, res) => {
    res.json(users);
})
router.get("/:id", (req, res) => {

    const user = users.find((b => b.id === parseInt(req.params.id)))
    console.log(user);
    if (book) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})

router.post("/", (req, res) => {

    const {error} = validateCreateUser(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message})
    }
    const user = {
        id: users.length + 1,
        name: req.body.name,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    }
    users.push(user);
    if (user) {
        res.status(200).json(users);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})

router.put("/:id",(req,res)=>{
    const {error}=validateUpdatUser(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message})
    }

    const user=users.find(b=>b.id=== parseInt(req.params.id));

    if(user){
        res.status(200).json({message:"user has been update"});
    }
    else{
        res.status(404).json({message:"user not found"});
    }
})
// module.exports=router;

function validateCreateUser(obj){
    return Joi.object({
        name: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(3).max(500).required(),
        image: Joi.string().trim().required(),
    }).validate(obj);
}
function validateUpdatUser(obj){
    return Joi.object({
        name: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(3).max(500),
        image: Joi.string().trim(),
    }).validate(obj);
}


export default router;