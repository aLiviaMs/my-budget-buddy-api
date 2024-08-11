// Libs
import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly _transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction.' })
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.' })
  create(@ActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this._transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions for a user with optional filters.' })
  @ApiResponse({ status: 200, description: 'A list of transactions matching the filters.' })
  findAllByUserId(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(EnumTransactionType)) type?: EnumTransactionType
  ) {
    return this._transactionsService.findAll(userId, { month, year, bankAccountId, type });
  }

  @Put(':transactionId')
  @ApiOperation({ summary: 'Update an existing transaction.' })
  @ApiResponse({ status: 200, description: 'The transaction has been successfully updated.' })
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this._transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an existing transaction.' })
  @ApiResponse({ status: 204, description: 'The transaction has been successfully deleted.' })
  remove(@ActiveUserId() userId: string, @Param('transactionId', ParseUUIDPipe) transactionId: string) {
    return this._transactionsService.remove(userId, transactionId);
  }
}
