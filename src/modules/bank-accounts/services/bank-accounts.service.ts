// Libs
import { Injectable } from '@nestjs/common';

// Models
import { CreateBankAccountDto } from '../models/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../models/dto/update-bank-account.dto';

// Repositories
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

// Services
import { ValidateBankAccountOwnershipService } from './bank-account-ownership.service';

/**
 * Injectable service class for managing bank accounts.
 *
 * This service provides methods for creating, retrieving, updating, and deleting bank accounts.
 * It uses the `BankAccountsRepository` for database operations and `ValidateBankAccountOwnershipService`
 * for ownership validation.
 */
@Injectable()
export class BankAccountsService {
  constructor(
    private readonly _bankAccountRepository: BankAccountsRepository,
    private readonly _validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  /**
   * Creates a new bank account for a given user.
   *
   * This method takes a user ID and a DTO containing the bank account details, then creates
   * a new bank account associated with the given user.
   *
   * @param userId The ID of the user for whom the bank account is being created.
   * @param createBankAccountDto The data transfer object containing the details of the bank account to be created.
   * @returns The newly created bank account.
   */
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this._bankAccountRepository.create({
      data: {
        ...createBankAccountDto,
        userId
      }
    });
  }

  /**
   * Retrieves all bank accounts associated with a given user ID.
   *
   * This method queries the database for all bank accounts linked to the specified user ID,
   * including their transactions. It calculates the current balance for each bank account based
   * on its transactions and initial balance.
   *
   * @param userId The ID of the user whose bank accounts are to be retrieved.
   * @returns A list of bank accounts owned by the specified user, each with a calculated current balance.
   */
  async findAllByUserId(userId: string) {
    const bankAccounts = await this._bankAccountRepository.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            value: true,
            type: true
          }
        }
      }
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) => acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value),
        0
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance
      };
    });
  }

  /**
   * Updates a bank account for a given user.
   *
   * Validates the ownership of the bank account by the user before updating it with the provided DTO.
   *
   * @param userId The ID of the user who owns the bank account.
   * @param bankAccountId The ID of the bank account to update.
   * @param updateBankAccountDto The data transfer object containing the updated details of the bank account.
   * @returns The updated bank account.
   */
  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this._validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this._bankAccountRepository.update({
      where: { id: bankAccountId },
      data: updateBankAccountDto
    });
  }

  /**
   * Removes a bank account for a given user.
   *
   * Validates the ownership of the bank account by the user before deleting it.
   *
   * @param userId The ID of the user who owns the bank account.
   * @param bankAccountId The ID of the bank account to remove.
   */
  async remove(userId: string, bankAccountId: string) {
    await this._validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this._bankAccountRepository.delete({ where: { id: bankAccountId } });
  }
}
