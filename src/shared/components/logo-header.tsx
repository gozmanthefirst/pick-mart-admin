// External Imports
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes, Ref } from "react";

// Local Imports
import { cn } from "../lib/utils/cn";

interface LogoHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const LogoHeader = ({
  className,
  children,
  ref,
  ...props
}: LogoHeaderProps) => {
  return (
    <header
      ref={ref}
      className={cn("sticky top-0 z-50 flex py-3 border", className)}
      {...props}
    >
      <Link href={"/"}>
        <div className="relative size-8 md:size-10">
          <Image src={"/images/logo.png"} alt="Logo" fill />
        </div>
      </Link>

      {children}
    </header>
  );
};
