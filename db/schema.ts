import { pgTable, text, integer, timestamp, pgEnum, uuid, numeric } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['pending', 'paid']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  imageUrl: text('image_url').notNull(),
});

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  amount: integer('amount').notNull(),
  status: statusEnum('status').notNull(),
  date: timestamp('date').notNull(),
});

export const revenue = pgTable('revenue', {
  month: text('month').notNull(),
  revenue: integer('revenue').notNull(),
});