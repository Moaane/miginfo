"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BtnSignOut } from "@/components/auth/BtnSignOut";
import { usePathname } from "next/navigation";
import { HandHeart } from "lucide-react";
import { Newspaper } from "lucide-react";
import { Ticket } from "lucide-react";
import { User } from "lucide-react";
import { Handshake } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { FileText } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ArrowDown } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Boxes } from "lucide-react";
import { GalleryThumbnails } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Layers } from "lucide-react";

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

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Miginfo</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={
                  pathname === "/dashboard"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/services"
                className={
                  pathname.startsWith("/dashboard/services")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <HandHeart className="h-4 w-4" />
                Services
              </Link>
              <Link
                href="/dashboard/categories"
                className={
                  pathname.startsWith("/dashboard/categories")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Boxes className="h-4 w-4" />
                Categories
              </Link>
              <Link
                href="/dashboard/news"
                className={
                  pathname.startsWith("/dashboard/news")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Newspaper className="h-4 w-4" />
                News
              </Link>
              <Link
                href="/dashboard/events"
                className={
                  pathname.startsWith("/dashboard/events")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Ticket className="h-4 w-4" />
                Events
              </Link>
              <Link
                href="/dashboard/clients"
                className={
                  pathname.startsWith("/dashboard/clients")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <User className="h-4 w-4" />
                Clients
              </Link>
              <Link
                href="/dashboard/partners"
                className={
                  pathname.startsWith("/dashboard/partners")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Handshake className="h-4 w-4" />
                Partners
              </Link>
              <Link
                href="/dashboard/careers"
                className={
                  pathname.startsWith("/dashboard/careers")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Careers
              </Link>
              <Link
                href="/dashboard/applications"
                className={
                  pathname.startsWith("/dashboard/applications")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <FileText className="h-4 w-4" />
                Applications
              </Link>
              {/* <Link
                href="/dashboard/careers"
                className={variantButton.full.disabled}
              >
                <FileText className="h-4 w-4" />
                Portofolios
              </Link> */}
              <Link
                href="/dashboard/carousels"
                className={
                  pathname.startsWith("/dashboard/carousels")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <GalleryThumbnails className="h-4 w-4" />
                Carousels
              </Link>
              <Link
                href="/dashboard/teams"
                className={
                  pathname.startsWith("/dashboard/teams")
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Users className="h-4 w-4" />
                Teams
              </Link>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <div
                    className={
                      pathname.startsWith("/dashboard/pages")
                        ? variantButton.full.active
                        : variantButton.full.default
                    }
                  >
                    <Layers className="h-4 w-4" />
                    Pages
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Link
                    href="/dashboard/pages/about"
                    className={
                      pathname.startsWith("/dashboard/pages/about")
                        ? variantButton.full.active
                        : variantButton.full.default
                    }
                  >
                    <HandHeart className="h-4 w-4" />
                    About
                  </Link>
                  <Link
                    href="/dashboard/pages/services"
                    className={
                      pathname.startsWith("/dashboard/pages/services")
                        ? variantButton.full.active
                        : variantButton.full.default
                    }
                  >
                    <HandHeart className="h-4 w-4" />
                    Services
                  </Link>
                  <Link
                    href="/dashboard/pages/news"
                    className={
                      pathname.startsWith("/dashboard/pages/news")
                        ? variantButton.full.active
                        : variantButton.full.default
                    }
                  >
                    <Newspaper className="h-4 w-4" />
                    News
                  </Link>
                </CollapsibleContent>
              </Collapsible>
              {/* <Link
                href="dashboard/portofolios"
                className={
                  pathname === "/dashboard/portofolios"
                  ? variantButton.full.active
                  : variantButton.full.default
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <BtnSignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </>
  );
}
