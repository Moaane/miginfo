import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { listId } = params;

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

  try {
    const list = await prisma.serviceList.findUnique({ where: { id: listId } });

    return NextResponse.json({
      data: list,
      status: 200,
      message: "Service list get succesfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting service list",
    });
  }
}
export async function PATCH(req, { params }) {
  const { listId } = params;

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

  try {
    const currentList = await prisma.serviceList.findUnique({
      where: { id: listId },
    });
    const currentOrder = currentList.order;

    const updatedList = await prisma.serviceList.update({
      where: { id: listId },
      data: { title, order },
    });

    console.log("titik awal", currentOrder);
    console.log("titik akhir", updatedList.order);

    await prisma.serviceList.updateMany({
      where: {
        serviceId: updatedList.serviceId,
        NOT: { id: updatedList.id },
        order: { gt: currentOrder, lte: updatedList.order },
      },
      data: { order: { decrement: 1 } },
    });

    return NextResponse.json({
      data: updatedList,
      status: 200,
      message: "Service list updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while updating service list",
    });
  }
}

export async function DELETE(req, { params }) {
  const { listId } = params;

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

  try {
    const deletedList = await prisma.serviceList.delete({
      where: { id: listId },
    });

    await prisma.serviceList.updateMany({
      where: { order: { gt: deletedList.order } },
      data: {
        order: { decrement: 1 },
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Service list deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting service list",
    });
  }
}
