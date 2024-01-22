import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

export const getAuthSession = async () => {
  return (await getServerSession(authOptions)) as Session;
};
