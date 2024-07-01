import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage, DeleteImage, UpdateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const team = await prisma.team.findUnique({ where: { id: id } });

    if (!team) {
      return NextResponse.json({
        status: 404,
        error: "Team not found",
      });
    }

    return NextResponse.json({
      data: team,
      status: 200,
      message: "Team retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while retrieve team",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const name = formData.get("name");
  const position = formData.get("position");
  const twitter = formData.get("twitter");
  const facebook = formData.get("facebook");
  const email = formData.get("email");
  const linkedin = formData.get("linkedin");
  const image = formData.get("image");

  try {
    const team = await prisma.team.findUnique({ where: { id: id } });

    if (!team) {
      return NextResponse.json({
        status: 404,
        message: "Team not found",
      });
    }

    const imageData =
      image && image instanceof Blob
        ? team.image
          ? await UpdateImage(team.image.url, image, name)
          : await CreateImage(image, name)
        : team.image;

    const updatedTeam = await prisma.team.update({
      where: { id: id },
      data: {
        name: name,
        position: position,
        twitter: twitter,
        facebook: facebook,
        email: email,
        linkedin: linkedin,
        image: imageData,
      },
    });

    return NextResponse.json({
      data: updatedTeam,
      status: 200,
      message: "Team updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while updating image",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedTeam = await prisma.team.delete({ where: { id: id } });

    deletedTeam.image ? await DeleteImage(deletedTeam.image.url) : null;

    return NextResponse.json({
      status: 200,
      message: "Team deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while deleting team",
    });
  }
}
