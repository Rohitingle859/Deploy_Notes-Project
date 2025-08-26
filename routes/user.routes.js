const express = require("express")

const bcrypt = require("bcrypt")
const { UserModel } = require("../model/users.model")

const jwt = require("jsonwebtoken")

const userRouter = express.Router()


userRouter.post("/register",async(req,res)=>{
    //console.log("Request body:", req.body);
    const {username,email,password} =req.body // destrucutring i need to has my password 
    try {
        bcrypt.hash(password,8,async(err, hash)=> {
            if(err){
                res.status(200).json({err:err})
            }
            else{
                const user = UserModel({username,email,password:hash})
                await user.save()
                res.status(200).json({msg:"The New user has been registered...!"})
            }
        })
    } catch (error) {
        res.status(400).json({error,err})
    }
})


userRouter.post("/login", async(req,res)=>{
    const{email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        bcrypt.compare(password, user.password,(err, result)=> {
            if(result){
                const token = jwt.sign({userID:user._id, username:user.username}, // create a token 
                    "masai")
                res.status(200).json({msg:"Logged in...!", token })
            }else{
                res.status(200).json({error:err})
            }
    });

    } catch (error) {
        res.status(400).json({error})
    }
})
module.exports = {
    userRouter
}


// hashing is the one way process to stor the password in 