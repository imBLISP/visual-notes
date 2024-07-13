import { pgTable, uuid, text, jsonb } from 'drizzle-orm/pg-core';

export const workspacesTable = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  logo: text('logo').notNull(),
});

export const workspacesBlocksTable = pgTable('workspaces_blocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  workspaceId: uuid('workspace_id').references(() => workspacesTable.id, {onUpdate: 'cascade'}).notNull(),
  blockId: uuid('block_id').references(() => blocksTable.id, {onUpdate: 'cascade'}).notNull(),
});

export const blocksTable = pgTable('blocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(),
  properties: jsonb('properties'), 
  parentId: uuid('parent_id').references(() => workspacesTable.id, {onUpdate: 'cascade'}).notNull()
});

export const blocksBlocksTable = pgTable('blocks_blocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  blockId: uuid('block_id').references(() => blocksTable.id, {onUpdate: 'cascade'}).notNull(),
  parentBlockId: uuid('parent_id').references(() => blocksTable.id, {onUpdate: 'cascade'}).notNull()
});

export type InsertBlock = typeof blocksTable.$inferInsert;
export type SelectBlock = typeof blocksTable.$inferSelect;

export type InsertWorkspace = typeof workspacesTable.$inferInsert;
export type SelectWorkspace = typeof workspacesTable.$inferSelect;

export type InsertWorkspacesBlocks = typeof workspacesBlocksTable.$inferInsert;
export type SelectWorkspacesBlocks = typeof workspacesBlocksTable.$inferSelect;

export type InsertBlocksBlocks = typeof blocksBlocksTable.$inferInsert;
export type SelectblocksBlocks = typeof blocksBlocksTable.$inferSelect;
