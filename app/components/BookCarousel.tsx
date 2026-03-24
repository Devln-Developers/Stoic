"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

const books = [
  { src: "/Hero-One.svg",   label: "The Reset" },
  { src: "/Hero-Two.svg",   label: "Obsidian" },
  { src: "/Hero-Three.svg", label: "Stoic Mind" },
  { src: "/Hero-Four.svg",  label: "Inner Forge" },
];

const CORNER_LABELS = ["For Sharp Mind", "For Sharp Mind", "For Sharp Mind", "For Sharp Mind"];

// Fan positions: offset in px from card center
const FAN = [
  { x: -92, y:  26, r: -20, s: 0.62 },
  { x: -28, y: -38, r:  -7, s: 0.74 },
  { x:  32, y: -32, r:  10, s: 0.74 },
  { x:  90, y:  20, r:  22, s: 0.62 },
];

const DUR      = 560;  // image-swap ms
const ENTRY_MS = 680;  // fan-to-card ms

export default function BookCarousel() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const animatingRef  = useRef(false);
  const pendingRef    = useRef<number | null>(null);
  const currentRef    = useRef(0);
  const lastWheelRef  = useRef(0);
  const entryFiredRef = useRef(false);

  const [displayed,   setDisplayed]   = useState(0);
  const [outgoing,    setOutgoing]    = useState<number | null>(null);
  const [incoming,    setIncoming]    = useState<number | null>(null);
  const [entryPhase,  setEntryPhase]  = useState<"wait" | "fan" | "done">("wait");

  // ── book transition ──────────────────────────────────────────────────────
  const runTransition = useCallback((to: number) => {
    if (to === currentRef.current) return;
    if (animatingRef.current) { pendingRef.current = to; return; }
    const from = currentRef.current;
    currentRef.current = to;
    animatingRef.current = true;
    setOutgoing(from);
    setIncoming(to);
    setTimeout(() => {
      setDisplayed(to);
      setOutgoing(null);
      setIncoming(null);
      animatingRef.current = false;
      if (pendingRef.current !== null) {
        const next = pendingRef.current;
        pendingRef.current = null;
        runTransition(next);
      }
    }, DUR);
  }, []);

  // ── entry animation — replays every time section re-enters viewport ──────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Section fully left — reset everything so it replays on next entry
          entryFiredRef.current = false;
          animatingRef.current  = false;
          pendingRef.current    = null;
          currentRef.current    = 0;
          setDisplayed(0);
          setOutgoing(null);
          setIncoming(null);
          setEntryPhase("wait");
          return;
        }
        if (entry.intersectionRatio >= 0.15 && !entryFiredRef.current) {
          entryFiredRef.current = true;
          setEntryPhase("fan");
          setTimeout(() => setEntryPhase("done"), ENTRY_MS);
        }
      },
      { threshold: [0, 0.15] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── touch swipe: left = next, right = prev ───────────────────────────────
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (entryPhase !== "done") return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      // Ignore if mostly vertical (user is scrolling the page)
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const curr = currentRef.current;
      if (dx < 0 && curr < books.length - 1) runTransition(curr + 1); // swipe left → next
      if (dx > 0 && curr > 0)               runTransition(curr - 1); // swipe right → prev
    };

    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [entryPhase, runTransition]);

  // ── wheel intercept: each tick = one book; at boundary, page scrolls ─────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (entryPhase !== "done") return;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // Only active when section is pinned at top of viewport
      if (rect.top > 80 || rect.bottom < window.innerHeight * 0.75) return;

      const now    = Date.now();
      const isDown = e.deltaY > 0;
      const curr   = currentRef.current;

      // Suppress trackpad momentum during debounce window
      if (now - lastWheelRef.current < 300) {
        if ((isDown && curr < books.length - 1) || (!isDown && curr > 0)) {
          e.preventDefault();
        }
        return;
      }

      if (isDown && curr < books.length - 1) {
        e.preventDefault();
        lastWheelRef.current = now;
        runTransition(curr + 1);
      } else if (!isDown && curr > 0) {
        e.preventDefault();
        lastWheelRef.current = now;
        runTransition(curr - 1);
      }
      // At first/last book: don't preventDefault → page scrolls naturally
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [entryPhase, runTransition]);

  const baseBook = incoming ?? displayed;

  return (
    <>
      <style>{`
        @keyframes bookSplitUp {
          0%   { transform: translateY(0)     scaleX(1);    }
          60%  { transform: translateY(-75%)  scaleX(1);    }
          100% { transform: translateY(-160%) scaleX(0.82); }
        }
        @keyframes bookSplitDown {
          0%   { transform: translate(0, 0)              scale(1);    }
          60%  { transform: translate(-60%, 60%)         scale(1);    }
          100% { transform: translate(-130%, 130%)       scale(0.82); }
        }
        @keyframes bookIncoming {
          0%   { transform: scale(0.72); filter: blur(18px) brightness(1.6); opacity: 0;   }
          60%  { transform: scale(1.07); filter: blur(0px)  brightness(1.35); opacity: 1;  }
          100% { transform: scale(1);    filter: blur(0px)  brightness(1);    opacity: 1;  }
        }
        @keyframes cardGlow {
          0%   { box-shadow: 0 0 0px 0px rgba(255,255,255,0);    border-color: #747474; }
          35%  { box-shadow: 0 0 32px 6px rgba(255,255,255,0.18); border-color: #b0b0b0; }
          100% { box-shadow: 0 0 0px 0px rgba(255,255,255,0);    border-color: #747474; }
        }
        @keyframes fanToCenter {
          0%   {
            transform: translateX(calc(-50% + var(--fx)))
                       translateY(calc(-50% + var(--fy)))
                       rotate(var(--fr))
                       scale(var(--fs));
            opacity: 0;
          }
          14%  { opacity: 1; }
          82%  { opacity: 1; }
          100% {
            transform: translateX(-50%) translateY(-50%) scale(0.42);
            opacity: 0;
          }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateX(-50%) translateY(calc(-50% + 22px)) scale(0.90); }
          to   { opacity: 1; transform: translateX(-50%) translateY(-50%)              scale(1);    }
        }
        .book-split-up   { animation: bookSplitUp  ${DUR}ms cubic-bezier(0.4,0,0.2,1) both; }
        .book-split-down { animation: bookSplitDown ${DUR}ms cubic-bezier(0.4,0,0.2,1) both; }
        .book-incoming   { animation: bookIncoming  ${DUR}ms cubic-bezier(0.22,1,0.36,1) both; }
        .card-glow       { animation: cardGlow      ${DUR + 120}ms cubic-bezier(0.22,1,0.36,1) both; }
        .fan-thumb       { animation: fanToCenter   ${ENTRY_MS}ms cubic-bezier(0.22,1,0.36,1) both; }
        .card-reveal     { animation: cardReveal    300ms 20ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .text-reveal { animation: textReveal 600ms 80ms cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes textBlur {
          0%   { filter: blur(0px);  opacity: 1;   }
          30%  { filter: blur(8px);  opacity: 0.3; }
          100% { filter: blur(0px);  opacity: 1;   }
        }
        .text-blur { animation: textBlur ${DUR}ms cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div
        ref={sectionRef}
        className="min-h-screen bg-[#030303] py-12 px-4 lg:px-[80px] flex flex-col items-center justify-center gap-6"
      >
        {/* Description */}
        <p className={`text-white text-[16px] font-normal leading-[22px] text-center max-w-[560px] px-6${entryPhase !== "wait" ? " text-reveal" : " opacity-0"}${incoming !== null ? " text-blur" : ""}`}>
          The Stoic Way is your path to unlocking inner peace and mental fortitude.
          You&apos;ll learn how to understand your emotions with clarity, confront
          challenges with reason, and cultivate the virtues needed to live with
          purpose, not impulse.
        </p>

        {/* Card area */}
        <div className="relative w-full max-w-[860px] h-[520px] px-4 select-none">

          {/* SVG diagonal lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 860 520"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="100" y1="80"  x2="280" y2="260" stroke="#2d2d2d" strokeWidth="1.5" />
            <line x1="100" y1="440" x2="280" y2="260" stroke="#2d2d2d" strokeWidth="1.5" />
            <line x1="760" y1="80"  x2="580" y2="260" stroke="#2d2d2d" strokeWidth="1.5" />
            <line x1="760" y1="440" x2="580" y2="260" stroke="#2d2d2d" strokeWidth="1.5" />
            <circle cx="280" cy="260" r="3" fill="#2d2d2d" />
            <circle cx="580" cy="260" r="3" fill="#2d2d2d" />
          </svg>

          {/* Corner labels */}
          <span className={`absolute top-[60px]    left-[0px]  text-white font-bold text-[20px] leading-tight whitespace-nowrap${incoming !== null ? " text-blur" : ""}`}>{CORNER_LABELS[0]}</span>
          <span className={`absolute top-[60px]   right-[0px]  text-white font-bold text-[20px] leading-tight whitespace-nowrap${incoming !== null ? " text-blur" : ""}`}>{CORNER_LABELS[1]}</span>
          <span className={`absolute bottom-[60px] left-[0px]  text-white font-bold text-[20px] leading-tight whitespace-nowrap${incoming !== null ? " text-blur" : ""}`}>{CORNER_LABELS[2]}</span>
          <span className={`absolute bottom-[60px] right-[0px] text-white font-bold text-[20px] leading-tight whitespace-nowrap${incoming !== null ? " text-blur" : ""}`}>{CORNER_LABELS[3]}</span>

          {/* Fan thumbnails — entry only */}
          {entryPhase === "fan" && books.map((book, i) => (
            <div
              key={`fan-${i}`}
              className="fan-thumb absolute left-1/2 top-1/2 w-[110px] h-[157px] rounded-2xl overflow-hidden border-2 border-[#747474]"
              style={{
                "--fx": `${FAN[i].x}px`,
                "--fy": `${FAN[i].y}px`,
                "--fr": `${FAN[i].r}deg`,
                "--fs": FAN[i].s,
                animationDelay: `${i * 55}ms`,
                zIndex: i + 10,
              } as React.CSSProperties}
            >
              <Image src={book.src} alt={book.label} width={110} height={157} className="w-full h-full object-cover" />
            </div>
          ))}

          {/* Main book card */}
          {entryPhase !== "wait" && (
            <div
              className={[
                "absolute left-1/2 top-1/2",
                "border-4 border-[#747474] rounded-[20px]",
                // NO overflow-hidden — lets split halves escape the card frame
                "w-[200px] h-[286px] lg:w-[300px] lg:h-[430px]",
                entryPhase === "done" ? "card-reveal" : "opacity-0 -translate-x-1/2 -translate-y-1/2",
                incoming !== null ? "card-glow" : "",
              ].join(" ")}
            >
              {/* Base / incoming image — own overflow-hidden to honour border-radius */}
              <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                <Image
                  key={`base-${baseBook}`}
                  src={books[baseBook].src}
                  alt={books[baseBook].label}
                  width={300}
                  height={430}
                  className={`w-full h-full object-cover${incoming !== null ? " book-incoming" : ""}`}
                />
              </div>

              {/* Outgoing — top half flies UP out of the frame */}
              {outgoing !== null && (
                <div
                  className="book-split-up absolute inset-0"
                  style={{ clipPath: "inset(0 0 50% 0 round 16px 16px 0 0)" }}
                >
                  <Image src={books[outgoing].src} alt="" width={300} height={430} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Outgoing — bottom half flies DOWN out of the frame */}
              {outgoing !== null && (
                <div
                  className="book-split-down absolute inset-0"
                  style={{ clipPath: "inset(50% 0 0 0 round 0 0 16px 16px)" }}
                >
                  <Image src={books[outgoing].src} alt="" width={300} height={430} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {books.map((_, i) => (
            <button
              key={i}
              onClick={() => runTransition(i)}
              className={`rounded-full transition-all ${
                i === displayed ? "w-6 h-2 bg-white" : "w-2 h-2 bg-[#747474]"
              }`}
              aria-label={`Book ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
