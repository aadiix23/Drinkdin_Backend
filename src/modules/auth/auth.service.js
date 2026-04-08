const user = require("./auth.model");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");

export const registerUser = async (data) =>{
    const {fullname,age,username,password}=data;

    const existingUser = await User.find({email});
    if(existingUser) throw new Error("User Already Exist");

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await user.Create({
        fullname,
        age,
        username,
        password:hashedPassword
    });

    return generateToken(user);
};
 export const loginUser = async(data)=>{
    const {email,password}=data;

    const user = await user.findOne({email});
    if(!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error ("Invalid Credentials");

    return generateToken(user);
 };
 export const googleAuth = async(profile)=>{
    const{email,name,sub}=profile;

    let user = await User.findOne({email});
    if(!user){
        user = await User.Create({
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