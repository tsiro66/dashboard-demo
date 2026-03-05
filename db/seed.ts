import { db } from './index';
import { users, customers, invoices, revenue } from './placeholder-data';
import { users as usersTable, customers as customersTable, invoices as invoicesTable, revenue as revenueTable } from './schema';
import bcrypt from 'bcrypt';

async function main() {
  console.log('Seeding database...');

  // Users
  await db.insert(usersTable).values(
    await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    )
  ).onConflictDoNothing();

  // Customers
  await db.insert(customersTable).values(customers).onConflictDoNothing();

  // Invoices
  await db.insert(invoicesTable).values(
    invoices.map((inv) => ({
      ...inv,
      date: new Date(inv.date),
    }))
  ).onConflictDoNothing();

  // Revenue
  await db.insert(revenueTable).values(revenue).onConflictDoNothing();

  console.log('Seeding complete!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});