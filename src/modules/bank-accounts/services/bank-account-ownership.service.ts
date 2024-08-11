// Libs
import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

/**
 * Service to validate bank account ownership.
 */
@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly _bankAccountRepository: BankAccountsRepository) {}

  /**
   * Validates if the specified user is the owner of the specified bank account.
   *
   * @param userId The ID of the user to validate ownership for.
   * @param bankAccountId The ID of the bank account to validate ownership of.
   * @throws {NotFoundException} Thrown if the bank account is not found or the user is not the owner.
   */
  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this._bankAccountRepository.findFirst({ where: { userId, id: bankAccountId } });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
