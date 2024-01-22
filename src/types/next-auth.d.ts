import { Types } from "mongoose";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      name: string;
      id: Types.ObjectId;
      image?: string;
    } & DefaultSession["user"];
  }
}
