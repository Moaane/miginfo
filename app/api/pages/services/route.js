import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../../images/route";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10);
  const card = searchParams.get("card") === "true";
  const nav = searchParams.get("nav") === "true";

  try {
    if (page) {
      const skip = page > 0 ? 10 * (page - 1) : 0;
      const [data, total] = await Promise.all([
        prisma.servicePage.findMany({
          skip: skip,
          take: 10,
          orderBy: [{ head: "desc" }, { title: "asc" }],
        }),
        prisma.servicePage.count(),
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

    if (card) {
      const serviceCard = await prisma.service.findMany({
        where: { onSection: true },
      });

      return NextResponse.json({
        data: serviceCard,
        status: 200,
        message: "service retrieved successfully",
      });
    }

    if (nav) {
      const serviceNav = await prisma.service.findMany({
        select: { slug: true, name: true },
      });

      return NextResponse.json({
        data: serviceNav,
        status: 200,
        message: "service retrieved successfully",
      });
    }

    const servicePages = await prisma.servicePage.findMany({
      orderBy: [{ head: "desc" }, { title: "asc" }],
    });

    return NextResponse.json({
      data: servicePages,
      status: 200,
      message: "Service pages retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while retrieving serivice pages",
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
      const existingHeadPage = await prisma.servicePage.findFirst({
        where: { head: true },
      });

      if (existingHeadPage) {
        return NextResponse.json({
          status: 400,
          error: "Head section already created",
        });
      }
    }

    const imageData =
      image && image instanceof Blob ? await CreateImage(image, title) : null;

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
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while createing service page",
    });
  }
}
