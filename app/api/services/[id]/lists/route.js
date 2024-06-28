import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const skip = page > 0 ? 10 * (page - 1) : 0;

  try {
    if (page) {
      const [data, total] = await Promise.all([
        prisma.serviceList.findMany({
          where: { serviceId: id },
          skip,
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
          total,
          lastPage,
          currentPage: page,
          perPage: 10,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
        data,
        status: 200,
        message: "Service lists get successfully",
      });
    } else {
      const serviceList = await prisma.serviceList.findMany({
        orderBy: { order: "asc" },
      });

      return NextResponse.json({
        data: serviceList,
        status: 200,
        message: "Service lists retrieved successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Failed while getting service lists",
      error: error,
    });
  }
}

export async function POST(req, { params }) {
  const { id } = params;

  const formData = await req.formData();
  const name = formData.get("name");
  const order = parseInt(formData.get("order"));

  try {
    const list = await prisma.serviceList.findFirst({ where: { order } });

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
      message: "Error while creating service list",
    });
  }
}
