import { Schema, model } from "mongoose";
import ICity from "./city.interface";

const citySchema = new Schema(
    {
        _id: Number,
        code: {
            type: String,
            required: true,
            unique: true,
            length: 2,
        },
        fullName: {
            type: String,
            required: true,
            unique: true,
            length: 50,
        },
    },
    { versionKey: false },
);

const cityModel = model<ICity>("cities", citySchema);

export default cityModel;
