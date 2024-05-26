"use client";
import { signOut } from "next-auth/react";

export function BtnSignOut() {
  return <p onClick={() =>   signOut()}>Sign Out</p>;
}
