import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

async function fetchCareer(id) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/career/${id}`, {
      method: "GET",
      cache: "no-cache",
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

function formatText(text) {
  const lines = text.split("\r\n");
  return (
    <ul className={"list-disc list-inside"}>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
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

export default async function page({ params }) {
  const { id } = params;
  const career = await fetchCareer(id);
  return (
    <div className="min-h-screen space-y-12">
      <img src="/api/images/hiring-flyer.png" className="w-full h-full" />
      <div className="container max-w-7xl px-0 bg-red-100 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6 bg-white border rounded-xl shadow-md">
          <div className="sticky top-[5.3rem] border-b-2 p-8 bg-white z-50">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{career.position}</h1>
              <Button
                asChild
                variant="primary"
                className="rounded-full px-6 tracking-wide"
              >
                <Link className="font-semibold text-lg" href={`${id}/apply`}>
                  Lamar
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-8 space-y-4 pb-6">
            <div className="space-y-1 mb-4">
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
              <h3 className="font-semibold text-gray-900">
                Deskripsi Pekerjaan
              </h3>
              <p className="text-opacity-80 text-gray-900">
                {career.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                Tanggungan Jawab Pekerjaan :
              </h3>
              <div className="text-opacity-80 text-gray-900 px-4">
                {formatText(career.responsibility)}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Syarat Kerja : </h3>
              <div className="text-opacity-80 text-gray-900 px-4">
                {formatText(career.requirement)}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Benefit : </h3>
              <div className="text-opacity-80 text-gray-900 px-4">
                {formatText(career.benefit)}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Cara Melamar
              </h3>
              <p className="text-opacity-80 text-gray-900">
                {career.howToApply}
              </p>
            </div>
          </div>
        </div>
        <Card className="p-8 h-fit">
          <CardContent className="p-0 space-y-2">
            <h3 className="font-semibold text-gray-900">Tentang Kami</h3>
            <p className="text-opacity-80 text-gray-900">
              We don’t innovate for the sake of innovation, we utilize
              technology to simplify people’s lives so they can enjoy their
              lives better. That belief is what brought Traveloka to be
              Southeast Asia’s Leading Travel Platform. Traveloka serves 20+
              products that include comprehensive travel services. From
              transportations to accommodations, discovering nearby attractions,
              and insurance products to financial services, including the
              groundbreaking ‘Buy Now Pay Later’. With 100+ millions downloads
              in six countries across the SEA region, we aim to keep exploring
              for better innovations—all to fulfill our users’ travel
              aspirations so they can enjoy their lives, their way. Our vision
              is to enrich people’s life by empowering them in fulfilling their
              unique travel aspirations, seamlessly.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-[20vh]" />
    </div>
  );
}
