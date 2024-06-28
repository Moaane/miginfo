"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [datas, setDatas] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");

  async function fetchPartners() {
    try {
      const response = await fetch("../api/partners", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setDatas(result.data);
      if (result.data.length > 0) {
        setSelectedTab(result.data[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 md:px-16 xl:px-20 py-12">
      <div className="flex-grow w-full mt-6 max-w-7xl">
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
          className="w-full flex flex-col md:flex-row items-center gap-6 m-0 p-0"
        >
          <div className="w-full md:w-1/3 p-6 md:sticky md:top-32 top-32 md:self-start shadow-md rounded-lg">
            <TabsList className="flex flex-col h-full">
              {datas?.map((data) => (
                <TabsTrigger
                  key={data.id}
                  value={data.name}
                  className="rounded-lg"
                >
                  {data.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {datas.map((data) => (
            <TabsContent
              key={data.id}
              value={data.name}
              className="w-full md:w-2/3 min-h-screen bg-gray-100 rounded-lg"
            >
              <div className="flex flex-wrap justify-center md:justify-start p-4 gap-6">
                {data.partnerCategories?.map((prop) => (
                  <div key={prop.partners.id}>
                    <div className="w-full py-4 px-10 md:w-40 xl:w-52 h-32 group overflow-hidden relative bg-white rounded-lg shadow-md">
                      <h3 className="absolute inset-0 flex items-center justify-center transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 font-semibold">
                        {prop.partners.name}
                      </h3>
                      <Image
                        width={200}
                        height={200}
                        priority
                        src={`/api/images/${prop.partners.image.filename}`}
                        alt={prop.partners.image.name}
                        className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out group-hover:translate-y-64"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
