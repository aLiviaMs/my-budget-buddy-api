// Libs
import { Module } from '@nestjs/common';

// Services
import { BankAccountsService } from './services/bank-accounts.service';
import { ValidateBankAccountOwnershipService } from './services/bank-account-ownership.service';

// Controllers
import { BankAccountsController } from './bank-accounts.controller';

const controllers = [BankAccountsController];
const providers = [ValidateBankAccountOwnershipService, BankAccountsService];
const exportsProviders = [ValidateBankAccountOwnershipService];

@Module({
  controllers: [...controllers],
  providers: [...providers],
  exports: [...exportsProviders]
})
export class BankAccountsModule {}
