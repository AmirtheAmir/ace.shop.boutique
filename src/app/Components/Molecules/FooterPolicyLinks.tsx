import React from "react";
import FooterLinkItem from "../atoms/FooterLinkItem";

const links = [
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Terms of Services", href: "/terms-of-services" },
  { label: "Cookie Preferences", href: "/cookie-preferences" },
  { label: "Contact Information", href: "/contact-information" },
];

export default function FooterPolicyLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <FooterLinkItem
          key={link.label}
          label={link.label}
          href={link.href}
        />
      ))}
    </div>
  );
}