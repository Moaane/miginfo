import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Loader2 className="h-32 w-32 animate-spin" />
    </div>
  );
}
