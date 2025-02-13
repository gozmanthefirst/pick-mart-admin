"use client";

// External Imports
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes, Ref, useState } from "react";

// Local Imports
import { Container } from "@/shared/components/container";
import { TbLogout, TbSettings } from "react-icons/tb";
import { cn } from "../lib/utils/cn";
import { Avatar, AvatarFallback } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface LogoHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const LogoHeader = ({ className, ref, ...props }: LogoHeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-100 flex border border-neutral-200 shadow bg-background">
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
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent
            className="flex flex-col gap-3 p-3 text-sm md:text-base"
          >
            {/* Popover Header */}
            <p className="text-xs text-neutral-500 smd:text-sm">Super Admin</p>

            <div className="flex flex-col gap-4 md:gap-4">
              {/* User Details */}
              <div className="flex items-center gap-3">
                <Avatar className="size-10 md:size-12">
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>

                <div className="-space-y-0.5 md:-space-y-1">
                  <p className="text-sm font-semibold text-neutral-800 md:text-base">
                    Super Admin
                  </p>
                  <p className="text-xs text-neutral-600 md:text-sm">
                    superadmin@email.com
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
