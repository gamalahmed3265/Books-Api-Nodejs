import express from "express";
import Joi from "joi";
import AuthModel from "../models/auth.js"
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const usersList = await AuthModel.find()
        res.status(200).json(usersList);

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
})
router.get("/:id", async (req, res) => {
    try {
        const user = await AuthModel.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.post("/", async (req, res) => {

    const { error } = validateCreateUser(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    try {
        const authuser = AuthModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });
        const reults = await authuser.save();
        res.status(200).json(reults);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", err: err });
    }
})

router.put("/:id", (req, res) => {
    const { error } = validateUpdatUser(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }

    const user = users.find(b => b.id === parseInt(req.params.id));

    if (user) {
        res.status(200).json({ message: "user has been update" });
    }
    else {
        res.status(404).json({ message: "user not found" });
    }
})
// module.exports=router;

function validateCreateUser(obj) {
    return Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(3).max(500).required(),
        image: Joi.string().trim(),
    }).validate(obj);
}
function validateUpdatUser(obj) {
    return Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(3).max(500),
        image: Joi.string().trim(),
    }).validate(obj);
}


export default router;