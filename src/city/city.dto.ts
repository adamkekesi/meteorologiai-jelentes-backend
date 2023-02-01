import { IsAlpha, IsNotEmpty, IsString, IsUppercase, Length, MaxLength } from "class-validator";

import ICity from "./city.interface";

export default class CreateCityDto implements ICity {
    @IsNotEmpty()
    @IsString()
    @Length(2)
    @IsAlpha("hu-HU")
    @IsUppercase()
    public code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @IsAlpha("hu-HU")
    public fullName: string;
}
