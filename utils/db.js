// lib/db.js
import { PrismaClient } from "@prisma/client";

// let prisma;

// if (process.env.NODE_ENV === "production") {
//   console.log("Initializing Prisma Client in production mode");
//   prisma = new PrismaClient();
// } else {
//   console.log("Initializing Prisma Client in development mode");
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

const prisma = new PrismaClient();

export default prisma;
