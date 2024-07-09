import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const blocksTable = pgTable('blocks', {
  id: serial('id').primaryKey(),
  type: text('name').notNull(),
});

export const workspacesTable = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
});

export type InsertUser = typeof blocksTable.$inferInsert;
export type SelectUser = typeof blocksTable.$inferSelect;

export type InsertWorkspace = typeof workspacesTable.$inferInsert;
export type SelectWorkspace = typeof workspacesTable.$inferSelect;
