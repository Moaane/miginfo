import { NextResponse } from "next/server";
import path from "path";
import mime from "mime-types";
import { readdir, writeFile } from "fs/promises";

const UPLOAD_DIR = path.resolve("./uploads");

export async function CreateImage(image, imageName) {
  try {
    if (!image || !image instanceof Blob) {
      return NextResponse.json({ status: 400, message: "No image provided" });
    }

    if (!imageName) {
      return NextResponse.json({
        status: 400,
        message: "No image name or title provided",
      });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const extension = mime.extension(image.type);
    const sanitizedName = imageName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const filename = `${sanitizedName}.${extension}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const files = await readdir(UPLOAD_DIR);
    if (files.includes(filePath)) {
      return NextResponse.json({
        status: 400,
        message: "Image with that name already exist",
      });
    }

    await writeFile(filePath, buffer);
    return { filename: filename, name: imageName };
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while uploading image",
    });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");
  const imageName = formData.get("imageName");

  try {
    if (!image || !image instanceof Blob) {
      return NextResponse.json({ status: 400, message: "No image provided" });
    }

    if (!imageName) {
      return NextResponse.json({
        status: 400,
        message: "No image name or title provided",
      });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const extension = mime.extension(image.type);
    const sanitizedName = imageName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const filename = `${sanitizedName}.${extension}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const files = await readdir(UPLOAD_DIR);
    if (files.includes(filePath)) {
      return NextResponse.json({
        status: 400,
        message: "Image with that name already exist",
      });
    }

    await writeFile(filePath, buffer);
    return NextResponse.json({
      data: { filename: filename, name: imageName },
      status: 201,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while uploading image",
    });
  }
}
