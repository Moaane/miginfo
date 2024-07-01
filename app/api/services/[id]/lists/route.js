import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10);

  try {
    if (page) {
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;
      const [data, total] = await Promise.all([
        prisma.serviceList.findMany({
          where: { serviceId: id },
          skip: skip,
          take: 10,
          orderBy: {
            order: "asc",
          },
          include: {
            Services: {
              select: {
                name: true,
              },
            },
          },
        }),
        prisma.serviceList.count({ where: { serviceId: id } }),
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
        message: "Service lists retrieved successfully",
      });
    }

    const serviceList = await prisma.serviceList.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      data: serviceList,
      status: 200,
      message: "Service lists retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const name = formData.get("name");
  const order = parseInt(formData.get("order"), 10);

  try {
    const list = await prisma.serviceList.findFirst({
      where: { order: order },
    });

    if (list) {
      await prisma.serviceList.updateMany({
        where: { order: { gte: order } },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    const newList = await prisma.serviceList.create({
      data: {
        name,
        order,
        serviceId: id,
      },
    });

    return NextResponse.json({
      data: newList,
      status: 201,
      message: "Service list created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}
