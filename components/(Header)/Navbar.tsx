"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Header from "./Header";
import Navigation from "./Navigation";
import { ModeToggle } from "./ModeToggle";
import NavigationMobile from "./NavigationMobile";
import AuthActions from "./AuthAction";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      <Header>
        <div className="flex items-center">
          <Link href="/" className="flex items-center md:mr-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={30}
              height={15}
              className="mr-1 md:mr-2"
            />
            <h1 className="hidden font-serif text-lg font-bold xl:block text-foreground dark:text-foreground">
              Coco Mountain Resort
            </h1>
          </Link>
          <span className="version-badge">v1.0</span>
        </div>

        <Navigation />

        <div className="flex items-center space-x-2 md:space-x-4">
          <ModeToggle />

          <AuthActions session={session} />

          <NavigationMobile />
        </div>
      </Header>
    </>
  );
}
