import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../images/route";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const page = parseInt(searchParams.get("page"), 10);

    if (page) {
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;

      const [data, total] = await Promise.all([
        prisma.team.findMany({ skip, take: 10, orderBy: { order: "asc" } }),
        prisma.team.count(),
      ]);

      const lastPage = Math.ceil(total / 10);

      return NextResponse.json({
        meta: {
          total,
          lastPage,
          currentPage: page,
          prev: page && page > 1 ? page - 1 : null,
          next: page && page < lastPage ? page + 1 : null,
        },
        data,
        status: 200,
        message: "Teams retrieved successfully",
      });
    } else {
      const teams = await prisma.team.findMany({ orderBy: { order: "asc" } });
      return NextResponse.json({
        data: teams,
        status: 200,
        message: "Teams retrieved successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while retrieving teams",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const position = formData.get("position");
  const order = parseInt(formData.get("order"), 10);
  const twitter = formData.get("twitter");
  const facebook = formData.get("facebook");
  const email = formData.get("email");
  const linkedin = formData.get("linkedin");
  const image = formData.get("image");

  try {
    const imageData =
      image && image instanceof Blob ? await CreateImage(image, name) : null;

    const newTeam = await prisma.team.create({
      data: {
        name: name,
        position: position,
        order: order,
        twitter: twitter || null,
        facebook: facebook || null,
        email: email || null,
        linkedin: linkedin || null,
        image: imageData,
      },
    });

    return NextResponse.json({
      data: newTeam,
      status: 201,
      message: "Team created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while creating team",
    });
  }
}
