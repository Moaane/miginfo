import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    // <div className="w-full h-[80vh] flex justify-center items-center">
    //   <Loader2 className="h-32 w-32 animate-spin" />
    // </div>
    <div class="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
      <span class="sr-only">Loading...</span>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
