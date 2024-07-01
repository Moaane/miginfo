import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const news = await prisma.news.findUnique({
      where: { slug: slug },
      include: {
        newsCategories: { select: { categories: { select: { name: true } } } },
        users: { select: { username: true } },
      },
    });
    return NextResponse.json({
      data: news,
      status: 200,
      message: "News retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while getting news",
    });
  }
}
