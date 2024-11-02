import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const protectedMiddleware = asyncHandler( async(req, res, next)=> {
    let token;
    token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401).json({
                mssg: 'no authorization token fail',
            })
        }
    } else {
        res.status(401).json({
            mssg: 'you are not authorized to access this route',
        })
    }
}) 