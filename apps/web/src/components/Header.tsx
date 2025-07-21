"use client";

import { useUser } from "@clerk/clerk-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./common/Logo";
import { UserNav } from "./common/UserNav";
import React from "react";

interface HeaderProps {
  onDreamClosetClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDreamClosetClick }) => {
  return (
    <header className="fashion-header flex flex-col sm:flex-row items-center justify-between px-6 py-6 bg-[#f8fafc] border-b border-gray-200 shadow-sm gap-4 sm:gap-0">
      <div className="fashion-header-title-group flex items-center gap-3">
        {/* Replace logo with a hanger emoji or similar, or update image if you have a new icon */}
        <span className="text-3xl">👗</span>
        <span className="fashion-header-title text-2xl font-bold font-serif text-gray-900">YourPersonalStylist</span>
      </div>
      <span className="fashion-header-subtitle text-lg sm:text-xl text-gray-600 font-light text-center sm:text-left px-2">Curate your dream closet with AI-powered recs!</span>
      <div className="flex items-center gap-4">
        <button className="fashion-header-btn px-4 py-2 rounded bg-[#ede6fa] text-[#7b4ae2] font-semibold hover:bg-[#e3d6fa] transition" onClick={onDreamClosetClick}>
          Your Dream Closet
        </button>
        <a href="/closet">
          <button className="ml-2 px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition font-medium shadow-sm">
            View Closet
          </button>
        </a>
      </div>
    </header>
  );
};

export default Header;
