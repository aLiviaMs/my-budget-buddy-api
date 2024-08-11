// Libs
import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

/**
 * Service responsible for validating transaction ownership.
 */
@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly _transactionRepository: TransactionsRepository) {}

  /**
   * Validates whether a transaction belongs to a specific user.
   *
   * @param userId - ID of the user to validate ownership.
   * @param transactionId - ID of the transaction to be validated.
   * @throws NotFoundException if the transaction does not belong to the user.
   */
  async validate(userId: string, transactionId: string) {
    const isOwner = await this._transactionRepository.findFirst({
      where: { id: transactionId, userId }
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
