import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const active = searchParams.get("active") === "true";

  try {
    if (page) {
      const whereCondition = active ? { active: active } : {};
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;

      const [data, total] = await Promise.all([
        prisma.career.findMany({
          where: whereCondition,
          skip,
          take: 10,
          orderBy: { createdAt: "desc" },
        }),
        prisma.career.count({ where: whereCondition }),
      ]);

      const lastPage = total > 10 ? Math.ceil(total / 10) : 1;
      return NextResponse.json({
        meta: {
          total: total,
          lastPage: lastPage,
          currentPage: page || 1,
          perPage: 10,
          prev: page && page > 1 ? page - 1 : null,
          next: page && page < lastPage ? page + 1 : null,
        },
        data: data,
        status: 200,
        message: "Careers retrieved successfully",
      });
    }

    const careers = await prisma.career.findMany({
      where: { active: true },
    });
    return NextResponse.json({
      data: careers,
      status: 200,
      message: "Careers retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while retrieving careers",
    });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const position = formData.get("position");
    const type = formData.get("type");
    const model = formData.get("model");
    const active = formData.get("active") === "true";
    const description = formData.get("description");
    const requirement = formData.get("requirement");
    const responsibility = formData.get("responsibility");
    const benefit = formData.get("benefit");
    const howToApply = formData.get("howToApply");

    const newCareer = await prisma.career.create({
      data: {
        position,
        description,
        requirement,
        responsibility,
        benefit,
        howToApply,
        type,
        model,
        active,
      },
    });

    return NextResponse.json({
      data: newCareer,
      status: 201,
      message: "Career created successfully",
    });
  } catch (error) {
    console.error("Error while creating career:", error);
    return NextResponse.json({
      status: 500,
      message: "Error while creating career",
    });
  }
}
