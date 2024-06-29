import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    return user || null;
  } catch (error) {
    console.error(error);
  }
}
