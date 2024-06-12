import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../../images/route";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const skip = (page - 1) * 10;

  try {
    if (page) {
      const [data, total] = await Promise.all([
        prisma.servicePage.findMany({
          skip: skip,
          take: 10,
          orderBy: { head: "asc", title: "asc" },
        }),
        prisma.servicePage.count(),
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
      const servicePages = await prisma.servicePage.findMany({
        orderBy: { head: "asc", title: "asc" },
      });

      const service = await prisma.service.findMany({
        select: { name: true, slug: true, id: true },
      });

      return NextResponse.json({
        data: {
          section: servicePages,
          nav: service,
        },
        status: 200,
        message: "Service pages retrieved successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while retrieving serivice pages",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const direction = formData.get("direction");
  const head = formData.get("head") === "true";

  try {
    if (head === true) {
      const existingHeadPage = await prisma.servicePage.findFirst({
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

    if (imageData.filename || null) {
      const newServicePage = await prisma.servicePage.create({
        data: {
          title: title,
          description: description,
          direction: direction,
          head: head,
          image: imageData,
        },
      });

      return NextResponse.json({
        data: newServicePage,
        status: 201,
        message: "Service page created successfully",
      });
    } else {
      const result = await imageData.json();
      return NextResponse.json({
        status: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while createing service page",
    });
  }
}
