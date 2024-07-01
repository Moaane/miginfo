import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params;
  try {
    const service = await prisma.service.findUnique({
      where: { slug: slug },
      include: { serviceLists: true },
    });
    return NextResponse.json({
      data: service,
      status: 200,
      message: "Service retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while retrieving service",
    });
  }
}
