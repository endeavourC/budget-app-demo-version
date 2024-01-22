import { LoginForm } from "@/app/auth/login/_components/LoginForm";
import { checkAuth } from "@/lib/auth";

export default async function Login() {
  await checkAuth(false);

  return (
    <div className="flex items-center justify-center h-screen bg-background dark:bg-slate-900 transition-all">
      <div className="max-w-2xl w-full shadow-muted/30 p-6 shadow-sm bg-white dark:bg-slate-800 dark:shadow-none transition-all rounded-xl">
        <h2 className="text-2xl text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
