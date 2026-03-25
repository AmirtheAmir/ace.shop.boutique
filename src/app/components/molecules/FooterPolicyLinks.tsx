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
    <div className="flex flex-wrap gap-1 sm:gap-4">
  {links.map((link) => (
    <div key={link.label} className="w-[calc(50%-0.5rem)] sm:w-auto">
      <FooterLinkItem label={link.label} href={link.href} />
    </div>
  ))}
</div>
  );
}
