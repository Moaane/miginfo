import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../../images/route";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10) || 1;

  try {
    if (page) {
      const skip = page > 0 ? 10 * (page - 1) : 0;
      const [data, total] = await Promise.all([
        prisma.aboutPage.findMany({
          skip,
          take: 10,
          orderBy: { head: "desc" },
        }),
        prisma.aboutPage.count(),
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

    const aboutPages = await prisma.aboutPage.findMany({
      orderBy: { head: "desc" },
    });

    return NextResponse.json({
      data: aboutPages,
      status: 200,
      message: "About pages retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while retrieving about pages",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const direction = formData.get("direction").toUpperCase();
  const head = formData.get("head") === "true";

  try {
    if (head === true) {
      const existingHeadPage = await prisma.aboutPage.findFirst({
        where: { head: true },
      });

      if (existingHeadPage) {
        return NextResponse.json({
          status: 400,
          message: "Head section already created",
        });
      }
    }

    const imageData =
      image && image instanceof Blob ? await CreateImage(image, title) : null;

    const newAboutPage = await prisma.aboutPage.create({
      data: {
        title: title,
        description: description,
        direction: direction,
        head: head,
        image: imageData,
      },
    });

    return NextResponse.json({
      data: newAboutPage,
      status: 201,
      message: "About page created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while creating about page",
    });
  }
}
