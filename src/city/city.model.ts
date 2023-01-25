import { Schema, model } from "mongoose";
import ICity from "./city.interface";

const citySchema = new Schema(
    {
        _id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
            length: 2,
        },
    },
    { versionKey: false },
);

const cityModel = model<ICity>("Cities", citySchema);

export default cityModel;
