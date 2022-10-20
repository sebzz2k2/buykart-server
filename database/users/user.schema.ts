import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isUser: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
