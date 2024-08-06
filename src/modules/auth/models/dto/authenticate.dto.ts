import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsString()
  @MinLength(8)
  password: string;
}
