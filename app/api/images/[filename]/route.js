import { NextResponse } from "next/server";
import path from "path";
import fs, { readdir, rename, unlink, writeFile } from "fs/promises";
import mime from "mime-types";

const UPLOAD_DIR = path.resolve("./public");

export async function GET(req, { params }) {
  const { filename } = params;
  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    const file = await fs.readFile(filePath);
    const mimeType = mime.lookup(filename) || "application/octet-stream";
    const response = new NextResponse(file, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}

export async function updateImage(filename, image, imageName) {
  if (!imageName) {
    return NextResponse.json({
      status: 400,
      message: "image name is required",
    });
  }

  try {
    const extension = mime.extension(image.type);
    const sanitizedName = imageName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const newFilename = `${sanitizedName}.${extension}`;

    const oldFilepath = path.join(UPLOAD_DIR, filename);
    const newFilepath = path.join(UPLOAD_DIR, newFilename);

    if (oldFilepath !== newFilepath) {
      const files = await readdir(UPLOAD_DIR);
      if (files.includes(newFilename)) {
        return NextResponse.json({
          status: 400,
          message: "Image with that name already exist",
        });
      }
    }
    const buffer = Buffer(await image.arrayBuffer());
    await unlink(oldFilepath);
    await writeFile(newFilepath, buffer);

    return { filename: newFilename, name: imageName };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Error updating image" });
  }
}

export async function renameImage(filename, imageName) {
  try {
    const extension = filename.split(".").pop();
    const sanitizedName = imageName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const newFilename = `${sanitizedName}.${extension}`;

    const files = await readdir(UPLOAD_DIR);
    if (files.includes(newFilename)) {
      return NextResponse.json({
        status: 400,
        message: "Image with that name already exist",
      });
    }

    const newFilepath = path.join(UPLOAD_DIR, newFilename);
    const oldFilepath = path.join(UPLOAD_DIR, filename);
    await rename(oldFilepath, newFilepath);

    return { filename: newFilename, name: imageName };
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error updating image",
    });
  }
}

export async function deleteImage(filename) {
  try {
    const filepath = path.join(UPLOAD_DIR, filename);
    await unlink(filepath);
    return NextResponse.json({
      status: 200,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Error deleting image" });
  }
}
