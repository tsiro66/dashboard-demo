import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { playfair_display } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${playfair_display.className} mb-4 text-xl md:text-2xl text-white`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-zinc-800 border border-zinc-700 p-4">
        <div className="bg-zinc-900 px-6 rounded-lg">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t border-zinc-700': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base text-white">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-zinc-400 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${playfair_display.className} truncate text-sm font-medium md:text-base text-white`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-zinc-400" />
          <h3 className="ml-2 text-sm text-zinc-400">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}