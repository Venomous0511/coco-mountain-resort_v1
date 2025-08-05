"use client";

import { ReactNode } from "react";
import { AppSidebar } from "@/components/(Dashboard)/app-sidebar";
import { NavActions } from "@/components/(Dashboard)/nav-actions";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BookingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((seg) => seg);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Coco Mountain Resort</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                  const href = "/" + segments.slice(0, index + 1).join("/");
                  const isLast = index === segments.length - 1;

                  const label = decodeURIComponent(segment)
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize

                  return (
                    <div className="flex items-center" key={href}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="line-clamp-1">
                            {label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions disabled />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-4 py-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
