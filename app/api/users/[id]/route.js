import prisma from "@/utils/db";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return NextResponse.json({
      data: user,
      status: 200,
      message: "user retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "username already in use" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.update({
      where: { id: id },
      data: { username: username, password: password },
    });

    return NextResponse.json({
      data: newUser,
      status: 200,
      message: "user updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: "internal server error",
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.user.delete({ where: { id: id } });

    return NextResponse.json({
      status: 200,
      message: "user deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "internal server error",
    });
  }
}
