const jwt = require('jsonwebtoken')
const Usermodel = require('../models/userModel')
const bcrypt = require('bcrypt')

const login = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }
    try {
        const userExisted = await Usermodel.findOne({email});
        if(!userExisted){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const PassCheck = await bcrypt.compare(password, userExisted.password);
        if(!PassCheck){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({id : userExisted._id,email: userExisted.email},process.env.JWT_SEC_Key,{expiresIn:'7d'});
        if(!token){
            return res.status(500).json({
                success: false,
                message: "Token generation failed"
            });
        }
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.Node_ENV ==="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });
        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully.",
            logintoken: token,
            name: userExisted.name
        })
    } catch (error) {
        console.error(error)   
    }
}

const register = async(req,res) =>{
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        return res.json("All fields are required.")
    }
    try {
        const userExisted = await Usermodel.findOne({email})
        if(userExisted){
            return res.status(400).json({success: false, message: "User Already Existed."})
        }
        const hashPassword = await bcrypt.hash(password,12)
        const addUser = new Usermodel({name,email,password:hashPassword});
        await addUser.save();
        return res.status(201).json({success: true, message: "User Created Successfully."})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server Error: " + error.message})
    }

}
const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logged out successfully' });
};

module.exports = {login, register, logout}