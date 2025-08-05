import React from "react";
import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    badge?: React.ReactNode;
    comingSoon?: boolean; 
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isDisabled = item.comingSoon;

            return (
              <SidebarMenuItem key={item.title}>
                {isDisabled ? (
                  <SidebarMenuButton
                    asChild
                    className="pointer-events-none opacity-50"
                  >
                    <div>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}

                <SidebarMenuBadge>
                  {isDisabled ? (
                    <Badge variant="outline" className="text-[10px]">
                      Coming Soon
                    </Badge>
                  ) : (
                    item.badge
                  )}
                </SidebarMenuBadge>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
