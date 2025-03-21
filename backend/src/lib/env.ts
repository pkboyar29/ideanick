import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const zNonemptyTrimmed = z.string().trim().min(1);

const zEnv = z.object({
  PORT: zNonemptyTrimmed,
  DATABASE_URL: zNonemptyTrimmed,
  JWT_SECRET: zNonemptyTrimmed,
  PASSWORD_SALT: zNonemptyTrimmed,
  INITIAL_ADMIN_PASSWORD: zNonemptyTrimmed,
  WEBAPP_URL: zNonemptyTrimmed,
  HOST_ENV: zNonemptyTrimmed,
});

export const env = zEnv.parse(process.env);
