import { Document } from 'mongoose';
import { Request } from 'express';


export interface IUsers extends Document {
  name: string;
  email: string;
  password: string;
}

export interface AuthRequest extends Request{
    user?: any; // Add user information here if needed.
}