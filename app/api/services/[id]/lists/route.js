import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

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

  try {
    const [data, total] = await Promise.all([
      prisma.serviceList.findMany({
        where: { serviceId: id },
        skip,
        take: perPage,
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
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed while getting service lists",
      error: error,
    });
  }
}

export async function POST(req, { params }) {
  const { id } = params;

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
  const title = formData.get("title");
  const order = parseInt(formData.get("order"));

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

  console.log(id)

  const res = await prisma.serviceList.create({
    data: {
      title,
      order,
      serviceId: id,
    },
  });
  try {

    return NextResponse.json({
      data: res,
      status: 201,
      message: "Service list created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while creating service list",
    });
  }
}
