import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);
  const filter = searchParams.get("filter").toUpperCase();

  try {
    const whereCondition = filter && filter !== "ALL" ? { type: filter } : {};

    const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;

    const dataPromise = prisma.category.findMany({
      where: whereCondition,
      skip,
      take: 10,
      orderBy: { type: "asc" },
    });

    const totalPromise = prisma.category.count({ where: whereCondition });

    const [data, total] = await Promise.all([dataPromise, totalPromise]);

    const lastPage = total > 10 ? Math.ceil(total / 10) : 1;

    return NextResponse.json({
      meta: {
        total,
        lastPage,
        currentPage: page || 1,
        perPage: 10,
        prev: page && page > 1 ? page - 1 : null,
        next: page && page < lastPage ? page + 1 : null,
      },
      data: data,
      status: 200,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while getting categories",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const type = formData.get("type");

  try {
    const newCategory = await prisma.category.create({ data: { name, type } });
    return NextResponse.json({
      data: newCategory,
      status: 201,
      message: "Category created succesffully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while creating category",
    });
  }
}
