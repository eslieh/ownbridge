import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { requireUser } from "@/lib/auth";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireUser();
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
            <Link href="/admin" className="text-sm font-medium text-ink-2 hover:text-ink">Listings</Link>
            <Link href="/" target="_blank" className="text-sm font-medium text-ink-2 hover:text-ink">View site ↗</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-ink-3 sm:inline">{user.email}</span>
            <form action={logout}>
              <button className="btn-muted h-9">Log out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-page flex-1 py-8">{children}</main>
    </>
  );
}
