"use client";

// External Imports
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, Ref, useState } from "react";
import { TbLogout, TbSettings } from "react-icons/tb";

// Local Imports
import { Container } from "@/shared/components/container";
import { cn } from "../lib/utils/cn";
import { Avatar, AvatarFallback } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const Header = ({ className, ref, ...props }: HeaderProps) => {
  const pathname = usePathname();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-100 flex border border-neutral-200 bg-background shadow">
      <Container
        ref={ref}
        className={cn("flex items-center justify-between py-2", className)}
        {...props}
      >
        <Link href={"/"}>
          <div className="relative size-8 md:size-9">
            <Image src={"/images/logo.png"} alt="Logo" fill />
          </div>
        </Link>

        <Popover
          open={userMenuOpen}
          onOpenChange={() => setUserMenuOpen((o) => !o)}
        >
          <PopoverTrigger asChild>
            <Avatar className="cursor-default">
              <AvatarFallback>
                {pathname === "/super-admin" ? "SA" : "AD"}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col gap-3 p-3 text-sm md:text-base">
            {/* Popover Header */}
            <p className="text-xs text-neutral-500 smd:text-sm">
              {pathname === "/super-admin" ? "Super Admin" : "Admin"}
            </p>

            <div className="flex flex-col gap-4 md:gap-4">
              {/* User Details */}
              <div className="flex items-center gap-3">
                <Avatar className="size-10 md:size-12">
                  <AvatarFallback>
                    {pathname === "/super-admin" ? "SA" : "AD"}
                  </AvatarFallback>
                </Avatar>

                <div className="-space-y-0.5 md:-space-y-1">
                  <p className="text-sm font-semibold text-neutral-800 md:text-base">
                    {pathname === "/super-admin" ? "Super Admin" : "Admin"}
                  </p>
                  <p className="text-xs text-neutral-600 md:text-sm">
                    {pathname === "/super-admin"
                      ? "superadmin@email.com"
                      : "admin@email.com"}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-col text-sm text-neutral-800 md:text-base">
                {/* Account */}
                <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 transition md:px-4 md:py-2.5 lg:hover:bg-neutral-200 lg:hover:text-black lg:hover:shadow">
                  <TbSettings size={24} />
                  <span>Manage Account</span>
                </div>

                {/* Sign out */}
                <div className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 transition md:px-4 md:py-2.5 lg:hover:bg-neutral-200 lg:hover:text-black lg:hover:shadow">
                  <TbLogout size={24} />
                  <span>Sign Out</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Container>
    </div>
  );
};
