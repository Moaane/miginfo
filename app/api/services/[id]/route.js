import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage, DeleteImage, UpdateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const service = await prisma.service.findUnique({
      where: { id: id },
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
      error: "Failed while getting service",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const name = formData.get("title");
  const slug = formData.get("slug").toLowerCase().replace(/\s+/g, "-");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const onSection = formData.get("onSection") === "true";
  const status = formData.get("status") === "true";
  const image = formData.get("image");
  const icon = formData.get("icon");
  const imageName = formData.get("imageName");
  const iconName = `${imageName}-icon`;

  try {
    const existingService = await prisma.service.findUnique({
      where: { slug: slug },
    });

    if (existingService && existingService.id !== id) {
      return NextResponse.json({
        status: 400,
        error: "Slug is already in use",
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
          ? await UpdateImage(existingService.image.url, image, imageName)
          : await CreateImage(image, imageName)
        : existingService.image;

    const iconData =
      icon && icon instanceof Blob
        ? existingService.icon
          ? await UpdateImage(existingService.icon.url, icon, iconName)
          : await CreateImage(icon, iconName)
        : existingService.icon;

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
      error: "Error while updating service",
    });
  }
}

export async function DELETE(req, { params }) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // if (!token) {
  //   return NextResponse.json({
  //     status: 401,
  //     message: "Unauthorized to delete service",
  //   });
  // }

  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({
  //     status: 401,
  //     message: "Unauthorized to delete service",
  //   });
  // }

  const { id } = params;

  try {
    const deletedService = await prisma.service.delete({ where: { id: id } });

    await prisma.serviceList.deleteMany({
      where: { serviceId: deletedService.id },
    });

    deletedService.image ? await DeleteImage(deletedService.image.url) : null;
    deletedService.icon ? await DeleteImage(deletedService.icon.url) : null;

    return NextResponse.json({
      status: 200,
      message: "Service deleted succesfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}
