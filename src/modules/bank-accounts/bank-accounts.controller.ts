// Libs
import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';

// Models
import { CreateBankAccountDto } from './models/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './models/dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

// Services
import { BankAccountsService } from './services/bank-accounts.service';

/**
 * Controller responsible for managing bank accounts.
 */
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly _bankAccountsService: BankAccountsService) {}

  /**
   * Creates a new bank account.
   *
   * @param userId - ID of the active user.
   * @param createBankAccountDto - Data for creating the bank account.
   * @returns The created bank account.
   */
  @Post()
  create(@ActiveUserId() userId: string, @Body() createBankAccountDto: CreateBankAccountDto) {
    return this._bankAccountsService.create(userId, createBankAccountDto);
  }

  /**
   * Returns all bank accounts of the user.
   *
   * @param userId - ID of the active user.
   * @returns List of the user's bank accounts.
   */
  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this._bankAccountsService.findAllByUserId(userId);
  }

  /**
   * Updates an existing bank account.
   *
   * @param userId - ID of the active user.
   * @param bankAccountId - ID of the bank account to be updated.
   * @param updateBankAccountDto - Data for updating the bank account.
   * @returns The updated bank account.
   */
  @Put(':bankAccountId')
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this._bankAccountsService.update(userId, bankAccountId, updateBankAccountDto);
  }

  /**
   * Removes an existing bank account.
   *
   * @param userId - ID of the active user.
   * @param bankAccountId - ID of the bank account to be removed.
   * @returns void
   */
  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string, @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string) {
    return this._bankAccountsService.remove(userId, bankAccountId);
  }
}
