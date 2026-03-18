"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CARD_HEIGHT = 620;

interface ContextType {
  scrollY: number;
}

const Context = createContext<ContextType>({ scrollY: 0 });

// ── StackingCardItem ─────────────────────────────────────────────────────────
// Each card is sticky at top-0. As cards above it stack on top, it scales down
// slightly to give a physical "depth" feel.
export function StackingCardItem({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const { scrollY } = useContext(Context);

  // The scroll-cue header (h-[620px]) precedes all cards, so card i's content
  // starts at (index + 1) * CARD_HEIGHT in the scroll stream.
  const scrollPastCard = Math.max(0, scrollY - (index + 1) * CARD_HEIGHT);
  const cardsOnTop = scrollPastCard / CARD_HEIGHT; // continuous 0 → N
  const scale = Math.max(0.85, 1 - cardsOnTop * 0.04);

  return (
    <div
      className={cn("sticky top-0", className)}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        zIndex: index + 1,
      }}
    >
      {children}
    </div>
  );
}

// ── StackingCards ────────────────────────────────────────────────────────────
// Provides scroll context to all StackingCardItem descendants.
// Pass the ref of the outer overflow container via scrollOptions.container.
export default function StackingCards({
  children,
  totalCards: _totalCards,
  scrollOptions,
}: {
  children: React.ReactNode;
  totalCards: number;
  scrollOptions?: { container?: React.RefObject<HTMLDivElement> };
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = scrollOptions?.container?.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollOptions?.container]);

  return <Context.Provider value={{ scrollY }}>{children}</Context.Provider>;
}
