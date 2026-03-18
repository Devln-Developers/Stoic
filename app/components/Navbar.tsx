"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/aurylius/id6755753775";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.aurylius.auryliusapp";

const navItemsBefore = [{ label: "Home", href: "/" }];
const navItemsAfter = [
  { label: "Our Achievements", href: "/#achievements" },
  { label: "FAQs", href: "/#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="nav-wrap w-full bg-[#030303] py-[20px] px-4">
        <div className="flex items-center gap-[28px]">

          {/* Left — nav links (desktop only, shown via .nav-links CSS) */}
          <div className="nav-links flex-1 bg-[#030303] rounded-[30px] px-[16px] py-[8px]">
            <ul className="flex items-center gap-[36px] text-[14px] leading-[20px] whitespace-nowrap">
              {navItemsBefore.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        isActive
                          ? "font-medium text-white"
                          : "font-normal text-[#747474] hover:text-white transition-colors"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              {/* About App dropdown */}
              <li ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1 font-normal text-[#747474] hover:text-white transition-colors"
                >
                  About App
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <ul className="absolute top-full left-0 mt-2 bg-[#111] border border-[#2d2d2d] rounded-[12px] overflow-hidden min-w-[180px] z-50">
                    <li>
                      <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-[#747474] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                      >
                        {/* Apple icon */}
                        <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor">
                          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-36.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49.1 190.5-49.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                        </svg>
                        App Store
                      </a>
                    </li>
                    <li>
                      <a
                        href={GOOGLE_PLAY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-[#747474] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                      >
                        {/* Google Play icon */}
                        <svg width="14" height="16" viewBox="0 0 512 512" fill="currentColor">
                          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l236.6-238.2L47 0zm414.7 235.7l-60.1-34.6-67.7 68 67.7 68 60.3-34.8c17.1-9.9 17.1-26.2-.2-66.6zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                        </svg>
                        Google Play
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {navItemsAfter.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        isActive
                          ? "font-medium text-white"
                          : "font-normal text-[#747474] hover:text-white transition-colors"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Center — brand name */}
          <div className="nav-brand flex-1 flex items-center justify-start h-[42px]">
            <a
              href="/"
              onClick={() => window.location.href = "/"}
              className="text-[16px] font-medium text-white leading-[22px] whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              Stoic Mindset
            </a>
          </div>

          {/* Right — CTA (desktop) / Hamburger (mobile) */}
          <div className="flex-1 flex items-center justify-end">
            {/* Desktop CTA */}
            <a
              href="https://www.instagram.com/stoicmindset0?igsh=d2VydmZzaDV1ZjEz"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta flex items-center gap-2 bg-[#030303] border border-[#2d2d2d] text-white text-[14px] font-semibold leading-[20px] px-[16px] py-[12px] rounded-[36px] cursor-pointer hover:border-[#747474] transition-colors whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
              Visit Us on Instagram
            </a>

            {/* Mobile hamburger */}
            <div className="nav-hamburger">
              <button
                onClick={() => setOpen(true)}
                className="bg-white text-black rounded-[12px] w-[44px] h-[44px] flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#030303]">

          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 py-[20px]">
            <span className="text-[16px] font-medium text-white">Stoic Mindset</span>
            <button
              onClick={() => setOpen(false)}
              className="bg-white text-black rounded-[12px] w-[44px] h-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col px-4 pt-[40px] gap-[32px]">
            {navItemsBefore.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-[20px] leading-[28px] ${
                      isActive ? "font-medium text-white" : "font-normal text-[#747474]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* About App — expandable */}
            <li>
              <button
                onClick={() => setMobileAboutOpen((v) => !v)}
                className="flex items-center gap-2 text-[20px] leading-[28px] font-normal text-[#747474]"
              >
                About App
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileAboutOpen && (
                <ul className="mt-4 flex flex-col gap-4 pl-2">
                  <li>
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-[16px] text-[#747474]"
                    >
                      <svg width="16" height="18" viewBox="0 0 814 1000" fill="currentColor">
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-36.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49.1 190.5-49.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                      </svg>
                      App Store
                    </a>
                  </li>
                  <li>
                    <a
                      href={GOOGLE_PLAY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-[16px] text-[#747474]"
                    >
                      <svg width="16" height="18" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l236.6-238.2L47 0zm414.7 235.7l-60.1-34.6-67.7 68 67.7 68 60.3-34.8c17.1-9.9 17.1-26.2-.2-66.6zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                      </svg>
                      Google Play
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {navItemsAfter.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-[20px] leading-[28px] ${
                      isActive ? "font-medium text-white" : "font-normal text-[#747474]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA at bottom */}
          <div className="mt-auto px-4 pb-[48px]">
            <a
              href="https://www.instagram.com/stoicmindset0?igsh=d2VydmZzaDV1ZjEz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#030303] border border-[#2d2d2d] text-white text-[14px] font-semibold leading-[20px] px-[16px] py-[14px] rounded-[36px]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
              Visit Us on Instagram
            </a>
          </div>

        </div>
      )}
    </>
  );
}
