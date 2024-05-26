// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// // Your own logic for dealing with plaintext password strings; be careful!
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "./utils/db";
// import { UserSchema } from "./lib/zod";
// import VerifyPassword from "./utils/password";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   pages: {
//     signIn: "/sign-in",
//     error: "/muhaha",
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         try {
//           const { username, password } = await UserSchema.parseAsync(
//             credentials
//           );

//           const user = await prisma.user.findUnique({
//             where: { username: username },
//           });

//           if (!user) {
//             const hashedPassword = await bcrypt.hash(password, 10);

//             const newUser = await prisma.user.create({
//               data: {
//                 username,
//                 password: hashedPassword,
//               },
//             });

//             return newUser;
//           }

//           const passwordMatch = await VerifyPassword(password, user.password);

//           if (!passwordMatch) {
//             throw new Error("Password is not valid");
//           }

//           return user;
//         } catch (error) {
//           console.error("Authorization error:", error);
//           throw new Error("Authorization failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//       }
//       console.log(token, user);
//       return token;
//     },
//     session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.username = token.username;
//       }
//       console.log(session, user);
//       return session;
//     },
//   },
//   debug: true,
//   secret: process.env.AUTH_SECRET,
// });
