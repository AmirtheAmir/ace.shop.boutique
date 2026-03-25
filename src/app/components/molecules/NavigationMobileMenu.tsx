"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function NavigationMobileMenu({ children }: Props) {
  return (
    <div className="absolute left-0 top-full z-50  w-full bg-bg-base ring ring-border-primary">
      <div className="flex flex-col">{children}</div>
    </div>
  );
}