// Libs
import { Injectable } from '@nestjs/common';

// Models
import { CreateTransactionDto } from './../models/dto/create-transaction.dto';
import { UpdateTransactionDto } from './../models/dto/update-transaction.dto';
import { TransactionFiltersDto } from '../models/dto/transactions-filters.dto';

// Services
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

// Repositories
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

/**
 * Service responsible for managing transactions.
 */
@Injectable()
export class TransactionsService {
  constructor(
    private readonly _transactionsRepository: TransactionsRepository,
    private readonly _validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly _validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly _validateTransactionOwnershipService: ValidateTransactionOwnershipService
  ) {}

  /**
   * Creates a new transaction.
   *
   * @param userId - ID of the user creating the transaction.
   * @param createTransactionDto - Data for creating the transaction.
   * @returns The created transaction.
   */
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

  /**
   * Retrieves all transactions for a specific user based on filters.
   *
   * @param userId - ID of the user whose transactions are to be retrieved.
   * @param filters - Filters to apply to the transactions query.
   * @returns A list of transactions matching the filters.
   */
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

  /**
   * Updates an existing transaction.
   *
   * @param userId - ID of the user updating the transaction.
   * @param transactionId - ID of the transaction to be updated.
   * @param updateTransactionDto - Data for updating the transaction.
   * @returns The updated transaction.
   */
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

  /**
   * Removes an existing transaction.
   *
   * @param userId - ID of the user removing the transaction.
   * @param transactionId - ID of the transaction to be removed.
   * @returns void
   */
  async remove(userId: string, transactionId: string) {
    await this._validateEntitiesOwnership({ transactionId, userId });

    await this._transactionsRepository.delete({
      where: { id: transactionId }
    });
  }

  /**
   * Validates the ownership of related entities.
   *
   * @param userId - ID of the user.
   * @param bankAccountId - ID of the bank account (optional).
   * @param categoryId - ID of the category (optional).
   * @param transactionId - ID of the transaction (optional).
   * @returns void
   */
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
