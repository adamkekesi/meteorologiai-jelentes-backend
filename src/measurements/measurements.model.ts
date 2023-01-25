// https://mongoosejs.com/docs/validation.html

import { Schema, model } from "mongoose";
import IMeasurements from "./measurements.interface";

const measurementsSchema = new Schema<IMeasurements>(
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

const measurementsModel = model<IMeasurements>("Measurements", measurementsSchema);

export default measurementsModel;
