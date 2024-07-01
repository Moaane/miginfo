"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Home } from "lucide-react";
import { HandHeart } from "lucide-react";
import { Boxes } from "lucide-react";
import { Newspaper } from "lucide-react";
import { Ticket } from "lucide-react";
import { User } from "lucide-react";
import { Handshake } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const variantButton = {
  full: {
    active:
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary",
    default:
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
    disabled:
      "flex disabled items-center gap-3 rounded-lg bg-muted px-3 py-2 text-black line-through transition-all",
  },
  small: {
    active:
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary hover:text-foreground",
    default:
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-primary",
    disabled:
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground line-through",
  },
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:flex sticky top-0 bg-white z-[51] dark:bg-gray-950">
        <div className="container max-w-7xl">
          <div className="flex py-8 items-center">
            <Link
              className="mr-auto flex items-center gap-2 text-lg font-semibold"
              href="/"
            >
              <Image
                className="w-8 h-8"
                src="/miginfo_logo.png"
                alt="miginfo logo"
                height={72}
                width={72}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <nav className="ml-auto items-center space-x-4 hidden lg:flex">
              <NavLink pathname={pathname} href="/" text="Beranda" />
              <NavLink pathname={pathname} href="/about" text="Tentang kami" />
              <DropdownMenuComponent pathname={pathname} />
              <NavLink pathname={pathname} href="/news" text="News & Events" />
              <NavLink pathname={pathname} href="/client" text="Klien" />
              <NavLink pathname={pathname} href="/partner" text="Partner" />
              <NavLink pathname={pathname} href="/career" text="Karir" />
              <NavLink pathname={pathname} href="/contact" text="Kontak" />
            </nav>
          </div>
        </div>
      </nav>
      <header className="flex lg:hidden h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Link
          className="mr-auto flex items-center gap-2 text-lg font-semibold"
          href="/"
        >
          <Image
            className="w-8 h-8"
            src="/miginfo_logo.png"
            alt="miginfo logo"
            height={72}
            width={72}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 font-medium">
              <NavLink pathname={pathname} href="/" text="Beranda" />
              <NavLink pathname={pathname} href="/about" text="Tentang kami" />
              <DropdownMenuComponent pathname={pathname} />
              <NavLink pathname={pathname} href="/news" text="News & Events" />
              <NavLink pathname={pathname} href="/client" text="Klien" />
              <NavLink pathname={pathname} href="/partner" text="Partner" />
              <NavLink pathname={pathname} href="/contact" text="Kontak" />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}

function NavLink({ pathname, href, text }) {
  return (
    <Link
      className={`font-medium text-sm border-b-2 transition-colors hover:text-primary hover:border-primary ${
        pathname === href
          ? "text-primary border-primary"
          : "text-black border-transparent"
      }`}
      href={href}
    >
      {text}
    </Link>
  );
}

function DropdownMenuComponent({ pathname }) {
  const [serviceLinks, setServiceLinks] = useState([]);

  async function fetchServiceLinks() {
    try {
      const response = await fetch("/api/pages/services/nav", {
        method: "GET",
      });
      const result = await response.json();
      setServiceLinks(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchServiceLinks();
  }, []);
  return (
    <>
      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 group">
              <Link
                href="/services"
                className={`font-medium text-sm border-b-2 transition-colors hover:text-primary hover:border-primary ${
                  pathname.startsWith("/services")
                    ? "text-primary border-primary"
                    : "text-black border-transparent"
                }`}
              >
                Layanan
              </Link>
              <ChevronDown className="h-3 w-3 group-checked:rotate-90" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-8">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link pathname={pathname} href="/services">
                Tentang Layanan
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {serviceLinks?.map((service, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer" asChild>
                <Link pathname={pathname} href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="lg:hidden">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div
              className={`flex items-center gap-1 group font-medium text-sm border-b-2 transition-colors hover:text-primary hover:border-primary ${
                pathname.startsWith("/services")
                  ? "text-primary border-primary"
                  : "text-black border-transparent"
              }`}
            >
              Layanan
              <ChevronDown className="h-3 w-3 group-checked:rotate-90" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 grid gap-2">
            <Link
              href="/services"
              className={`font-medium text-sm border-b-2 transition-colors hover:text-primary hover:border-primary ${
                pathname === "/services"
                  ? "text-primary border-primary"
                  : "text-black border-transparent"
              }`}
            >
              Tentang Layanan
            </Link>

            {serviceLinks?.map((service, index) => (
              <Link
                href={`/services/${service.slug}`}
                key={index}
                className={`flex items-center gap-1 group font-medium text-sm border-b-2 transition-colors hover:text-primary hover:border-primary ${
                  pathname === `/services/${service.slug}`
                    ? "text-primary border-primary"
                    : "text-black border-transparent"
                }`}
              >
                {service.name}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
