"use client";

import { useRef, useEffect } from "react";
import BookCarousel from "./components/BookCarousel";
import DisciplineSection from "./components/DisciplineSection";

const imgPhone1 = "/assets/28eec43854df94240aad13559e96ff0ef79ff6ce.png";
const imgPhone2 = "/assets/926fc216d0f9a695a59757ef51dbf597173579ae.png";
const imgPhone3 = "/assets/de6f2da7df328b22f8542febf34a8bc06a7e074c.png";
const imgPhone4 = "/assets/980fcb15865e957672881f143365ef343876d59d.png";

const imgInstagram     = "/assets/79d0aa4889002432b36f4331e706d86423a0d36e.svg";
const imgIconsMaterial = "/assets/b5291d4d2b1827583bf9bb8c605ceefbb3beffbd.svg";
const imgStarInner     = "/assets/063eeb7df0bfa7a8f9992145f136fd810e34d1f3.svg";

const phones = [
  { src: imgPhone1, rotate: -17, z: 10 },
  { src: imgPhone2, rotate:  -9, z: 20 },
  { src: imgPhone3, rotate:   0, z: 30 },
  { src: imgPhone4, rotate:   9, z: 40 },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t, 0, 1);
}
// Map p from [inStart, inEnd] → [0, 1], clamped
function remap(p: number, inStart: number, inEnd: number) {
  return clamp((p - inStart) / (inEnd - inStart), 0, 1);
}

const InstagramBadge = () => (
  <div className="flex gap-[6px] items-start">
    <img src={imgInstagram} alt="Instagram" className="w-6 h-6 shrink-0" />
    <div className="flex flex-col gap-[4px]">
      <span className="text-[#747474] text-[14px] font-normal leading-[20px]">
        Instagram
      </span>
      <span className="text-white text-[16px] font-semibold leading-[22px]">
        968k - Followers
      </span>
    </div>
  </div>
);

