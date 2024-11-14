import { pgTable, pgSchema, uuid, text, jsonb, boolean, varchar, timestamp } from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm'

export const workspacesTable = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  logo: text('logo'),
  content: uuid('content').array().notNull().default(sql`ARRAY[]::uuid[]`),
  active: boolean('active').notNull().default(true),
});

export const blocksTable = pgTable('blocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(),
  properties: jsonb('properties'), 
  parentId: uuid('parent_id').notNull(),
  content: uuid('content').array().notNull().default(sql`ARRAY[]::uuid[]`),
  snapshot: jsonb('snapshot'),
  active: boolean('active').notNull().default(true),
  created_at: timestamp('created_at').notNull().default(sql`now()`),
});

export const canvasesTable = pgTable('canvases', {
  id: uuid('id').defaultRandom().primaryKey(),
  properties: jsonb('properties'),
  content: jsonb('content').notNull(),
  parentId: uuid('parent_id').notNull(),
});

export const pagesTable =  pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: jsonb('content').notNull(),
  parentId: uuid('parent_id').notNull(),
});


const authSchema = pgSchema('auth');
export const userTable = authSchema.table(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(), // Updated to varchar with length and unique constraint
    password: text('password').notNull(),
    avatar: text('avatar').notNull().default(''),
    isActive: boolean('is_active').notNull().default(true),  // Added isActive field to track user status
});


export type InsertBlock = typeof blocksTable.$inferInsert;
export type SelectBlock = typeof blocksTable.$inferSelect;

export type InsertWorkspace = typeof workspacesTable.$inferInsert;
export type SelectWorkspace = typeof workspacesTable.$inferSelect;

export type InsertCanvas = typeof canvasesTable.$inferInsert;
export type SelectCanvas = typeof canvasesTable.$inferSelect;

export type InsertPages = typeof pagesTable.$inferInsert;
export type SelectPages = typeof pagesTable.$inferSelect;
