import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/config/env';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: ENV.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: ENV.CLOUDFLARE_DATABASE_ID!,
    token: ENV.CLOUDFLARE_D1_TOKEN!,
  },
});
