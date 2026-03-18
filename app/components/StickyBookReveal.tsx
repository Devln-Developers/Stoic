"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const books = [
  {
    src: "http://localhost:3845/assets/980fcb15865e957672881f143365ef343876d59d.png",
    label: "01",
    title: "The Reset",
    description:
      "A complete mental reboot for those who feel stuck. The Reset strips away the noise of modern life and returns you to the ancient principles of clarity, discipline, and intentional living.",
  },
  {
    src: "http://localhost:3845/assets/926fc216d0f9a695a59757ef51dbf597173579ae.png",
    label: "02",
    title: "The Stoic Manual",
    description:
      "Your practical field guide to Stoic philosophy. Drawn from Marcus Aurelius, Epictetus, and Seneca, it translates two thousand years of wisdom into daily habits you can act on today.",
  },
  {
    src: "http://localhost:3845/assets/de6f2da7df328b22f8542febf34a8bc06a7e074c.png",
    label: "03",
    title: "Inner Citadel",
    description:
      "The mind is the only fortress that cannot be taken by force. Inner Citadel teaches you to build unshakeable mental resilience and meet every challenge from a place of absolute calm.",
  },
  {
    src: "http://localhost:3845/assets/28eec43854df94240aad13559e96ff0ef79ff6ce.png",
    label: "04",
    title: "Memento Mori",
    description:
      "Confronting mortality is not morbid — it is liberating. Memento Mori shows you how awareness of life's limits transforms procrastination into purpose and fear into focused action.",
  },
];

export default function StickyBookReveal() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Trigger when a text section crosses the centre of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#030303]">
      {/* Description */}
      <div className="max-w-[1280px] mx-auto px-[80px] pt-[60px] pb-[80px]">
        <p className="text-white text-[16px] font-normal leading-[22px] text-center max-w-[706px] mx-auto">
          The Stoic Way is your path to unlocking inner peace and mental
          fortitude. You&apos;ll learn how to understand your emotions with
          clarity, confront challenges with reason, and cultivate the virtues
          needed to live with purpose, not impulse.
        </p>
      </div>

      {/* Two-column sticky layout */}
      <div className="max-w-[1280px] mx-auto px-[80px] flex items-start gap-[80px]">

        {/* ── Left: scrolling text sections ── */}
        <div className="flex-1">
          {books.map((book, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="min-h-screen flex items-center"
            >
              <div className="flex flex-col gap-[24px]">
                <span className="text-[#747474] text-[14px] font-normal leading-[20px] tracking-widest">
                  {book.label}
                </span>
                <h2 className="text-white font-black text-[64px] leading-[72px] uppercase">
                  {book.title}
                </h2>
                <p className="text-[#747474] text-[16px] font-normal leading-[22px] max-w-[420px]">
                  {book.description}
                </p>
                <div className="mt-[8px]">
                  <button className="bg-[#030303] border border-[#2d2d2d] text-white text-[14px] font-semibold leading-[20px] px-[16px] py-[12px] rounded-[36px] hover:border-[#747474] transition-colors whitespace-nowrap">
                    CLAIM YOURS NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: sticky phone mockup with animated image swap ── */}
        <div className="sticky top-0 h-screen flex items-center shrink-0 w-[340px]">
          <div
            className="relative border-4 border-[#747474] rounded-[20px] overflow-hidden"
            style={{ width: 300, height: 430 }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={books[active].src}
                  alt={books[active].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
