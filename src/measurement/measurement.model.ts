// https://mongoosejs.com/docs/validation.html

import { Schema, model } from "mongoose";
import IMeasurement from "./measurement.interface";

const measurementSchema = new Schema<IMeasurement>(
    {
        _id: Number,
        city: {
            ref: "city",
            type: Number,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        wind: {
            type: String,
            required: true,
        },
        temperature: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false },
);

const measurementModel = model<IMeasurement>("measurements", measurementSchema);

export default measurementModel;
