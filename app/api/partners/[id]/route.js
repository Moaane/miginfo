import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import {
  deleteImage,
  renameImage,
  updateImage,
} from "../../images/[filename]/route";
import { CreateImage } from "../../images/route";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        partnerCategories: {
          include: { categories: { select: { name: true } } },
        },
      },
    });

    return NextResponse.json({
      data: partner,
      status: 200,
      message: "Successfully get partner",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while getting partner",
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const formData = await req.formData();
  const name = formData.get("name");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  let imageName = formData.get("imageName");

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

    console.log(image);

    const imageData =
      image && image instanceof Blob
        ? partner.image
          ? await updateImage(partner.image.filename, image, imageName)
          : await CreateImage(image, imageName)
        : partner.image
        ? imageName !== partner.image.name
          ? await renameImage(partner.image.filename, imageName)
          : partner.image
        : null;

    if (imageData && imageData.filename) {
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
      message: "Error while updating partner",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedPartner = await prisma.partner.delete({ where: { id } });

    deletedPartner.image
      ? await deleteImage(deletedPartner.image.filename)
      : null;

    return NextResponse.json({
      status: 200,
      message: "Partner deleted succesfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while deleting partner",
    });
  }
}
