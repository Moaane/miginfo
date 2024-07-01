import { UserSchema } from "@/lib/zod";
import VerifyPassword from "@/utils/password";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/utils/db";

export const authOptions = {
  pages: {
    signIn: "/sign-in",
  },
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
            const hashPassword = bcrypt.hashSync(password, 10);
            await prisma.user.create({
              data: {
                username: username,
                password: hashPassword,
              },
            });
            return;
          }

          const passwordMatch = await VerifyPassword(password, user.password);

          if (!passwordMatch) {
            throw new Error("Password is not valid");
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
