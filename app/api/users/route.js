import prisma from "@/utils/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page"), 10);

  try {
    if (page) {
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;

      const [data, total] = await Promise.all([
        prisma.user.findMany({ skip, take: 10 }),
        prisma.user.count(),
      ]);

      const lastPage = Math.ceil(total / 10);

      return NextResponse.json({
        meta: {
          total: total,
          lastPage: lastPage,
          currentPage: page,
          prev: page && page > 1 ? page - 1 : null,
          next: page && page < lastPage ? page + 1 : null,
        },
        data: data,
        status: 200,
        message: "users retrieved successfully",
      });
    }

    const users = await prisma.user.findMany();

    return NextResponse.json({
      data: users,
      status: 200,
      message: "users retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashPassword },
    });

    return NextResponse.json({
      data: newUser,
      status: 201,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
