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
import { BriefcaseBusiness } from "lucide-react";
import { FileText } from "lucide-react";
import { CircleUser } from "lucide-react";
import { BtnSignOut } from "../auth/BtnSignOut";

const serviceLinks = [
  {
    slug: "web-development",
    name: "Web Developer",
  },
  {
    slug: "app-development",
    name: "App Developer",
  },
];

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
      <nav className="hidden md:block fixed inset-x-0 top-0 z-50 bg-white shadow dark:bg-gray-950">
        <div className="container max-w-7xl px-4 lg:px-8 xl:px-20">
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
              <NavLink
                pathname={pathname}
                href="/portofolio"
                text="Portofolio"
              />
              <NavLink pathname={pathname} href="/client" text="Klien" />
              <NavLink pathname={pathname} href="/partner" text="Partner" />
              <NavLink pathname={pathname} href="/career" text="Career" />
              <NavLink pathname={pathname} href="/contact" text="Kontak" />
            </nav>
          </div>
        </div>
      </nav>
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard"
                className={
                  pathname === "/dashboard"
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/services"
                className={
                  pathname.startsWith("/dashboard/services")
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <HandHeart className="h-4 w-4" />
                Services
              </Link>
              <Link
                href="/dashboard/categories"
                className={
                  pathname.startsWith("/dashboard/categories")
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <Boxes className="h-4 w-4" />
                Categories
              </Link>
              <Link
                href="/dashboard/news"
                className={
                  pathname.startsWith("/dashboard/news")
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <Newspaper className="h-4 w-4" />
                News
              </Link>
              <Link
                href="/dashboard/events"
                className={
                  pathname.startsWith("/dashboard/events")
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <Ticket className="h-4 w-4" />
                Events
              </Link>
              <Link
                href="/dashboard/clients"
                className={
                  pathname.startsWith("/dashboard/clients")
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <User className="h-4 w-4" />
                Clients
              </Link>
              <Link
                href="/dashboard/partners"
                className={
                  pathname.startsWith("/dashboard/partners")
                    ? variantButton.small.active
                    : variantButton.small.default
                }
              >
                <Handshake className="h-4 w-4" />
                Partners
              </Link>
              <Link
                href=""
                className={variantButton.small.disabled}
                // className={
                //   pathname === "/dashboard/services"
                //     ? variantButton.small.active
                //     : variantButton.small.default
                // }
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Careers
              </Link>
              <Link
                href=""
                className={variantButton.small.disabled}
                // className={
                //   pathname === "/dashboard/services"
                //     ? variantButton.small.active
                //     : variantButton.small.default
                // }
              >
                <FileText className="h-4 w-4" />
                Portofolios
              </Link>
              {/* <Link
                href="dashboard/portofolios"
                className={
                  pathname === "/dashboard/portofolios"
                  ? variantButton.small.active
                  : variantButton.small.default
                }
                >
                <FileText className="h-4 w-4" />
                Portofolios
              </Link> */}
              <Link
                href="/dashboard/settings"
                className={
                  pathname.startsWith("/dashboard/settings")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Handshake className="h-4 w-4" />
                Settings
              </Link>
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
  return (
    <>
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
          {serviceLinks.map((service, index) => (
            <DropdownMenuItem key={index} className="cursor-pointer" asChild>
              <Link pathname={pathname} href={`/services/${service.slug}`}>
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
