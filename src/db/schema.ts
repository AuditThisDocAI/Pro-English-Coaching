import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'saved_phrases' table with a foreign key to 'users'.
export const savedPhrases = pgTable('saved_phrases', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  userUid: text('user_uid').notNull(), // Direct Firebase UID for fast lookups
  mode: text('mode'),
  jobType: text('job_type'),
  original: text('original').notNull(),
  professional: text('professional').notNull(),
  translation: text('translation'),
  why: text('why'),
  practice: text('practice'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relationships for the 'users' table.
export const usersRelations = relations(users, ({ many }) => ({
  savedPhrases: many(savedPhrases),
}));

// Define relationships for the 'saved_phrases' table.
export const savedPhrasesRelations = relations(savedPhrases, ({ one }) => ({
  user: one(users, {
    fields: [savedPhrases.userId],
    references: [users.id],
  }),
}));
