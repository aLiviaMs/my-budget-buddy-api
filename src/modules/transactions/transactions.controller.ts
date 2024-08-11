// Libs
import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';

// Models
import { CreateTransactionDto } from './models/dto/create-transaction.dto';
import { UpdateTransactionDto } from './models/dto/update-transaction.dto';
import { EnumTransactionType } from 'src/shared/database/repositories/entities/Transaction';

// Pipes
import { OptionalParseUUIDPipe } from 'src/shared/pipes/OptionalParseUUIDPipe';
import { OptionalParseEnumPipe } from 'src/shared/pipes/OptionalParseEnumPipe';

// Services
import { TransactionsService } from './services/transactions.service';

// Decorators
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

/**
 * Controller responsible for managing transactions.
 */
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly _transactionsService: TransactionsService) {}

  /**
   * Creates a new transaction.
   *
   * @param userId - ID of the active user.
   * @param createTransactionDto - Data for creating the transaction.
   * @returns The created transaction.
   */
  @Post()
  create(@ActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this._transactionsService.create(userId, createTransactionDto);
  }

  /**
   * Retrieves all transactions for a specific user based on filters.
   *
   * @param userId - ID of the active user.
   * @param month - Month filter for transactions.
   * @param year - Year filter for transactions.
   * @param bankAccountId - Optional bank account ID filter for transactions.
   * @param type - Optional type filter for transactions.
   * @returns A list of transactions matching the filters.
   */
  @Get()
  findAllByUserId(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(EnumTransactionType)) type?: EnumTransactionType
  ) {
    return this._transactionsService.findAll(userId, { month, year, bankAccountId, type });
  }

  /**
   * Updates an existing transaction.
   *
   * @param userId - ID of the active user.
   * @param transactionId - ID of the transaction to be updated.
   * @param updateTransactionDto - Data for updating the transaction.
   * @returns The updated transaction.
   */
  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this._transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  /**
   * Removes an existing transaction.
   *
   * @param userId - ID of the active user.
   * @param transactionId - ID of the transaction to be removed.
   * @returns void
   */
  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string, @Param('transactionId', ParseUUIDPipe) transactionId: string) {
    return this._transactionsService.remove(userId, transactionId);
  }
}
