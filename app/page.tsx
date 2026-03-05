import Link from "next/link";
import { playfair_display } from "./ui/fonts";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-white">
      {/* Simplified Header/Logo Area */}
      <div className="mb-12">
        <h1 className={`${playfair_display.className} text-4xl md:text-5xl tracking-tight`}>
          LOGO
        </h1>
      </div>

      {/* Centered Content Block */}
      <div className="max-w-2xl text-center flex flex-col items-center gap-8">
        <p
          className={`${playfair_display.className} text-2xl md:text-4xl leading-relaxed antialiased`}
        >
          Welcome to my Next.js demo. <br />
          <span className="text-gray-400 text-lg md:text-xl mt-4 block font-sans italic">
            Exploring <span className="text-brand">Next.js Auth</span> and Drizzle ORM.
          </span>
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-brand px-10 py-3 text-sm font-medium transition-all hover:bg-brand/80 hover:scale-105"
          >
            Log in to Dashboard
          </Link>
          
        </div>
      </div>
    </main>
  );
}