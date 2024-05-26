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

const variantButton = {
  full: {
    active:
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary",
    default:
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
  },
  small: {
    active: {},
    default: {},
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
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Link
                    href="/dashboard/services"
                    className={
                      pathname === "/dashboard/services"
                        ? variantButton.full.active
                        : variantButton.full.default
                    }
                  >
                    <HandHeart className="h-4 w-4" />
                    Services
                    {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
                  </Link>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Link
                    href="/dashboard/services/lists"
                    className={
                      pathname === "/dashboard/services/lists"
                        ? variantButton.full.active
                        : variantButton.full.default
                    }
                  >
                    <HandHeart className="h-4 w-4" />
                    Service Lists
                    {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
                  </Link>
                </CollapsibleContent>
              </Collapsible>
              <Link
                href="dashboard/news"
                className={
                  pathname === "/dashboard/news"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Newspaper className="h-4 w-4" />
                News
              </Link>
              <Link
                href="dashboard/events"
                className={
                  pathname === "/dashboard/events"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Ticket className="h-4 w-4" />
                Events
              </Link>
              <Link
                href="dashboard/clients"
                className={
                  pathname === "/dashboard/clients"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <User className="h-4 w-4" />
                Clients
              </Link>
              <Link
                href="dashboard/partners"
                className={
                  pathname === "/dashboard/services"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <Handshake className="h-4 w-4" />
                Partners
              </Link>
              <Link
                href="dashboard/careers"
                className={
                  pathname === "/dashboard/services"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Careers
              </Link>
              <Link
                href="dashboard/portofolios"
                className={
                  pathname === "/dashboard/portofolios"
                    ? variantButton.full.active
                    : variantButton.full.default
                }
              >
                <FileText className="h-4 w-4" />
                Portofolios
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
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
