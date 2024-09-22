import mongoose from "mongoose";


const uri:string = "mongodb+srv://deepan:deepan@full-auth.6wvin9k.mongodb.net/Sample-Auth"

export const connection = async (): Promise<void> =>{

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB with Mongoose');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error connecting to MongoDB:', err.message);
        } else {
          console.error('Unknown error occurred while connecting to MongoDB');
        }
        process.exit(1); // Exit the process with a failure code
      }

}