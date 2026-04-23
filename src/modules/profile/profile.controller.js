import * as profileService from './profile.service.js'
import mongoose from 'mongoose'

export const getProfile = async(req,res)=>{
    try {
        const profile = await profileService.getProfile(req.user.id);
        res.status(200).json({details:profile})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}