// Libs
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import { AuthController } from './auth.controller';

// Services
import { AuthService } from './auth.service';

// Modules
import { MailerModule } from '../mailer/mailer.module';

// Envs
import { env } from '../../shared/config/env';

const modules = [MailerModule];
const controllers = [AuthController];
const providers = [AuthService];

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
    ...modules
  ],
  controllers: [...controllers],
  providers: [...providers]
})
export class AuthModule {}
