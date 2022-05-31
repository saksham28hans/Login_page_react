const express = require("express");
const router = express.Router();
//Include express validator
const { body, validationResult } = require('express-validator');
const jwt_secret = "This is @ secret stri@@ng";
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require("../models/roles");
const ROLES = ["admin", "student","teacher"];

//Route 1 : Create a user using Post "/api/auth/create". No login required.

router.post('/create',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async(req,res) =>{
    let success = false;
    const error =  validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success,errors:error.array() });
    }
    try{
        let user = await User.findOne({email:req.body.email});
        if(user)
        {
            return res.status(400).json({success,error:"Sorry this emailID already exists"});
        }
        if(req.body.roles)
        {
            for(let i=0;i<req.body.roles.length;i++)
            {
                if (!ROLES.includes(req.body.roles[i])) {
                    res.status(400).send({success,
                      error: ` Role ${req.body.roles[i]} does not exist!`
                    });
                    return;
            }
        }
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass,
            usertype : req.body.usertype
        })
         
        if(req.body.roles)
        {
            Role.find(
                {
                  name: { $in: req.body.roles }
                },
                (err, roles) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  user.roles = roles.map(role => role._id);
                  user.save(err => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    
                  });
                }
            );
            }
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,jwt_secret);
        success = true;
        res.status(200).json({success,authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({success,error:"Interval server error"});
    }
})

//Route 2 : Login a user using Post "/api/auth/login". No login required.
router.post('/login',[
body('email').isEmail(),
body('password').exists()
], async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ success,error: errors.array() });
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success,error:"Please try to login with correct username and password"});
        }
        let pass_corr = await bcrypt.compare(password,user.password);
        if(!pass_corr)
        {
            return res.status(400).json({success,error:"Please try to login with correct username and password"});
        }
        const data = {
            user : {
                id : user.id
            }
        }
         const authToken = jwt.sign(data,jwt_secret);
         success = true;
         res.status(200).json({success,authToken});
           
         } catch (error) {
          console.error(error.message);
          res.status(500).json({success,error:"Interval server error"});
         }
})

//Route 3 Get all users
router.get('/users',async(req,res)=>{
    let success = false;
    try{
        const user_det = await User.find({$or:[{usertype:'student'},{usertype:'teacher'}]});
        if(!user_det)
        {
            return res.status(401).json({success,error:"No record found"});
        }
         success = true;
         res.status(200).json({success,user_det});
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({success,error:"Interval server error"});
    }
    

})
module.exports = router;