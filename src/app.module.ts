// Libs
import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';

const modules = [DatabaseModule, UsersModule];

@Module({
  imports: [...modules],
  controllers: [],
  providers: []
})
export class AppModule {}
