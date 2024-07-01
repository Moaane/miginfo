import { NextResponse } from "next/server";
import path from "path";
import mime from "mime-types";
import { readdir, writeFile } from "fs/promises";
import { del, put } from "@vercel/blob";

export async function CreateImage(image, filename) {
  const blob = await put(filename, image, {
    access: "public",
  });

  return blob;
}

export async function UpdateImage(urlToDelete, image, filename) {
  try {
    await del(urlToDelete);
    const newImage = await put(filename, image, {
      access: "public",
    });

    return newImage;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: "Error updating image" });
  }
}

export async function DeleteImage(urlToDelete) {
  try {
    await del(urlToDelete);
    return NextResponse.json({
      status: 200,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Error deleting image" });
  }
}
