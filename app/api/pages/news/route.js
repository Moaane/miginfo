import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const news = await prisma.newsPage.findMany();

    return NextResponse.json({
      data: news,
      status: 200,
      message: "News page retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting news page",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  try {
    const news = await prisma.newsPage.create({
      data: { title: title, description: description },
    });

    return NextResponse.json({
      data: news,
      status: 201,
      message: "News page created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while creating news page",
    });
  }
}
