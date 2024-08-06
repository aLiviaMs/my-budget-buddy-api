// Libs
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// Modules
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { AuthModule } from './modules/auth/auth.module';

// Guards
import { AuthGuard } from './modules/auth/auth.guard';

// Utils
import { env } from 'src/shared/config/env';

const modules = [DatabaseModule, UsersModule, MailerModule, AuthModule];

const customModuleImports = [
  MailerModule.forRoot({
    transport: {
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: env.SMTP_PORT === '465',
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    },
    template: {
      dir: '/templates',
      adapter: new PugAdapter({ inlineCssEnabled: true }),
      options: {
        strict: true
      }
    }
  })
];

const customProviders = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard
  }
];

@Module({
  imports: [...modules, ...customModuleImports],
  controllers: [],
  providers: [...customProviders]
})
export class AppModule {}
