"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Menu,
  BookA,
  Heart,
  House,
  PartyPopper,
  Percent,
  Phone,
  Utensils,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: <House size={18} /> },
  { href: "/accommodation", label: "Accommodation", icon: <BookA size={18} /> },
  { href: "/dining", label: "Dining", icon: <Utensils size={18} /> },
  { href: "/offers", label: "Offers", icon: <Percent size={18} /> },
  // { href: "/wedding", label: "Wedding", icon: <Heart size={18} /> },
  // {
  //   href: "/meetings_and_events",
  //   label: "Meetings & Events",
  //   icon: <PartyPopper size={18} />,
  // },
  { href: "/reach", label: "Reaching Us", icon: <Phone size={18} /> },
];

export default function NavigationMobile() {
  // PATHNAME FOR ACTIVE LINK
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <span className="sr-only">Coco Mountain Resort Logo</span>
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="mr-2"
              />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 border-l-4 ${
                    isActive(item.href)
                      ? "border-primary bg-muted text-primary"
                      : "border-transparent text-foreground hover:text-primary hover:bg-accent"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
