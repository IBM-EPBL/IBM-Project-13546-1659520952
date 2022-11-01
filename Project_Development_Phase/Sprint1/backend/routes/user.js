const Users = require("../models/User")
const express = require('express');
const router = express.Router();
const Joi = require('joi');



router.get('/',(req,res)=>{
    res.send("Hello i am user ")
})

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    college : Joi.string().required(),
    department : Joi.string().required(),
    domain : Joi.string().required(),
    password: Joi.string().required(),
})

router.post('/register', async (req,res)=>{

    const {error,value} = registerSchema.validate(req.body)

    if(error){
        return res.status(400).json(error.details[0].message);
    }
    console.log(req.body)
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new Users({
            name: req.body.name,
            email: req.body.email,
            college : req.body.college,
            department : req.body.department,
            domain : req.body.domain,
            password: req.body.password,
        });
        await user.save().then(data =>{
            res.status(200).json(data)
        }).catch(error =>{
            res.status(400).json(error)
        });
    }

})

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})


router.post('/login', async (req , res)=>{
    const {error , value} = loginSchema.validate(req.body)

    if(error){
        return res.status(400).json(error)
    }
    let user = await Users.findOne({ email: req.body.email });
    if (user) {

        if(user.password === req.body.password){
            return res.status(200).json(user);
        }else{
            return res.status(400).json("wrong credentials")
        }
    
    }else{
        return res.status(400).json("not registed")
    }
})




module.exports = router;