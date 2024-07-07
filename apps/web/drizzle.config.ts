import {config} from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({path: '.env'});

export default defineConfig({
  schema: './lib/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  },
});
