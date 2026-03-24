import Link from "next/link";
import React from "react";

type Props = {
  href?: string;
  label?: string;
  className?: string;
};

export default function ViewAllButton({
  href = "/collection/all",
  label = "View All",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex px-9 py-3.5 items-center justify-center",
        "bg-brand-primary",
        "font-M-600 text-black",
        "hover:ring hover:ring-border-primary hover:bg-brand-secondary transition-all duration-300",
        className,
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
