import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { CreateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        serviceCategories: {
          include: { categories: { select: { name: true } } },
        },
      },
    });

    return NextResponse.json({
      data: service,
      status: 200,
      message: "Successfully getting service",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while getting service",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const name = formData.get("title");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const onSection = formData.get("onSection") === "true";
  const status = formData.get("status") === "true";
  const image = formData.get("image");
  const icon = formData.get("icon");
  let imageName = formData.get("imageName");
  const iconName = `${imageName}-icon`;

  try {
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingService && existingService.id !== id) {
      return NextResponse.json({
        status: 400,
        message: "Slug is already in use",
      });
    }

    const serviceCategories = await prisma.serviceCategory.findFirst({
      where: { serviceId: id },
    });

    if (!serviceCategories) {
      await prisma.serviceCategory.create({
        data: { serviceId: id, categoryId },
      });
    }

    const imageData =
      image && image instanceof Blob
        ? existingService.image
          ? await updateImage(existingService.image.filename, image, imageName)
          : await CreateImage(image, imageName)
        : existingService.image
        ? imageName !== existingService.image.name
          ? await renameImage(existingService.image.filename, imageName)
          : existingService.image
        : null;

    const iconData =
      icon && icon instanceof Blob
        ? existingService.icon
          ? await updateImage(existingService.icon.filename, icon, iconName)
          : await CreateImage(icon, iconName)
        : existingService.icon
        ? iconName !== existingService.icon.name
          ? await renameImage(existingService.icon.filename, iconName)
          : existingService.icon
        : null;

    const updatedService = await prisma.service.update({
      where: { id: id },
      data: {
        name: name,
        slug: slug,
        image: imageData,
        icon: iconData,
        description: description,
        onSection: onSection,
        status: status,
        serviceCategories: {
          updateMany: { where: { serviceId: id }, data: { categoryId } },
        },
      },
    });

    return NextResponse.json({
      data: updatedService,
      status: 200,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({
      status: 500,
      message: "Error while updating service",
    });
  }
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { id } = params;

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to delete service",
    });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to delete service",
    });
  }

  try {
    const deleteImage = async (oldFilename) => {
      await fetch(`${process.env.BASE_URL}/api/images/${oldFilename}`, {
        method: "DELETE",
      });
    };

    const deletedService = await prisma.service.delete({ where: { id } });
    const deletedLists = await prisma.serviceList.deleteMany({
      where: { serviceId: deletedService.id },
    });

    if (deletedService.icon) {
      await deleteImage(deletedService.icon.filename);
    }

    if (deletedService.image) {
      await deleteImage(deletedService.image.filename);
    }

    return NextResponse.json({
      status: 200,
      message: "Service deleted succesfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting service",
    });
  }
}
