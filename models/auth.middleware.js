import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {jwt} from "jsonwebtoken"
import { User } from "./user.model";


export const verifyJWT = asyncHandler(async(req , res , next)=>
{
    try {
        const token = req.cookies.accessToken?.accessToken || req.header
        ("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user =  await User.findById(decodedToken?._id).select
        ("-password - refreshToken")
    
        if(!user){
            
            throw new ApiError(401 , "Invcalid acess token ")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid acess Token")

    }

})

