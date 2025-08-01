// /app/booking/layout.tsx
import { ReactNode } from "react";
import { AppSidebar } from "@/components/(Booking)/app-sidebar";
import { NavActions } from "@/components/(Booking)/nav-actions";
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
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function BookingLayout({ children }: { children: ReactNode }) {
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
                  <BreadcrumbPage className="line-clamp-1">
                    <BreadcrumbLink href="/">
                      Coco Mountain Resort
                    </BreadcrumbLink>
                  </BreadcrumbPage>
                </BreadcrumbItem>
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
