import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const career = await prisma.career.findUnique({
      where: { id: id },
    });

    if (!career) {
      return NextResponse.json({
        status: 404,
        message: "career not found",
      });
    }

    return NextResponse.json({
      data: career,
      status: 200,
      message: "career retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while finding career",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const formData = await req.formData();
    const position = formData.get("position");
    const description = formData.get("description");
    const requirement = formData.get("requirement");
    const responsibility = formData.get("responsibility");
    const benefit = formData.get("benefit");
    const howToApply = formData.get("howToApply");
    const type = formData.get("type");
    const model = formData.get("model");
    const active = formData.get("active") === "true";

    const career = await prisma.career.findUnique({ where: { id: id } });

    if (!career) {
      return NextResponse.json({
        status: 404,
        message: "Career not found",
      });
    }

    const updatedCareeer = await prisma.career.update({
      where: { id: id },
      data: {
        position: position,
        description: description,
        requirement: requirement,
        responsibility: responsibility,
        benefit: benefit,
        howToApply: howToApply,
        model: model,
        type: type,
        active: active,
      },
    });

    return NextResponse.json({
      data: updatedCareeer,
      status: 200,
      message: "Career updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while updating career",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.jobRequirement.deleteMany({ where: { careerId: id } });
    await prisma.career.delete({ where: { id: id } });

    return NextResponse.json({
      status: 200,
      message: "Career deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error whiie deleting career",
    });
  }
}
