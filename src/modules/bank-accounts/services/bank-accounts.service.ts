import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly _bankAccountRepository: BankAccountsRepository,
    private readonly _validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this._bankAccountRepository.create({
      data: {
        ...createBankAccountDto,
        userId
      }
    });
  }

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

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  async update(userId: string, backAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    this._validateBankAccountOwnershipService.validate(userId, backAccountId);

    return this._bankAccountRepository.update({
      where: { id: backAccountId },
      data: updateBankAccountDto
    });
  }

  async remove(userId: string, bankAccountId: string) {
    this._validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this._bankAccountRepository.delete({ where: { id: bankAccountId } });
  }
}
