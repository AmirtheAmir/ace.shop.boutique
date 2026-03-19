import React from "react";
import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  className?: string;
};

export default function FooterLinkItem({
  label,
  href = "#",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={[
        "font-XS-500 text-text-secondary",
        "hover:underline",
        "transition-colors duration-300",
        className,
      ].join(" ")}
    >
      {label}
    </Link>
  );
}