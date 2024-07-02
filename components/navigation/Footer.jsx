import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  {
    path: "/",
    name: "Beranda",
  },
  {
    path: "/about",
    name: "Tentang kami",
  },
  {
    path: "/service",
    name: "Layanan",
  },
  {
    path: "/news",
    name: "Berita & Event",
  },
  {
    path: "/client",
    name: "Klient",
  },
  {
    path: "/partner",
    name: "Partner",
  },
  {
    path: "/contact",
    name: "Kontak",
  },
];

async function fetchServiceLinks() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/services`, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Footer() {
  const serviceLinks = await fetchServiceLinks();
  return (
    <footer className="bg-primary">
      <div className="container max-w-7xl py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:justify-items-center">
          <div className="space-y-4">
            <Link className="" href="#">
              <Image
                src="/miginfo_logo_white.png"
                alt="Miginfo white logo"
                width={52}
                height={52}
                className="h-16 w-16"
              />
            </Link>
            <p className="text-lg text-gray-200">
              We are a digital acceleration specialist and specializing in
              robust end-to-end delivery of tailor-made technology solutions
              with best innovative, scalable and competitive results.
            </p>
          </div>
          <div className="text-white space-y-4">
            <h3 className="text-2xl font-semibold lg:h-16">Tautan Cepat</h3>
            <div className="space-y-2 grid text-lg text-gray-200">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  className="hover:translate-x-4 transition-transform duration-300 ease-in-out"
                  href={link.path}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-white space-y-4 ">
            <h3 className="text-2xl font-semibold lg:h-16">Layanan</h3>
            <div className="space-y-2 grid">
              {serviceLinks.map((service) => (
                <Link
                  className="text-lg text-gray-200 hover:translate-x-4 transition-transform duration-300 ease-in-out"
                  href={`/service/${service.slug}`}
                  key={service.id}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center lg:text-left flex justify-center items-center h-24 border-t border-black border-opacity-10">
        <p className="text-lg text-white">
          © 2013 PT. Mitra Global Informatika | MIGINFO
        </p>
      </div>
    </footer>
  );
}
