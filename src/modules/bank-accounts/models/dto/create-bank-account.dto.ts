import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnumBankAccountType } from '../enum/bank-account.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EnumBankAccountType)
  type: EnumBankAccountType;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
