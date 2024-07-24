// Libs
import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

const modules = [DatabaseModule, UsersModule, MailerModule];

const customModuleImports = [
  MailerModule.forRoot({
    transport: {
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
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

@Module({
  imports: [...modules, ...customModuleImports],
  controllers: [],
  providers: []
})
export class AppModule {}
