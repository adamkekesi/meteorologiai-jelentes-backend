import { Types } from "mongoose";
export default interface IMeasurements {
    _id: number;
    city: number;
    time: string;
    wind: string;
    temperature: number;
}
