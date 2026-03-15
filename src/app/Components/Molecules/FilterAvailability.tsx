"use client";

import React from "react";
import FilterButton from "../atoms/FilterButton";
import FilterRadioOption from "../atoms/FilterRadioOption";

export type AvailabilityValue = "all" | "in-stock" | "out-of-stock" | null;

type Props = {
  value: AvailabilityValue;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: AvailabilityValue) => void;
  counts: {
    all: number;
    inStock: number;
    outOfStock: number;
  };
};

export default function FilterAvailability({
  value,
  isOpen,
  onToggle,
  onChange,
  counts,
}: Props) {
  return (
    <div className="relative">
      <FilterButton
        label="Availability"
        isOpen={isOpen}
        onClick={onToggle}
      />

      {isOpen && (
        <div className="absolute left-0 top-full z-20  min-w-53 ring ring-border-primary bg-bg-base p-2">
          <div className="flex flex-col gap-2">
            <FilterRadioOption
              label={`In Stock (${counts.inStock})`}
              checked={value === "in-stock"}
              onClick={() => onChange("in-stock")}
            />
            <FilterRadioOption
              label={`Out Of Stock (${counts.outOfStock})`}
              checked={value === "out-of-stock"}
              onClick={() => onChange("out-of-stock")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
