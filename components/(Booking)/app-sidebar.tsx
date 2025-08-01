"use client";

import * as React from "react";
import {
  Bed,
  Blocks,
  Calendar,
  Inbox,
  LayoutDashboard,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

import { NavMain } from "@/components/(Booking)/nav-main";
import { NavSecondary } from "@/components/(Booking)/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Search",
      url: "/booking/search",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "/booking/ask-ai",
      icon: Sparkles,
    },
    {
      title: "Dashboard",
      url: "/booking",
      icon: LayoutDashboard,
    },
    {
      title: "Room Booking",
      url: "/booking/room-booking",
      icon: Bed,
    },
    {
      title: "Cottage Booking",
      url: "/booking/cottage-booking",
      icon: UtensilsCrossed,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-start gap-2 py-2">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="text-base font-semibold">Coco Mountain Booking</h2>
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
