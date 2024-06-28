import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function EmptyMenu({ title }) {
  const pathname = usePathname();
  const newPathname = `${pathname}/new`;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h1>
      </div>
      <div
        className="flex flex-1 items-center py-12 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no {title.toLowerCase()}
          </h3>
          <Link href={newPathname} className="mt-4">
            <Button>Add {title}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
