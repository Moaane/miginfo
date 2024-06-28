import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl">
        <Skeleton className="h-[512px] w-full bg-slate-400" />
        <div className="space-y-2 my-8">
          <Skeleton className="h-4 w-[250px] bg-slate-400" />
          <Skeleton className="h-4 w-[200px] bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
