const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const User = require("../models/User");
const router = express.Router();

router.delete('/deleteuser/:id',fetchUser,async(req,res)=>{
    let success = false;
    try{
        let user = await User.findById({_id:req.params.id});
        if (!user) {
            return res.status(404).send("Not Found");
        }
        success = true;
        user = await User.findByIdAndDelete(req.params.id);
        res.json({ success,message: "Successfully Deleted", user: { user } });
    }
    catch (error) {
        success = false;
        console.error(error.message);
        res.status(500).json({ success,error: "Interval server error" });
    }
})
module.exports = router;