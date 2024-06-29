import prisma from "@/utils/db";
import * as bcrypt from "bcrypt";

export async function createUser(username, password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashPassword },
    });

    return newUser;
  } catch (error) {
    console.error(error);
  }
}
