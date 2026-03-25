import React from "react";
import FooterPolicyLinks from "../molecules/FooterPolicyLinks";


export default function FooterContaienr() {
  return (
    <footer className="w-full border-t border-border-secondary py-4 sm:py-6 mt-6">
      <div className="flex items-center justify-center w-full mx-auto">
        <FooterPolicyLinks />
      </div>
    </footer>
  );
}
