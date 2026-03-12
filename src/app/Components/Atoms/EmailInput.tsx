"use client";

import React from "react";
import {
  RightArrowIcon,
  CloseIcon,
  Check16Icon,
} from "../../../../public/Icons";

type Status = "idle" | "typing" | "duplicate" | "success";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  status?: Status;
  placeholder?: string;
  className?: string;
  message?: string;
  disabled?: boolean;
};

export default function EmailInput({
  value,
  onChange,
  onSubmit,
  status = "idle",
  placeholder = "Email",
  className = "",
  message,
  disabled = false,
}: Props) {
  const isDuplicate = status === "duplicate";
  const isSuccess = status === "success";

  return (
    <div className={["flex flex-col gap-2", className].join(" ")}>
      <div
        className={[
          "flex items-center justify-between w-104 border p-3.5 transition-colors",
          isDuplicate ? "border-[#FC5A03]" : "border-border-primary",
        ].join(" ")}
      >
        <div className="flex w-full flex-col gap-1">
          <span className="font-S-500 text-text-secondary">{placeholder}</span>

          <input
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            disabled={disabled || isSuccess}
            className="w-full bg-transparent outline-none font-M-500 text-text-primary placeholder:text-text-secondary"
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || isSuccess}
          className={[
            "ml-4 shrink-0 transition-colors",
            isDuplicate
              ? "text-[#FC5A03]"
              : isSuccess
              ? "text-text-primary"
              : "text-text-secondary hover:text-text-primary",
          ].join(" ")}
        >
          {isDuplicate ? (
            <CloseIcon />
          ) : isSuccess ? (
            <Check16Icon />
          ) : (
            <RightArrowIcon />
          )}
        </button>
      </div>

      {message ? (
        <p
          className={[
            "font-S-500",
            isDuplicate
              ? "text-[#FC5A03]"
              : isSuccess
              ? "text-text-primary"
              : "text-text-secondary",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}