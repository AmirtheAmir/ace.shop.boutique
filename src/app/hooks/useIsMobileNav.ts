"use client";

import { useEffect, useState } from "react";

export default function useIsMobileNav(breakpoint = 888) {
  const [isMobileNav, setIsMobileNav] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = () => {
      setIsMobileNav(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobileNav;
}