// Libs
import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Models
import { CreateBankAccountDto } from './models/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './models/dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

// Services
import { BankAccountsService } from './services/bank-accounts.service';

@ApiTags('Bank Accounts')
@ApiBearerAuth()
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly _bankAccountsService: BankAccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bank account.' })
  @ApiResponse({ status: 201, description: 'The bank account has been successfully created.' })
  create(@ActiveUserId() userId: string, @Body() createBankAccountDto: CreateBankAccountDto) {
    return this._bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bank accounts of the user.' })
  @ApiResponse({ status: 200, description: "A list of the user's bank accounts." })
  findAll(@ActiveUserId() userId: string) {
    return this._bankAccountsService.findAllByUserId(userId);
  }

  @Put(':bankAccountId')
  @ApiOperation({ summary: 'Update an existing bank account.' })
  @ApiResponse({ status: 200, description: 'The bank account has been successfully updated.' })
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this._bankAccountsService.update(userId, bankAccountId, updateBankAccountDto);
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an existing bank account.' })
  @ApiResponse({ status: 204, description: 'The bank account has been successfully deleted.' })
  remove(@ActiveUserId() userId: string, @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string) {
    return this._bankAccountsService.remove(userId, bankAccountId);
  }
}
