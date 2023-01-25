import { IsAlpha, IsNotEmpty, IsString, IsUppercase, Length } from "class-validator";

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
    @Length(50)
    @IsAlpha()
    @IsUppercase()
    public fullName: string;
}
