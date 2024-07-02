import Image from "next/image";

const PartnerLogos = [
  {
    logo: "aruba",
    alt: "Aruba Networks",
  },
  {
    logo: "benq",
    alt: "Benq",
  },
  {
    logo: "checkpoint",
    alt: "Checkpoint",
  },
  {
    logo: "cisco",
    alt: "Cisco",
  },
  {
    logo: "commscope",
    alt: "Commscope Connectivity",
  },
  {
    logo: "crestron",
    alt: "Crestron",
  },
  {
    logo: "epson",
    alt: "Epson",
  },
  {
    logo: "fortinet",
    alt: "Fortinet",
  },
  {
    logo: "hp",
    alt: "Hp",
  },
  {
    logo: "huawei",
    alt: "Huawei Technologies",
  },
  {
    logo: "ibm",
    alt: "IBM",
  },
  {
    logo: "lg",
    alt: "LG Electronics",
  },
  {
    logo: "microsoft",
    alt: "Microsoft Corporation",
  },
  {
    logo: "paloalto",
    alt: "Palo Alto Networks",
  },
  {
    logo: "samsung",
    alt: "Samsung Electronic",
  },
  {
    logo: "seagate",
    alt: "Seagate Technology",
  },
  {
    logo: "sophos",
    alt: "Sophos",
  },
  {
    logo: "supermicro",
    alt: "Super Micro Computer",
  },
  {
    logo: "vertiv",
    alt: "Vertiv",
  },
  {
    logo: "viewsonic",
    alt: "Viewsonic",
  },
  {
    logo: "western_digital",
    alt: "Western Digital",
  },
];

export default function ClientSection() {
  return (
    <div className="overflow-hidden py-6">
      <div className="flex space-x-8 md:space-x-16 justify-center items-center animate-loop-scroll w-full z-10">
        {PartnerLogos?.map((prop, index) => (
          <Image
            key={index}
            className="w-12 h-10 md:w-16 lg:w-20 xl:w-24 object-contain"
            loading="lazy"
            src={`/partner/${prop.logo}_logo.png`}
            alt={prop.alt}
            width={48}
            height={40}
          />
        ))}
        {PartnerLogos?.map((prop, index) => (
          <Image
            key={index}
            className="w-12 h-10 md:w-16 lg:w-20 xl:w-24 object-contain"
            loading="lazy"
            src={`/partner/${prop.logo}_logo.png`}
            alt={prop.alt}
            width={48}
            height={40}
          />
        ))}
      </div>
    </div>
  );
}
