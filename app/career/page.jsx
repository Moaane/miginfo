import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MapPin } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

async function fetchCareers() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/career`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

function calculateDays(date) {
  console.log(date);
  const today = new Date();

  const difference = date.getTime() - today.getTime();

  const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (daysDifference < 7) {
    return `Diupload ${daysDifference} hari yang lalu`;
  } else {
    const weeksDifference = Math.ceil(daysDifference / 7);
    return `Diupload ${weeksDifference} minggu yang lalu`;
  }
}

function formatText(text) {
  const lines = text.split("\r\n");
  return (
    <ul className={"list-disc list-inside marker:text-sky-500"}>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}

export default async function page() {
  const careers = await fetchCareers();
  return (
    <div className="min-h-screen space-y-12">
      <img src="/api/images/hiring-flyer.png" className="w-full h-full" />
      <div className="container w-full max-w-7xl space-y-20 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {careers?.map((career) => (
            <div
              key={career.id}
              className="bg-white flex flex-col border shadow-lg rounded-md justify-between space-y-6 p-6"
            >
              <div className="space-y-2">
                <h1 className="text-xl font-semibold text-sky-500 w-2/4">
                  {career.position}
                </h1>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="opacity-70" />
                    <p className="pt-1 text-sm opacity-70">
                      {{
                        WFO: "Work From Office",
                        WFH: "Work From Home",
                        HYBRID: "Work Mix",
                      }[career.model] || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BriefcaseBusiness size={16} className="opacity-70" />
                    <p className="pt-1 text-sm opacity-70">
                      {{
                        FULLTIME: "Full Time",
                        PARTTIME: "Part Time",
                        INTERN: "Intern",
                      }[career.type] || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="opacity-70" />
                    <p className="pt-1 text-sm opacity-70">
                      {calculateDays(new Date(career.createdAt))}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Collapsible defaultOpen={true}>
                    <CollapsibleTrigger>
                      <p className="flex gap-1 items-center justify-center font-medium">
                        Persyaratan <ChevronDown size={10} />
                      </p>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="py-2 px-4">
                        {formatText(career.requirement)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
              <Button asChild variant="primary" className="rounded-lg">
                <Link
                  className="font-semibold tracking-wide"
                  href={`/career/${career.id}`}
                >
                  Selengkapnya
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
