import { notFound, redirect } from "next/navigation";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Sidebar from "@/components/navigation/Sidebar";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound()
  }

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar children={children} />
      </div>
    </>
  );
}
