import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const category = await prisma.category.findUnique({ where: { id: id } });
    return NextResponse.json({
      data: category,
      status: 200,
      message: "Category get successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting category",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const name = formData.get("name");
  const type = formData.get("type");

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        name: name,
        type: type,
      },
    });

    return NextResponse.json({
      data: updatedCategory,
      status: 200,
      message: "Category updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while updating category",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting category",
    });
  }
}
