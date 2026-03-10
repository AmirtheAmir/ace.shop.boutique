"use client";

import React from "react";
import { Close16Icon } from "../../../../public/Icons";

type Props = {
  label: string;
  onRemove: () => void;
};

export default function FilterChip({ label, onRemove }: Props) {
  return (
    <div className="flex items-center gap-4 text-text-secondary py-4 font-S-500">
      <span>{label}</span>

      <button className="hover:cursor-pointer" type="button" onClick={onRemove} aria-label={`Remove ${label}`}>
        <Close16Icon />
      </button>
    </div>
  );
}