import { NextResponse } from "next/server";
import { deleteImage } from "../../images/[filename]/route";
import prisma from "@/utils/db";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const application = await prisma.application.findUnique({
      where: { id: id },
    });

    if (!application) {
      return NextResponse.json({
        status: 404,
        message: "Application not found",
      });
    }

    return NextResponse.json({
      data: application,
      status: 200,
      message: "Application retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting application",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedApplication = await prisma.application.delete({
      where: { id: id },
    });

    if (deletedApplication.resume) {
      await deleteImage(deletedApplication.resume.filename);
    }

    return NextResponse.json({
      status: 200,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting application",
    });
  }
}
