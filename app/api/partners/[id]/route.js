import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage, DeleteImage, UpdateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const partner = await prisma.partner.findUnique({
      where: { id: id },
      include: {
        partnerCategories: {
          include: { categories: { select: { name: true } } },
        },
      },
    });

    if (!partner) {
      return NextResponse.json({ status: 404, error: "partner not found" });
    }

    return NextResponse.json({
      data: partner,
      status: 200,
      message: "Successfully get partner",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const name = formData.get("name");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  const imageName = formData
    .get("imageName")
    .toLowerCase()
    .replace(/\s+/g, "-");

  try {
    const partnerCategories = await prisma.partnerCategory.findFirst({
      where: { partnerId: id },
    });

    if (!partnerCategories) {
      await prisma.partnerCategory.create({
        data: { partnerId: id, categoryId },
      });
    }

    const partner = await prisma.partner.findUnique({ where: { id: id } });

    const imageData =
      image && image instanceof Blob
        ? partner.image
          ? await UpdateImage(partner.image.url, image, imageName)
          : await CreateImage(image, imageName)
        : partner.image;

    const updatedPartner = await prisma.partner.update({
      where: { id },
      data: {
        name: name,
        image: imageData,
        partnerCategories: {
          updateMany: {
            where: { partnerId: id },
            data: { categoryId: categoryId },
          },
        },
      },
      include: {
        partnerCategories: true,
      },
    });

    return NextResponse.json({
      data: updatedPartner,
      status: 200,
      message: "Partner updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedPartner = await prisma.partner.delete({ where: { id } });

    deletedPartner.image ? await DeleteImage(deletedPartner.image.url) : null;

    return NextResponse.json({
      status: 200,
      message: "Partner deleted succesfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}
