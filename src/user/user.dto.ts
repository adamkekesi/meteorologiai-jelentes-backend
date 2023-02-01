import { IsArray, ArrayNotEmpty, IsString, IsBoolean, IsEmail } from "class-validator";
import IUser from "./user.interface";

export default class CreateUserDto implements IUser {
    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsBoolean()
    public auto_login: boolean;

    @IsString()
    public picture: string;

    @IsString()
    public password: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public roles: string[];
}
