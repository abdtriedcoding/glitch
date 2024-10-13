import { Sidebar } from "@/components/navigation/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="w-[72px] min-h-screen hidden flex-col md:flex fixed inset-y-0 z-40">
        <Sidebar />
      </div>
      <main className="md:pl-[72px] min-h-screen">{children}</main>
    </div>
  );
}
