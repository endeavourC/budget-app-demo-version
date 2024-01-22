import dbConnect from "@/lib/db";
import User from "@/models/User";
import { Types } from "mongoose";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/",
  },
  callbacks: {
    async redirect({ url }) {
      return url;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as Types.ObjectId;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "User", type: "text", placeholder: "John" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({
          username: credentials?.username,
        }).exec();

        if (!user) {
          return Promise.reject(new Error("Invalid credentials"));
        }

        const isPasswordValidated = await user.validatePassword(
          credentials?.password
        );

        if (isPasswordValidated) {
          return { id: user.id, name: user.username, email: user.email };
        } else {
          return Promise.reject(new Error("Invalid credentials"));
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
