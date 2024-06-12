import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { CreateImage } from "../images/route";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const filter = searchParams.get("filter");
  const skip = (page - 1) * 10;

  const whereClause =
    filter === "onSection"
      ? { onSection: true }
      : filter === "published"
      ? { status: true }
      : {};

  try {
    if (page) {
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
          total,
          lastPage,
          currentPage: page,
          perPage: 10,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
        data,
        status: 200,
        message: "Services retrieved successfully",
      });
    } else {
      const services = await prisma.service.findMany({
        select: { name: true, slug: true, id: true },
      });

      return NextResponse.json({
        data: services,
        status: 200,
        message: "Services retrieved successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting services",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  let slug = formData.get("slug");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const onSection = formData.get("onSection") === "true";
  const status = formData.get("status") === "true";
  const icon = formData.get("icon");
  const image = formData.get("image");
  let imageName = formData.get("imageName");
  imageName = imageName || title;
  slug = slug || title.toLowerCase().replace(/\s+/g, "-");
  const iconName = `${imageName}-icon`;

  try {
    const existingService = await prisma.service.findUnique({
      where: { slug: slug },
    });

    if (existingService) {
      return NextResponse.json({
        status: 400,
        message: "Slug is already created",
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
      message: "Error while creating service",
    });
  }
}
