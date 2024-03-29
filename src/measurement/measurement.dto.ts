import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateMeasurementDto {
    @IsNumber()
    @IsNotEmpty()
    _id: number;

    @IsNotEmpty()
    @IsNumber()
    city: number;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsString()
    wind: string;

    @IsNotEmpty()
    @IsNumber()
    temperature: number;
}
