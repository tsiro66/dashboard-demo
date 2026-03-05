import { db } from '@/db';
import { customers, invoices, revenue } from '@/db/schema';
import { desc, eq, ilike, or, sql, count } from 'drizzle-orm';
import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 6;

export async function fetchRevenue() {
  try {
    const data = await db.select().from(revenue);

    console.log('Data fetch completed after 3 seconds.');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await db
      .select({
        id: invoices.id,
        amount: invoices.amount,
        name: customers.name,
        imageUrl: customers.imageUrl,
        email: customers.email,
      })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customerId, customers.id))
      .orderBy(desc(invoices.date))
      .limit(5);

    return data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
      db.select({ count: count() }).from(invoices),
      db.select({ count: count() }).from(customers),
      db.select({
        paid: sql<number>`SUM(CASE WHEN ${invoices.status} = 'paid' THEN ${invoices.amount} ELSE 0 END)`,
        pending: sql<number>`SUM(CASE WHEN ${invoices.status} = 'pending' THEN ${invoices.amount} ELSE 0 END)`,
      }).from(invoices),
    ]);

    return {
      numberOfInvoices: invoiceCount[0].count,
      numberOfCustomers: customerCount[0].count,
      totalPaidInvoices: formatCurrency(invoiceStatus[0].paid ?? 0),
      totalPendingInvoices: formatCurrency(invoiceStatus[0].pending ?? 0),
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const search = `%${query}%`;

  try {
    const data = await db
      .select({
        id: invoices.id,
        amount: invoices.amount,
        date: invoices.date,
        status: invoices.status,
        name: customers.name,
        email: customers.email,
        imageUrl: customers.imageUrl,
      })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customerId, customers.id))
      .where(
        or(
          ilike(customers.name, search),
          ilike(customers.email, search),
          ilike(invoices.status, search),
          sql`${invoices.amount}::text ILIKE ${search}`,
          sql`${invoices.date}::text ILIKE ${search}`,
        )
      )
      .orderBy(desc(invoices.date))
      .limit(ITEMS_PER_PAGE)
      .offset(offset);

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  const search = `%${query}%`;

  try {
    const data = await db
      .select({ count: count() })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customerId, customers.id))
      .where(
        or(
          ilike(customers.name, search),
          ilike(customers.email, search),
          ilike(invoices.status, search),
          sql`${invoices.amount}::text ILIKE ${search}`,
          sql`${invoices.date}::text ILIKE ${search}`,
        )
      );

    return Math.ceil(data[0].count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await db
      .select({
        id: invoices.id,
        customerId: invoices.customerId,
        amount: invoices.amount,
        status: invoices.status,
      })
      .from(invoices)
      .where(eq(invoices.id, id));

    return { ...data[0], amount: data[0].amount / 100 };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    return await db
      .select({ id: customers.id, name: customers.name })
      .from(customers)
      .orderBy(customers.name);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  const search = `%${query}%`;

  try {
    const data = await db
      .select({
        id: customers.id,
        name: customers.name,
        email: customers.email,
        imageUrl: customers.imageUrl,
        totalInvoices: count(invoices.id),
        totalPending: sql<number>`SUM(CASE WHEN ${invoices.status} = 'pending' THEN ${invoices.amount} ELSE 0 END)`,
        totalPaid: sql<number>`SUM(CASE WHEN ${invoices.status} = 'paid' THEN ${invoices.amount} ELSE 0 END)`,
      })
      .from(customers)
      .leftJoin(invoices, eq(customers.id, invoices.customerId))
      .where(or(ilike(customers.name, search), ilike(customers.email, search)))
      .groupBy(customers.id, customers.name, customers.email, customers.imageUrl)
      .orderBy(customers.name);

    return data.map((customer) => ({
      ...customer,
      totalPending: formatCurrency(customer.totalPending),
      totalPaid: formatCurrency(customer.totalPaid),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}