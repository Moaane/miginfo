import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
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
  const type = searchParams.get("type")?.toUpperCase();

  try {
    const categories = await prisma.category.findMany({ where: { type } });
    return NextResponse.json({
      data: categories,
      status: 200,
      message: "Successfully fetch categories",
    });
  } catch (error) {
    console.log("Failed while fetching categories : ", error);
  }
}

export async function POST(req) {
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

  const body = req.json();
}
