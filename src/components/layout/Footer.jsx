import React from "react";
import engboostLogo from "../../assets/home/engboost-logo.png";

function Footer() {
  return (
    <footer className="min-h-[var(--height-footer)] flex flex-col items-center justify-center bg-blue-950 text-white py-6">
      {/* Logo and Slogan */}
      <div className="flex gap-3 items-center">
        <img src={engboostLogo} alt="EngBoost Logo" className="h-10" />
        <span className="text-lg font-semibold">Fuel your Fluency</span>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} EngBoost. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
