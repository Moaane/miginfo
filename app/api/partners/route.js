import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { CreateImage } from "../images/route";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const filter = searchParams.get("filter");

  const whereCondition =
    filter && filter !== "ALL"
      ? { partnerCategories: { every: { categoryId: filter } } }
      : {};

  if (page) {
    const skip = page > 0 ? 10 * (page - 1) : 0;
    const [data, total] = await Promise.all([
      prisma.partner.findMany({
        where: whereCondition,
        skip: skip,
        take: 10,
        orderBy: { name: "asc" },
        include: {
          partnerCategories: {
            select: {
              categories: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      prisma.partner.count({ where: whereCondition }),
    ]);
    const lastPage = total > 10 ? Math.ceil(total / 10) : 1;

    return NextResponse.json({
      meta: {
        total,
        lastPage,
        currentPage: page || 1,
        perPage: 10 || total,
        prev: page && page > 1 ? page - 1 : null,
        next: page && page < lastPage ? page + 1 : null,
      },
      data,
      status: 200,
      message: "Successfully get partner",
    });
  } else {
    const partners = await prisma.category.findMany({
      where: { type: "PARTNER" },
      include: {
        partnerCategories: {
          select: { partners: true },
        },
      },
    });

    return NextResponse.json({
      data: partners,
      status: 200,
      message: "Partners retrieved successfully",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const categoryId = formData.get("category");
  const image = formData.get("image");
  let imageName = formData.get("imageName");
  imageName = imageName || name;

  try {
    const imageData =
      image && image instanceof Blob
        ? await CreateImage(image, imageName)
        : null;

    const newPartner = await prisma.partner.create({
      data: {
        name: name,
        image: imageData,
        partnerCategories: {
          create: {
            categoryId: categoryId,
          },
        },
      },
      include: {
        partnerCategories: true,
      },
    });
    return NextResponse.json({
      data: newPartner,
      status: 201,
      message: "Partner created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while creating partner",
    });
  }
}