export default function Home() {
  const zoneRef    = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const phoneRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  useEffect(() => {
    const zone    = zoneRef.current;
    const hero    = heroRef.current;
    const text    = textRef.current;
    const badge   = badgeRef.current;
    const overlay = overlayRef.current;
    const pEls    = phoneRefs.current;
    if (!zone || !hero || !text) return;

    pEls.forEach(el => { if (el) el.style.willChange = "transform, opacity"; });
    text.style.willChange = "transform, opacity";

    let targetP  = 0;
    let currentP = 0;
    let rafId    = 0;

    // Apply all DOM styles for a given progress value
    const applyStyles = (p: number) => {
      const tText = remap(p, 0.1, 0.4);
      text.style.opacity   = String(lerp(1, 0, tText));
      text.style.transform = `translateY(${lerp(0, -28, tText)}px)`;
      if (badge) badge.style.opacity = String(lerp(1, 0, tText));

      phones.forEach(({ rotate }, i) => {
        const el = pEls[i];
        if (!el) return;

        const t1 = remap(p, 0, 0.35);
        const currentRotate = lerp(rotate, 0, t1);

        const t2 = remap(p, 0.35, 0.6);
        const scalePresent = lerp(1, 1.08, t2);

        const t3 = remap(p, 0.6, 1.0);
        const scaleFinal = lerp(scalePresent, 0.45, t3);
        const opacity    = lerp(1, 0, t3);

        const scale   = p < 0.6 ? scalePresent : scaleFinal;
        const opacVal = p < 0.6 ? 1 : opacity;
        const nudge   = lerp(0, rotate * 2.5, t3);
        const blurPx  = p < 0.6 ? 0 : lerp(0, 18, t3);

        el.style.transform = `translateX(calc(-50% + ${nudge}px)) rotate(${currentRotate}deg) scale(${scale})`;
        el.style.opacity   = String(opacVal);
        el.style.filter    = blurPx > 0 ? `blur(${blurPx}px)` : "";
      });

      // Dark overlay blurs in as phones fade out, covering the gap
      if (overlay) {
        const tOverlay = remap(p, 0.55, 1.0);
        overlay.style.opacity = String(lerp(0, 1, tOverlay));
        overlay.style.backdropFilter = tOverlay > 0 ? `blur(${lerp(0, 24, tOverlay)}px)` : "";
      }

      if (p >= 0.999) {
        pEls.forEach(el => { if (el) el.style.willChange = "auto"; });
        hero.style.pointerEvents = "none";
      } else {
        pEls.forEach(el => { if (el) el.style.willChange = "transform, opacity"; });
        hero.style.pointerEvents = "";
      }
    };

    // RAF loop: smoothly lerp currentP → targetP so fast scrolls still animate
    const loop = () => {
      currentP += (targetP - currentP) * 0.13;
      applyStyles(currentP);
      if (Math.abs(targetP - currentP) > 0.0008) {
        rafId = requestAnimationFrame(loop);
      } else {
        applyStyles(targetP); // snap to exact target when close enough
      }
    };

    const onScroll = () => {
      const zoneTop     = zone.getBoundingClientRect().top + window.scrollY;
      const scrollRange = zone.offsetHeight - window.innerHeight;
      const newP = clamp((window.scrollY - zoneTop) / scrollRange, 0, 1);

      // If user jumped past the sticky zone (hero not visible), snap instantly
      const heroInView = window.scrollY >= zoneTop && window.scrollY <= zoneTop + scrollRange;
      if (!heroInView || Math.abs(newP - currentP) > 0.55) {
        cancelAnimationFrame(rafId);
        currentP = newP;
        targetP  = newP;
        applyStyles(newP);
        return;
      }

      if (Math.abs(newP - targetP) > 0.0005) {
        targetP = newP;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      pEls.forEach(el => { if (el) el.style.willChange = "auto"; });
    };
  }, []);

  return (
    <section className="bg-[#030303] min-h-screen overflow-x-clip">

      {/* ── scroll zone: hero sticks inside ── */}
      <div ref={zoneRef} style={{ height: "150vh" }}>

        {/* Sticky hero container */}
        <div
          ref={heroRef}
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        >
          <div className="hero-row flex flex-col px-4 pt-[60px] pb-[80px] h-full">

            {/* Column A — heading + CTA (fades on scroll) */}
            <div
              ref={textRef}
              className="hero-content flex-1 flex flex-col gap-[48px] justify-center mt-0"
            >
              <div
                className="hero-heading font-black text-[64px] text-white w-full"
                style={{ lineHeight: "1.07", whiteSpace: "pre-wrap" }}
              >
                <p className="m-0">STOIC </p>
                <p className="hero-mindset m-0">
                  <span className="text-[#747474]">MINDSET</span>
                </p>
                <p className="m-0">{"    LOREM"}</p>
                <p className="m-0">{"   IPSUM"}</p>
              </div>

              <div className="hero-cta-group flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex gap-[8px] items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="relative shrink-0 size-[14px] overflow-hidden">
                        <img
                          alt=""
                          className="absolute inset-0 w-full h-full"
                          src={imgIconsMaterial}
                        />
                        <div className="absolute" style={{ inset: "14.89% 14.35% 16.97% 14.35%" }}>
                          <img
                            alt=""
                            className="absolute inset-0 w-full h-full"
                            src={imgStarInner}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[16px] font-normal text-white leading-[22px] m-0">
                    +100,000 Stoics Transformed
                  </p>
                </div>

              </div>
            </div>

            {/* Column B — phone fan + badges */}
            <div className="hero-phones relative w-full">

              {/* Desktop-only Instagram badge (top) */}
              <div className="hero-badge-desktop hidden gap-[6px] items-start mb-[24px]">
                <InstagramBadge />
              </div>

              {/* Phone fan — each card animated via its ref */}
              <div className="hero-phone-fan relative mt-0 h-[320px]">
                {phones.map(({ src, rotate, z }, i) => (
                  <div
                    key={i}
                    ref={el => { phoneRefs.current[i] = el; }}
                    className="hero-phone-card absolute bottom-0 left-1/2 w-[180px] h-[258px] border-4 border-[#747474] rounded-[20px] overflow-hidden"
                    style={{
                      transform: `translateX(-50%) rotate(${rotate}deg)`,
                      transformOrigin: "bottom center",
                      zIndex: z,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Mobile-only badge (below fan) */}
              <div
                ref={badgeRef}
                className="hero-badge flex gap-[6px] items-start mt-[32px]"
              >
                <InstagramBadge />
              </div>

            </div>
          </div>
          {/* Blur/fade overlay — covers phones as they exit, bridges gap to next section */}
          <div
            ref={overlayRef}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 60%, rgba(3,3,3,0.6) 0%, #030303 70%)",
              zIndex: 10,
            }}
          />
        </div>

      </div>
      {/* ── End scroll zone ── */}

      {/* Pull carousel up — it rises from below as hero blurs out */}
      <div style={{ marginTop: "-50vh", position: "relative", zIndex: 1 }}>
        <BookCarousel />
      </div>
      <DisciplineSection />
    </section>
  );
}
