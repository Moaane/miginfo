import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { CreateImage } from "../images/route";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10);
  const filter = searchParams.get("filter");

  try {
    const whereClause =
      filter === "onSection"
        ? { onSection: true }
        : filter === "published"
        ? { status: true }
        : {};

    if (page) {
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;

      const [data, total] = await Promise.all([
        prisma.service.findMany({
          where: whereClause,
          skip,
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            serviceCategories: {
              select: { categories: { select: { name: true } } },
            },
          },
        }),
        prisma.service.count({ where: whereClause }),
      ]);

      const lastPage = Math.ceil(total / 10);
      return NextResponse.json({
        meta: {
          total: total,
          lastPage: lastPage,
          currentPage: page,
          perPage: 10,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
        data: data,
        status: 200,
        message: "Services retrieved successfully",
      });
    }

    const services = await prisma.service.findMany({
      where: whereClause,
      select: { name: true, slug: true, id: true },
    });

    return NextResponse.json({
      data: services,
      status: 200,
      message: "Services retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while getting services",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const slug = (formData.get("slug") || title)
    .toLowerCase()
    .replace(/\s+/g, "-");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const onSection = formData.get("onSection") === "true";
  const status = formData.get("status") === "true";
  const icon = formData.get("icon");
  const image = formData.get("image");
  const imageName = (formData.get("imageName") || title)
    .toLowerCase()
    .replace(/\s+/g, "-");
  const iconName = `${imageName}-icon`;

  try {
    const existingService = await prisma.service.findUnique({
      where: { slug: slug },
    });

    if (existingService) {
      return NextResponse.json({
        status: 400,
        error: "Slug is already created",
      });
    }

    const imageData =
      image && image instanceof Blob
        ? await CreateImage(image, imageName)
        : null;

    const iconData =
      icon && icon instanceof Blob ? await CreateImage(icon, iconName) : null;

    const newService = await prisma.service.create({
      data: {
        name: title,
        slug: slug,
        image: imageData,
        icon: iconData,
        description: description,
        onSection: onSection,
        status: status,
        serviceCategories: {
          create: {
            categoryId: categoryId,
          },
        },
      },
    });

    return NextResponse.json({
      data: newService,
      status: 201,
      message: "Service created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while creating service",
    });
  }
}
