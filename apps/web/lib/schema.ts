import { pgTable, uuid, text, jsonb } from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm'

export const workspacesTable = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  logo: text('logo').notNull(),
  content: uuid('content').array().notNull().default(sql`ARRAY[]::uuid[]`),
});

export const blocksTable = pgTable('blocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(),
  properties: jsonb('properties'), 
  parentId: uuid('parent_id').notNull(),
  content: uuid('content').array().notNull().default(sql`ARRAY[]::uuid[]`),
});

export type InsertBlock = typeof blocksTable.$inferInsert;
export type SelectBlock = typeof blocksTable.$inferSelect;

export type InsertWorkspace = typeof workspacesTable.$inferInsert;
export type SelectWorkspace = typeof workspacesTable.$inferSelect;