import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './../dto/create-transaction.dto';
import { UpdateTransactionDto } from './../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { TransactionFiltersDto } from '../dto/transactions-filters.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly _transactionsRepository: TransactionsRepository,
    private readonly _validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly _validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly _validateTransactionOwnershipService: ValidateTransactionOwnershipService
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId } = createTransactionDto;

    await this._validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this._transactionsRepository.create({
      data: {
        userId,
        ...createTransactionDto
      }
    });
  }

  findAll(userId: string, filters: TransactionFiltersDto) {
    const { month, year, bankAccountId, type } = filters;

    return this._transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId,
        type,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1))
        }
      }
    });
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId } = updateTransactionDto;

    await this._validateEntitiesOwnership({
      userId,
      transactionId,
      categoryId,
      bankAccountId
    });

    return this._transactionsRepository.update({
      where: { id: transactionId },
      data: {
        userId,
        ...updateTransactionDto
      }
    });
  }

  async remove(userId: string, transactionId: string) {
    await this._validateEntitiesOwnership({ transactionId, userId });

    await this._transactionsRepository.delete({
      where: { id: transactionId }
    });
  }

  private async _validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      bankAccountId && this._validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this._validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId && this._validateTransactionOwnershipService.validate(userId, transactionId)
    ]);
  }
}
