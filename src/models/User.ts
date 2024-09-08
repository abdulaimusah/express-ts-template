import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  rowndId: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    rowndId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    profilePicture: { type: String },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
