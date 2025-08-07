"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background dark:bg-background z-20">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-5xl">
            Coco Mountain Resort
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-muted-foreground dark:text-muted-foreground sm:text-sm">
            Copyright @ {new Date().getFullYear()} Coco Mountain Resort. All
            Rights Reserved
          </p>
        </div>

        <div className="mt-5 pt-6 pb-0 border-t border-foreground/20 sm:flex sm:items-center sm:justify-between dark:border-foreground/20">
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <li>
              <Link
                href="/terms-and-conditions"
                rel="noreferrer"
                target="_blank"
                className="text-muted-foreground transition hover:text-foreground dark:text-muted-foreground"
              >
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link
                href="/privacy-policy"
                rel="noreferrer"
                target="_blank"
                className="text-muted-foreground transition hover:text-foreground dark:text-muted-foreground"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>

          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            <li>
              <Link
                href="https://www.facebook.com/CocoMountainResort"
                rel="noreferrer"
                target="_blank"
                className="text-muted-foreground transition hover:text-foreground dark:text-muted-foreground"
              >
                <span className="sr-only">Facebook</span>

                <Facebook size={20} />
              </Link>
            </li>

            <li>
              <Link
                href="https://www.instagram.com/CocoMountainResort"
                rel="noreferrer"
                target="_blank"
                className="text-muted-foreground transition hover:text-foreground dark:text-muted-foreground"
              >
                <span className="sr-only">Instagram</span>

                <Instagram size={20} />
              </Link>
            </li>

            <li>
              <Link
                href="https://www.x.com/"
                rel="noreferrer"
                target="_blank"
                className="text-muted-foreground transition hover:text-foreground dark:text-muted-foreground"
              >
                <span className="sr-only">Twitter</span>

                <Twitter size={20} />
              </Link>
            </li>

            <li>
              <Link
                href="https://www.youtube.com/"
                rel="noreferrer"
                target="_blank"
                className="text-muted-foreground transition hover:text-foreground dark:text-muted-foreground"
              >
                <span className="sr-only">Youtube</span>

                <Youtube size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
