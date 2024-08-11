import { EnumTransactionType } from 'src/shared/database/repositories/entities/Transaction';

export class TransactionFiltersDto {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: EnumTransactionType;
}
