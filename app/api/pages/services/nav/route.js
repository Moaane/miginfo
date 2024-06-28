import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const serviceNav = await prisma.service.findMany({
      select: { slug: true, name: true },
    });

    return NextResponse.json({
      data: serviceNav,
      status: 200,
      message: "Service nav retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting service nav",
    });
  }
}
