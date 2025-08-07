"use client";

import * as React from "react";
import {
  Bed,
  Blocks,
  Calendar,
  Inbox,
  LayoutDashboard,
  MessageCircleQuestion,
  MessagesSquare,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

import { NavMain } from "@/components/(Dashboard)/nav-main";
import { NavSecondary } from "@/components/(Dashboard)/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Room Booking",
      url: "/dashboard/room-booking",
      icon: Bed,
    },
    {
      title: "Cottage Booking",
      url: "/dashboard/cottage-booking",
      icon: UtensilsCrossed,
    },
    // {
    //   title: "Ask AI",
    //   url: "/dashboard/ask-ai",
    //   icon: Sparkles,
    // },
    {
      title: "Give Feedback",
      url: "/dashboard/feedback",
      icon: MessagesSquare,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
      comingSoon: true,
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    // },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
      comingSoon: true,
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
