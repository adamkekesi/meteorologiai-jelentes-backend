import { IsAlpha, IsNotEmpty, IsString, IsUppercase, Length, MaxLength } from "class-validator";

import ICity from "./city.interface";

export default class CreateCityDto implements ICity {
    @IsNotEmpty()
    @IsString()
    @Length(2)
    @IsAlpha()
    @IsUppercase()
    public code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsAlpha()
    public fullName: string;
}
