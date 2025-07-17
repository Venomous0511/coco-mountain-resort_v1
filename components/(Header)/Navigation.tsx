"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: {
  title: string;
  href: string;
  description: string;
  comingSoon?: boolean;
}[] = [
  {
    title: "Wedding",
    // href: "/wedding",
    href: "/",
    description:
      "A wedding is a ceremony where two people are united in marriage.",
    comingSoon: true,
  },
  {
    title: "Meeting & Events",
    // href: "/meetings_and_events",
    href: "/",
    description:
      "Meetings and events are gatherings of people for a specific purpose.",
    comingSoon: true,
  },
  {
    title: "Reaching Us",
    href: "/reach",
    description:
      "Reaching us is the process of contacting or communicating with us.",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Navigation Links */}
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          {[
            { href: "/", label: "Home" },
            { href: "/accommodation", label: "Accommodation" },
            { href: "/dining", label: "Dining" },
            { href: "/offers", label: "Offers" },
          ].map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                href={item.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive(item.href)
                    ? "border-b-2 border-primary rounded-none bg-transparent hover:bg-transparent hover:text-primary text-primary"
                    : "border-b-2 border-transparent rounded-none bg-transparent hover:bg-transparent hover:text-primary text-muted-foreground"
                )}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`cn(${navigationMenuTriggerStyle()}) text-muted-foreground bg-transparent hover:bg-transparent`}
            >
              More
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    label={
                      <>
                        {component.title}
                        {component.comingSoon && (
                          <span className="ml-2 align-middle inline-block">
                            <span className="bg-muted text-xs text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                              Coming Soon
                            </span>
                          </span>
                        )}
                      </>
                    }
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

// ListItem component
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  Omit<React.ComponentPropsWithoutRef<"a">, "title"> & {
    label: React.ReactNode;
  }
>(({ className, label, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{label}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
