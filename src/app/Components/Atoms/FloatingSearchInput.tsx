import { SearchIcon } from "../../../../public/Icons";
import { useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onSearchClick?: () => void;
};

export default function FloatingSearchInput({
  label,
  value,
  onChange,
  onSearchClick = () => {},
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const active = value.length > 0 || isFocused;

  return (
    <div className="relative px-3.5 w-full h-full flex items-center justify-between gap-3 ringed-navbutton">
      <div className="relative flex-1 h-full flex items-end">
        <label
          className={[
            "absolute left-0 transition-all duration-300 pointer-events-none text-text-secondary",
            active
              ? "top-1.5 font-S-500"
              : "top-1/2 -translate-y-1/2 font-S-500",
          ].join(" ")}
        >
          {label}
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute left-0 right-0 bottom-1.5 w-full outline-none bg-transparent font-M-500 text-text-primary"
        />
      </div>

      <button
        type="button"
        aria-label="Search"
        onClick={onSearchClick}
        className="shrink-0 cursor-pointer text-text-primary hover:text-text-secondary transition-colors duration-300"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
