import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const feature = await prisma.feature.findUnique({ where: { id: id } });

    if (!feature) {
      return NextResponse.json({
        status: 404,
        error: "Feature not found",
      });
    }

    return NextResponse.json({
      data: feature,
      status: 200,
      message: "Feature retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while retrieving feature",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");

    const feature = await prisma.feature.findUnique({ where: { id: id } });

    if (!feature) {
      return NextResponse.json({
        status: 404,
        message: "Feature not found",
      });
    }

    const updatedFeature = await prisma.feature.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
      },
    });

    return NextResponse.json({
      data: updatedFeature,
      status: 200,
      message: "Feature updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while updating feature",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.feature.delete({ where: { id: id } });

    return NextResponse.json({
      status: 200,
      message: "Feature deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while deleting feature",
    });
  }
}
