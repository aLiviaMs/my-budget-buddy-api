import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class Env {
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  SMTP_HOST: string;

  @IsNotEmpty()
  SMTP_PORT: string;

  @IsNotEmpty()
  SMTP_USER: string;

  @IsNotEmpty()
  SMTP_PASS: string;
}

export const env: Env = plainToInstance(Env, {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS
});

const errors = validateSync(env);

if (errors.length) {
  throw new Error(JSON.stringify(errors, null, 2));
}
