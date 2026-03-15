import React from "react";
import FooterPolicyLinks from "../molecules/FooterPolicyLinks";
import FooterPaymentBadges from "../molecules/FooterPaymentBadges";

export default function FooterContaienr() {
  return (
    <footer className="w-full border-t border-border-secondary py-6 mt-6">
      <div className="flex items-center justify-between w-full mx-auto">
        <FooterPolicyLinks />
        <FooterPaymentBadges />
      </div>
    </footer>
  );
}
