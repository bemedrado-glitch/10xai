import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata = { title: "Lighthouse Admin" };

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-ink)]">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-y-auto bg-[#0f0e0c]">{children}</main>
    </div>
  );
}
