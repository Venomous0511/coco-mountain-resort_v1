"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <a href={item.url}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
