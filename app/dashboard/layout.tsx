import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 border-r border-[#ffffff0a]">
        <SideNav />
      </div>
      <div className="grow md:overflow-y-auto p-6 md:p-10">{children}</div>
    </div>
  );
}