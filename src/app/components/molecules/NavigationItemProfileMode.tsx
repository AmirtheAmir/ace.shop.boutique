"use client";

type Props = {
  activeTab: "orders" | "profile";
  onSelectTab: (tab: "orders" | "profile") => void;
  onSignOut: () => void;
};

export default function NavigationItemProfileMode({
  activeTab,
  onSelectTab,
  onSignOut,
}: Props) {
  return (
    <div className="flex ring ring-border-primary">
      <button
        type="button"
        onClick={() => onSelectTab("orders")}
        className={[
          "px-5 py-3 font-M-500 ringed-right transition-colors duration-200",
          activeTab === "orders"
            ? "text-text-primary underline underline-offset-4"
            : "text-text-secondary hover:text-text-primary",
        ].join(" ")}
      >
        Orders
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("profile")}
        className={[
          "px-5 py-3 font-M-500 ringed-right transition-colors duration-200",
          activeTab === "profile"
            ? "text-text-primary underline underline-offset-4"
            : "text-text-secondary hover:text-text-primary",
        ].join(" ")}
      >
        Profile
      </button>

      <button
        type="button"
        onClick={onSignOut}
        className="px-5 py-3 font-M-500 text-text-primary transition-colors duration-200 hover:text-brand-primary"
      >
        Sign Out
      </button>
    </div>
  );
}