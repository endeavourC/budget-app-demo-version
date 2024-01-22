import { RegisterForm } from "@/app/auth/register/_components/RegisterForm";
import { checkAuth } from "@/lib/auth";
import { getCsrfToken } from "next-auth/react";

export default async function Login() {
  const csrfToken = await getCsrfToken();

  await checkAuth(false);

  return (
    <div className="flex items-center justify-center h-screen bg-background dark:bg-slate-900 transition-all">
      <div className="max-w-2xl w-full shadow-muted/30 p-6 shadow-sm bg-white dark:bg-slate-800 dark:shadow-none transition-all rounded-xl">
        <h2 className="text-2xl text-center">Register your account</h2>
        <RegisterForm csrfToken={csrfToken} />
      </div>
    </div>
  );
}
