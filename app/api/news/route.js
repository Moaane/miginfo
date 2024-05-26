import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function findMany() {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse.json({
      status: 401,
      message: "Failed to fetch news",
    });
  }
}

export { findMany as GET };
