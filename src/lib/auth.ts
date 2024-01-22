import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function checkAuth(hasToBeLoggedIn: boolean = true) {
  const session = await getServerSession(authOptions);
  if (!session && hasToBeLoggedIn) {
    redirect("/auth/login");
  }
  if (session && !hasToBeLoggedIn) {
    redirect("/");
  }
}
