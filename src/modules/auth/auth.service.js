import User from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data) =>{
    const {fullname,age,username,password,email}=data;

    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error("User Already Exist");

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        fullname,
        age,
        username,
        email,
        password:hashedPassword
    });

    return generateToken(user);
};
 export const loginUser = async(data)=>{
    const {email,password}=data;

    const user = await User.findOne({email});
    if(!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error ("Invalid Credentials");

    return generateToken(user);
 };
 export const googleAuth = async(profile)=>{
    const{email,name,sub}=profile;

    let user = await User.findOne({email});
    if(!user){
        user = await User.create({
            fullname:name,
            email,
            googleId:sub,
            age:0
        });
    }
     return generateToken(user);    
 };

 const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};