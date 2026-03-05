'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Invoices', href: '/dashboard/invoices' },
  { name: 'Customers', href: '/dashboard/customers' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] items-center justify-center gap-3 rounded-lg px-4 text-sm font-medium transition-all md:justify-start',
              {
                'text-[#f05a41] bg-[#f05a41]/10': isActive,
                'text-gray-400 hover:text-white hover:bg-[#222222]': !isActive,
              },
             )}
          >
            {/* Optional: Add a small dot for active state if you want it even more minimal */}
            {isActive && <div className="w-1 h-1 rounded-full bg-[#f05a41]" />}
            <p className="md:block text-xs uppercase tracking-widest">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}