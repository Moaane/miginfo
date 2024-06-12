import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { CreateImage } from "../../images/route";

export async function GET() {
  try {
    const aboutPages = await prisma.aboutPage.findMany({
      orderBy: { head: "asc" },
    });

    return NextResponse.json({
      data: aboutPages,
      status: 200,
      message: "About pages retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while retrieving about pages",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const direction = formData.get("direction").toUpperCase();
  const head = formData.get("head") === "true";

  try {
    if (head === true) {
      const existingHeadPage = await prisma.aboutPage.findFirst({
        where: { head: true },
      });

      if (existingHeadPage) {
        return NextResponse.json({
          status: 400,
          message: "Head section already created",
        });
      }
    }

    const imageData =
      image && image instanceof Blob ? await CreateImage(image, title) : null;

    const newAboutPage = await prisma.aboutPage.create({
      data: {
        title: title,
        description: description,
        direction: description,
        head: head,
        image: imageData,
      },
    });

    return NextResponse.json({
      data: newAboutPage,
      status: 201,
      message: "About page created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while creating about page",
    });
  }
}
