import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

import { getUserByUsername } from "./app/api/users/[id]/route";
import { createUser } from "./app/api/users/route";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await getUserByUsername(credentials?.username);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user?.password
            );

            if (isMatch) {
              return user;
            } else {
              throw new Error("Username or Password is not correct");
            }
          } else {
            await createUser(credentials.username, credentials.password);
            return await getUserByUsername(credentials.username);
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
});
