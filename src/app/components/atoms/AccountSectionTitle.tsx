import React from "react";

type Props = {
  title: string;
  action?: React.ReactNode;
};

export default function AccountSectionTitle({ title, action }: Props) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="font-L-600 text-text-primary">{title}</h2>
      {action}
    </div>
  );
}