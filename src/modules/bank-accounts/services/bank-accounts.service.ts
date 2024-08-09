import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountRepository.create({
      data: {
        ...createBankAccountDto,
        userId
      }
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountRepository.findMany({
      where: { userId }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  async update(userId: string, backAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    this.validateBankAccountOwnershipService.validate(userId, backAccountId);

    return this.bankAccountRepository.update({
      where: { id: backAccountId },
      data: updateBankAccountDto
    });
  }

  async remove(userId: string, bankAccountId: string) {
    this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.bankAccountRepository.delete({ where: { id: bankAccountId } });
  }
}
