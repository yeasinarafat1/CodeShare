import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Define the enum for supported languages
export const languageEnum = pgEnum('language', [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'c',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'markdown',
  'yaml',
]);

export const snippets = pgTable('snippets', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id:varchar('user_id', { length: 255 }).notNull(),
  author_name:varchar('author_name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  language: languageEnum('language').notNull(),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Type inference for TypeScript
export type Snippet = typeof snippets.$inferSelect;
export type NewSnippet = typeof snippets.$inferInsert;