import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const news = await prisma.newsPage.findUnique({ where: { id: id } });

    if (!news) {
      return NextResponse.json({
        status: 404,
        message: "News page not found",
      });
    }

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

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  try {
    const news = await prisma.newsPage.findUnique({ where: { id: id } });

    if (!news) {
      return NextResponse.json({
        status: 404,
        message: "News page not found",
      });
    }

    const updatedNews = await prisma.newsPage.update({
      where: { id: id },
      data: { title: title, description: description },
    });

    return NextResponse.json({
      data: updatedNews,
      status: 200,
      message: "News page updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while updating news page",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.newsPage.delete({ where: { id: id } });

    return NextResponse.json({
      status: 200,
      message: "News page deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while deleting news page",
    });
  }
}
