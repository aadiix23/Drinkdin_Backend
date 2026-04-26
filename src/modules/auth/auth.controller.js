import e from "cors";
import * as authService from "./auth.service.js";
export const register  = async (req,res)=>{
    try{
        const registerUser = await authService.registerUser(req.body);
        res.json ({sucess:true,message:"Otp Sent To Email"})
    } catch (error){
        res.status(400).json({message:error.message});
    }
};

export const verifyOtp = async(req,res)=>{
    try {
    const token = await authService.verifyOtp(req.body.email,req.body.otp);
    res.status(200).json({sucess:true,message:"Email Verified Sucessfully",token})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
export const login = async(req,res)=>{
    try {
        const token = await authService.loginUser(req.body);
        res.json({sucess:true,token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

export const googlelogin = async(req,res)=>{
    try {
        const token = await authService.googleAuth(req.user);
        res.json({sucess:true,token})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};