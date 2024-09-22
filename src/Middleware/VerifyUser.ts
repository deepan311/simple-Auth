import { NextFunction, Request , Response } from "express";
import { verifyToken } from "../Helpers/jwt";
import { AuthRequest } from "../Interface/RegisterInterface";



export const verifyUser = async(req:AuthRequest, res:Response, next:NextFunction)=>{


    const token = req.headers['token'] as string; // Type assertion
        


    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        // Verify token here
        const user = await verifyToken(token);
        
        // Assuming `user` contains user information after verification
        if (!user) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Optionally attach user to request object
        req.user = user; // Make sure to extend the Request interface to include `user`
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to verify token', error });
    }
}