import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"), 10);

    if (page) {
      const skip = page > 0 ? 10 * (page - 1) : 0;
      const [data, total] = await Promise.all([
        prisma.feature.findMany({
          skip,
          take: 10,
        }),
        prisma.feature.count(),
      ]);

      const lastPage = total > 10 ? Math.ceil(total / 10) : 1;

      return NextResponse.json({
        meta: {
          total: total,
          lastPage: lastPage,
          currentPage: page,
          perPage: 10 || total,
          prev: page && page > 1 ? page - 1 : null,
          next: page && page < lastPage ? page + 1 : null,
        },
        data: data,
        status: 200,
        message: "Features retrieved successfully",
      });
    }

    const features = await prisma.feature.findMany();

    return NextResponse.json({
      data: features,
      status: 200,
      message: "Features retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Error while retrieving features",
    });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");

    const newFeature = await prisma.feature.create({
      data: {
        title: title,
        description: description,
      },
    });

    return NextResponse.json({
      data: newFeature,
      status: 201,
      message: "Feature created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Error while creating new feature",
    });
  }
}
