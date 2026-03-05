'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { playfair_display } from '@/app/ui/fonts';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="w-full max-w-md rounded-xl bg-zinc-800 border border-zinc-700 p-8 shadow-lg">
      <h1 className={`${playfair_display.className} mb-6 text-2xl text-white`}>
        Sign in
      </h1>
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-400" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-lg bg-brand px-4 py-2 text-white font-medium hover:bg-brand/80 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}