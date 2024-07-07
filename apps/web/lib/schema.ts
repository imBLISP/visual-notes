import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const blocksTable = pgTable('blocks', {
  id: serial('id').primaryKey(),
  type: text('name').notNull(),
});

export type InsertUser = typeof blocksTable.$inferInsert;
export type SelectUser = typeof blocksTable.$inferSelect;

