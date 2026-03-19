"use client";

import React from "react";
import Link from "next/link";
import { CartIcon } from "../../../../public/Icons";

type Props = {
  count?: number;
  href?: string;
  className?: string;
};

export default function CartLinkButton({
  count = 0,
  href = "/cart",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      aria-label="Cart"
      className={[
        "relative inline-flex items-center justify-center",
        className,
      ].join(" ")}
    >
      <CartIcon />

      {count > 0 && (
        <span className="absolute -top-2.5 -right-2.5 min-w-5 h-5 w-5 flex items-center justify-center rounded-full bg-brand-primary font-XS-600 text-text-primary">
          {count}
        </span>
      )}
    </Link>
  );
}