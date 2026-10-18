import type { Metadata } from "next";
import { Logo } from "@/components/site/logo";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Owner login" };

export default function LoginPage() {
  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="card w-full max-w-sm p-8">
        <Logo />
        <h1 className="h-display mt-6 text-2xl">Owner login</h1>
        <p className="mt-1 text-sm text-ink-2">Manage your listings.</p>
        <LoginForm />
      </div>
    </main>
  );
}
