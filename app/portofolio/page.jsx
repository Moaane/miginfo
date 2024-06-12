import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function page() {
  return (
    <>
      <div className="mt-32 lg:mt-32 h-full space-y-24 px-4 lg:px-8 xl:px-16 pb-4 lg:pb-0">
        <Tabs defaultValue="porto1" className="w-full flex flex-col md:flex-row items-center gap-6 m-0 p-0">
          <div className="w-full md:w-1/3 p-6 md:sticky md:top-32 md:self-start bg-blue-100">
            <TabsList className="flex flex-col h-full">
              <TabsTrigger value="porto1">Web Development 1</TabsTrigger>
              <TabsTrigger value="porto2">Web Development 2</TabsTrigger>
              <TabsTrigger value="porto3">Web Development 3</TabsTrigger>
              <TabsTrigger value="porto4">Web Development 4</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="porto1" className="w-full md:w-2/3 h-[300vh] bg-blue-100">
            <h1>ini porto 1</h1>
          </TabsContent>
          <TabsContent value="porto2" className="w-full md:w-2/3 h-[300vh] bg-blue-100">
            <h1>ini porto 2</h1>
          </TabsContent>
          <TabsContent value="porto3" className="w-full md:w-2/3 h-[300vh] bg-blue-100">
            <h1>ini porto 3</h1>
          </TabsContent>
          <TabsContent value="porto4" className="w-full md:w-2/3 h-[300vh] bg-blue-100">
            <h1>ini porto 4</h1>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
