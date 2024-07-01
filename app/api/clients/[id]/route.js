import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {
  deleteImage,
  renameImage,
  updateImage,
} from "../../images/[url]/route";
import { CreateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        clientCategories: {
          include: { categories: { select: { name: true } } },
        },
      },
    });

    return NextResponse.json({
      data: client,
      status: 200,
      message: "Client retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting client",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const formData = await req.formData();
  const name = formData.get("name");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  const imageName = formData.get("imageName");

  try {
    const clientCategories = await prisma.clientCategory.findFirst({
      where: { clientId: id },
    });

    if (!clientCategories) {
      await prisma.clientCategory.create({
        data: { clientId: id, categoryId },
      });
    }

    const client = await prisma.client.findUnique({ where: { id: id } });

    if (!client) {
      return NextResponse.json({
        status: 404,
        message: "Client not found",
      });
    }

    const imageData =
      image && image instanceof Blob
        ? client.image
          ? await updateImage(client.image.filename, image, imageName)
          : await CreateImage(image, imageName)
        : client.image
        ? imageName !== client.image.name
          ? await renameImage(client.image.filename, imageName)
          : client.image
        : null;

    if (imageData && imageData.filename) {
      const updatedClient = await prisma.client.update({
        where: { id: id },
        data: {
          name: name,
          image: imageData,
          clientCategories: {
            updateMany: {
              where: { clientId: id },
              data: { categoryId: categoryId },
            },
          },
        },
        include: {
          clientCategories: true,
        },
      });

      return NextResponse.json({
        data: updatedClient,
        status: 200,
        message: "News updated successfully",
      });
    } else {
      const result = await imageData.json();
      return NextResponse.json({
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while updating news",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedClient = await prisma.client.delete({ where: { id } });

    deletedClient.image ? await deleteImage(deletedClient.filename) : null;

    return NextResponse.json({
      status: 200,
      message: "Successfully fetch service",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while fething service",
    });
  }
}
