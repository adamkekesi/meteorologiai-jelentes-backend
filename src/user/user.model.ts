import { Schema, model } from "mongoose";
import IUser from "./user.interface";

const addressSchema = new Schema(
    {
        city: String,
        country: String,
        street: String,
    },
    { versionKey: false },
);

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
        },
        auto_login: {
            type: Boolean,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String], // Array of string
            required: true,
        },
    },
    { versionKey: false },
);

const userModel = model<IUser>("users", userSchema);

export default userModel;
