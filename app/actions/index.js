"use server";

import { signIn, signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doLogin(formData) {
  try {
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log("response", response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
