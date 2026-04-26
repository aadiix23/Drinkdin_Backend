import User from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export const registerUser = async (data) => {
    const { fullname, age, username, password, email,isVerified } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User Already Exist");


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "alokvv230@gmail.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
    const mailVerification = async () => {
        try {
            await transporter.verify();
            console.log("Server is ready to take our messages");
        } catch (err) {
            console.error("Verification failed:", err);
        }
    }
    mailVerification();
    const otp = crypto.randomInt(1000, 9999);

    const mailOptions = async () => {
        try {
            const info = await transporter.sendMail({
                from: '"Drinkdin" <alokvv230@gmail.com>',
                to: email,
                subject: "OTP For Verification",
                text: `Your Otp For Verificaion Is ${otp}`,
            });

            console.log("Message sent: %s", info.messageId);
        } catch (err) {
            console.error("Error while sending mail:", err);
        }
    }

    mailOptions();  
     const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullname,
        age,
        username,
        email,
        password: hashedPassword,
        isVerified:false,
        otp
    });
};
    
    export const verifyOtp = async(email,otp)=>{
        const user = await User.findOne({email});
        if(!user) throw new Error("User Not Found");
        if(user.otp!=otp){
            throw new Error ("Invalid Otp")
        }
        else {
            user.isVerified=true;
            user.otp=null;
            await user.save();
            return generateToken(user);
        }       
    }

export const loginUser = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    return generateToken(user);
};
export const googleAuth = async (profile) => {
    const { email, name, sub } = profile;

    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            fullname: name,
            email,
            googleId: sub,
            age: 0
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