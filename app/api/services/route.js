import prisma from "@/utils/db";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

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

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const perPage = parseInt(searchParams.get("perPage"), 10);
  const skip = page > 0 ? perPage * (page - 1) : 0;

  const [data, total] = await Promise.all([
    prisma.service.findMany({
      skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.service.count(),
  ]);
  const lastPage = Math.ceil(total / perPage);

  return NextResponse.json({
    meta: {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
    data,
    status: 200,
    message: "Fetch services successfully",
  });
}
export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

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
  let slug = formData.get("slug");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const onSection = formData.get("onSection") === "true";
  const status = formData.get("status") === "true";
  const image = formData.get("image");

  // If slug is empty, use name with separator '-'
  slug = slug || name.toLowerCase().replace(/\s+/g, "-");

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
    const newService = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        imgUrl,
        onSection,
        status,
        serviceCategories: {
          create: {
            categoryId,
          },
        },
      },
      include: {
        serviceCategories: true,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.error("Error while creating service:", error);
    return NextResponse.json({
      status: 500,
      message: "Error while creating service",
    });
  }
}
