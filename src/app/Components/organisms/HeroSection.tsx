"use client";
import { RightArrowIcon } from "../../../../public/Icons";
import React from "react";

type Props = {
  title?: string; // "AGGRAGAT CHRONO"
  subtitle?: string; // "Mechanical Precision Redefined"
  ctaLabel?: string; // "Check It Out"
  onCtaClick?: () => void;
  imageSrc?: string;
  className?: string;
};

export default function HeroSection({
  title = "AGGRAGAT CHRONO",
  subtitle = "Mechanical Precision Redefined",
  ctaLabel = "Check It Out",
  onCtaClick,
  imageSrc = "",
  className = "",
}: Props) {
  return (
    <section
      className={[
        "w-full h-130 overflow-hidden ring ring-border-primary",
        className,
      ].join(" ")}
    >
      <div className="relative w-full h-full">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${imageSrc})` }}
          aria-hidden="true"
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            maskImage:
              "radial-gradient(circle at center, transparent 50%, black 90%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 60%, black 90%)",
          }}
          aria-hidden="true"
        />

        {/* Content wrapper: right aligned block, left aligned text inside */}
        <div className="relative h-full w-full flex  justify-end">
          <div className="w-1/2 content-in h-full p-4 @container flex flex-col justify-between text-left">
            {/* Top: subtitle + title */}
            <div className="select-none @container ">
              <h2 className="mt-4 font-2XL-600 text-text-inverted leading-[0.95]">
                {title}
              </h2>
              <p className="font-L-600-clamp  text-text-inverted">{subtitle}</p>
            </div>
            {/* Bottom: CTA bar */}
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={onCtaClick}
                className={[
                  " py-3.5 pl-9 pr-6 self-start font-M-600",
                  "flex items-center justify-center gap-2",
                  "text-brand-primary",
                  "border border-brand-primary",
                  "bg-transparent hover:cursor-pointer hover:bg-brand-primary hover:text-text-primary transition-colors duration-300 ease-in",
                ].join(" ")}
              >
                {ctaLabel}
                <span className="inline-flex items-center justify-center ">
                  <RightArrowIcon />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
