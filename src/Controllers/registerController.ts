import { Request,Response } from "express"
import RegisterModel from "../Models/Register";
import { hashPassword, verifyPassword } from "../Helpers/bcrypt";
import { createToken } from "../Helpers/jwt";
import { AuthRequest } from "../Interface/RegisterInterface";


export const registerUsers = async ( req : Request, res : Response)=>{

   try {
    const {name ,email,password,conformPassword} = req.body;

    // Validate the inputs
    if(!name ||!email ||!password ||!conformPassword){
        return res.status(400).json({msg: "All fields are required"});
    }

    // Check if the password and conform password match
    if(password !== conformPassword){
        return res.status(400).json({msg: "Passwords do not match"});
    }

    // Check if the email is already registered
    const existingUser = await RegisterModel.findOne({email});
    if(existingUser){
        return res.status(400).json({msg: "Email already exists"});
    }

    const hashPass: string = await hashPassword(password);

    // Create a new user
    const newUser = new RegisterModel({name,email,password:hashPass});

    // Save the user to the database
    await newUser.save();

    const jwtToken:string =  createToken(email);

    res.status(201).json({msg: "User registered successfully",token:jwtToken});

   } catch (error) {
    return res.status(500).json({msg:"Server Error", error})
   }
}

export const login = async(req:Request, res:Response) => {


    try {
        const {email, password} = req.body;

        // Validate the inputs
        if(!email ||!password){
            return res.status(400).json({msg: "All fields are required"});
        }

        // Check if the email is registered
        const user = await RegisterModel.findOne({email});
        if(!user){
            return res.status(401).json({msg: "User Not Found"});
        }

        // Check if the password matches
        const isMatch: boolean = await verifyPassword(password,user.password);
        if(!isMatch){
            return res.status(401).json({msg: "Password Not Match"});
        }
        const jwtToken: string = createToken(email);

        res.status(200).json({msg: "User logged in successfully", token:jwtToken});
    }
    catch (error) {
        return res.status(500).json({msg:"Server Error", error})
    }

}


export const userData =async(req:AuthRequest, res:Response) =>{

   try {
    const user = req.user;
    const userDatas = await RegisterModel.findOne({email:user.email}).select('-password')
    if(!userDatas){
        return res.status(401).json({msg: "User Not Found"});
    }
    res.status(200).json({msg: "fetch successfully",data:userDatas});

   } catch (error) {
    return res.status(500).json({msg:"Server Error",error});
   }
}

export const delUser = async(req:AuthRequest, res:Response) =>{

    try {
        const user = req.user;
        const deletedUser = await RegisterModel.findOneAndDelete({email:user.email});
        if(!deletedUser){
            return res.status(401).json({msg: "User Not Found"});
        }
        res.status(200).json({msg: "User deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({msg:"Server Error",error});
    }

}