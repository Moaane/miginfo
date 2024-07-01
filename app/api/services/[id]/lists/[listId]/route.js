import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { listId } = params;

  try {
    const list = await prisma.serviceList.findUnique({ where: { id: listId } });

    if (!list) {
      return NextResponse.json({ status: 404, error: "list not found" });
    }

    return NextResponse.json({
      data: list,
      status: 200,
      message: "Service list get succesfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "internal server error",
    });
  }
}

export async function PUT(req, { params }) {
  const { listId } = params;
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
      error: "internal server error",
    });
  }
}

export async function DELETE(req, { params }) {
  const { listId } = params;

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
      error: "internal server error",
    });
  }
}
