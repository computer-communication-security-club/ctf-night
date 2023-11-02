const jwt = require("jsonwebtoken")
const User = require("../models/User")
const {BadRequestError,UnauthenticatedError} = require("../errors")
const bcrypt = require("bcrypt")
const login = async (req,res) => {
    const {username,password} = req.body
    if (!username || !password )

        throw new BadRequestError("please provide username and password")
    try {
        const user = await User.findOne({username:username})
        if(!user) {
            return res.status(403).json({msg:"username or password is incorrect"})    
        }
        if (!bcrypt.compareSync(password,user.password)) {
          
            return res.status(403).json({msg:"username or password is incorrect"})
        }
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
       
        return res.status(200).json({success: true,token:token})
    } catch (error) {
        console.log(error);
        res.status(error.status).json({msg:error})        
    }
}

const dashboard = async (req,res) => {
    try {
        if (req.user.username == "admin")
            return res.status(200).json({msg:req.user.username,flag:process.env.FLAG})
        
        return res.status(403).json({msg:"unauthorizedd request"})
    } catch (error) {
        
        res.status(500).json({msg:"something wrong, try again later"})        
    }
}

const register = async (req,res) => {
    console.log(req.body);
    const {username,email,password,cf_password} = req.body
    console.log(username,email,password,cf_password);
    if (!username || !email || !password || !cf_password )
        return res.status(403).json({msg:"invalid request"})
        // throw new CustomAPIError("invalid request",403)
    if (password !== cf_password)
        return res.status(403).json({msg:"password didn't match"})
        // throw new CustomAPIError("password didn't match",403)
    try {
        const user = await User.find({email: email})
        if (!user)
            return res.status(404).json({msg:"user already exists"})
            // throw new CustomAPIError("user already exists",400)
        const hash_password = bcrypt.hashSync(password,16) 
        const new_user = await User.create({username:username,email:email,password:hash_password})
        if (new_user)
            return res.status(200).json({msg:"successful registered"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
}
module.exports = {login,register,dashboard}