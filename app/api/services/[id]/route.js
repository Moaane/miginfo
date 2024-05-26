import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function GET(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { id } = params;

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to get categories",
    });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to get categories",
    });
  }

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
      message: "Successfully fetch service",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while fething service",
    });
  }
}

export async function PATCH(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { id } = params;

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to get categories",
    });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized to get categories",
    });
  }

  const formData = await req.formData();
  const name = formData.get("title");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const onSection = formData.get("onSection") === "true";
  const status = formData.get("status") === "true";
  const image = formData.get("image");

  if (image != null && image instanceof Blob) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const sanitizedTitle = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const extension = path.extname(image.name);
    const uniqueSuffix = `-${uuidv4()}`;
    const imageName = `${sanitizedTitle}${uniqueSuffix}${extension}`;
    const imagePath = path.join(
      process.cwd(),
      "public/uploads/services",
      imageName
    );
    const imgUrl = `/services/${imageName}`;

    try {
      await writeFile(imagePath, buffer);
      const updatedService = await prisma.service.update({
        where: { id },
        data: {
          name: name,
          slug: slug,
          description: description,
          onSection,
          status,
          imgUrl,
          serviceCategories: {
            updateMany: {
              where: { serviceId: id },
              data: { categoryId: categoryId },
            },
          },
        },
        include: {
          serviceCategories: true,
        },
      });

      return NextResponse.json({
        data: updatedService,
        status: 200,
        message: "Service updated successfully",
      });
    } catch (error) {
      return NextResponse.json({
        status: 500,
        message: "Error while updating service",
      });
    }
  }

  try {
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        name: name,
        slug: slug,
        description: description,
        onSection,
        status,
        serviceCategories: {
          updateMany: {
            where: { serviceId: id },
            data: { categoryId: categoryId },
          },
        },
      },
      include: {
        serviceCategories: true,
      },
    });

    return NextResponse.json({
      data: updatedService,
      status: 200,
      message: "Service updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while updating service",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.service.delete({ where: { id } });

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
