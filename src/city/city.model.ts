import { Schema, model } from "mongoose";
import ICity from "./city.interface";

const citySchema = new Schema(
    {
        _id: String,
        name: String,
    },
    { versionKey: false },
);

const cityModel = model<ICity>("Cities", citySchema);

export default cityModel;
