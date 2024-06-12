import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const partners = [
  {
    name: "Audio Visual",
  },
  {
    name: "Network & Security",
  },
  {
    name: "Server & Storage",
  },
  {
    name: "Data & Analytics",
  },
  {
    name: "Productivity",
  },
  {
    name: "Data Protection",
  },
  {
    name: "Surveillance & Security System",
  },
  {
    name: "UPS, RACK, Power & Cooling",
  },
  {
    name: "PC END Compiling",
  },
];

export default function page() {
  return (
    <>
      <div className="mt-32 lg:mt-32 h-full space-y-24 px-4 lg:px-8 xl:px-16 pb-4 lg:pb-0">
        <Tabs
          defaultValue={partners[0].name}
          className="w-full flex flex-col md:flex-row items-center gap-6 m-0 p-0"
        >
          <div className="w-full md:w-1/3 p-6 md:sticky md:top-32 md:self-start bg-blue-100">
            <TabsList className="flex flex-col h-full">
              {partners.map((partner, index) => (
                <TabsTrigger key={index} value={index}>
                  {partner.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {partners.map((partner, index) => (
            <TabsContent
              key={index}
              value={index}
              className="w-full md:w-2/3 h-[300vh] bg-blue-100"
            >
              <h1>{partner.name}</h1>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
