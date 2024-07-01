import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { username } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found", status: 404 });
    }

    return NextResponse.json({
      data: user,
      status: 200,
      message: "user retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "internal server error", status: 500 });
  }
}
