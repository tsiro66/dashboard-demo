import NavLinks from "@/app/ui/dashboard/nav-links";
import { signOut } from "@/auth";
import PowerIcon from "@heroicons/react/24/solid/esm/PowerIcon";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-6">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />

        {/* Transparent spacer instead of light gray block */}
        <div className="hidden h-auto w-full grow md:block"></div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-transparent text-gray-400 text-sm font-medium transition-colors hover:bg-brand hover:text-white hover:border-transparent md:justify-start md:px-4 cursor-pointer">
            <PowerIcon className="w-6" />
            <div className="hidden md:block text-xs uppercase tracking-widest">
              Sign Out
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
