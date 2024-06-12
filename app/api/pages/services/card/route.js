import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const serviceCard = await prisma.service.findMany({
      where: { onSection: true },
    });

    return NextResponse.json({
      data: serviceCard,
      status: 200,
      message: "Service card retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting service card",
    });
  }
}
