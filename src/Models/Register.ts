
import mongoose ,{Schema} from "mongoose";
import { IUsers } from "../Interface/RegisterInterface";

const userSchema: Schema<IUsers> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true ,unique: true},
    password: { type: String, required: true},
  });
  

  const RegisterModel = mongoose.model<IUsers>('Users',userSchema);

  export default RegisterModel;