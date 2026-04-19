import * as authService from "./auth.service.js";
export const register  = async (req,res)=>{
    try{
        const token = await authService.registerUser(req.body);
        res.json ({sucess:true,token})
    } catch (error){
        res.status(400).json({message:error.message});
    }
};
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