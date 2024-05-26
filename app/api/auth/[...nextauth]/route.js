import { UserSchema } from "@/lib/zod";
import VerifyPassword from "@/utils/password";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/utils/db";

export const authOptions = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // Redirect to sign-in page with an error message
  },
  session: {
    strategy: "jwt",
    generateSessionToken: false,
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = await UserSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({
            where: { username: username },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await VerifyPassword(password, user.password);

          if (!passwordMatch) {
            throw new Error("Password is not valid");
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.jti = crypto.randomUUID() // Create a unique identifier for the session
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
        };
        session.jti = token.jti; // Include the unique identifier in the session
      }
      return session;
    },
  },
  events: {
    signOut: async ({ token }) => {
      await prisma.session.deleteMany({ where: { userId: token.id } });
    },
    session: async ({ session, token }) => {
      const exist = await prisma.session.findFirst({
        where: { userId: session.user.id },
      });

      if (exist) {
        return await prisma.session.update({
          where: { id: exist.id },
          data: {
            expires: session.expires,
            sessionToken: token.jti,
            userId: session.user.id,
          },
        });
      }

      return await prisma.session.create({
        data: {
          expires: session.expires,
          sessionToken: token.jti,
          userId: session.user.id,
        },
      });
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
