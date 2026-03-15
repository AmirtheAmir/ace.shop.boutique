"use client";

import React from "react";
import FilterButton from "../atoms/FilterButton";
import FilterRadioOption from "../atoms/FilterRadioOption";

export type SortValue = "relevance" | "price-low-high" | "price-high-low" | null;

type Props = {
  value: SortValue;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: SortValue) => void;
};

export default function FilterRelevance({
  value,
  isOpen,
  onToggle,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <FilterButton
        label={
          value === "price-low-high"
            ? "Price, Low to High"
            : value === "price-high-low"
            ? "Price, High to Low"
            : "Relevance"
        }
        isOpen={isOpen}
        onClick={onToggle}
      />

      {isOpen && (
        <div className="absolute right-0  top-full z-20 min-w-53 bg-bg-base p-2 ring ring-border-primary">
          <div className="flex flex-col gap-2">
            <FilterRadioOption
              label="Relevance"
              checked={value === null || value === "relevance"}
              onClick={() => onChange("relevance")}
            />

            <FilterRadioOption
              label="Price, Low to High"
              checked={value === "price-low-high"}
              onClick={() => onChange("price-low-high")}
            />

            <FilterRadioOption
              label="Price, High to Low"
              checked={value === "price-high-low"}
              onClick={() => onChange("price-high-low")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
