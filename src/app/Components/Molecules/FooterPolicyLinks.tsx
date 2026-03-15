import React from "react";
import FooterLinkItem from "../atoms/FooterLinkItem";

const links = [
  "Return Policy",
  "Privacy Policy",
  "Shipping Policy",
  "Terms of Services",
  "Cookie Preferences",
  "Contact Information",
];

export default function FooterPolicyLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <FooterLinkItem key={link} label={link} />
      ))}
    </div>
  );
}
