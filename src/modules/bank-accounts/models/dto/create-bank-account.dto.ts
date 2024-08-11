import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnumBankAccountType } from '../enum/bank-account.enum';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(EnumBankAccountType)
  type: EnumBankAccountType;

  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
