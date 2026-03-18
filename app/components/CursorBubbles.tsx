"use client";

import { useEffect } from "react";

// Particle variants — spawned randomly for visual variety
const VARIANTS = [
  // small glowing orb (most common)
  { weight: 6, minSize: 4, maxSize: 9,  glow: 6,  color: "255,255,255" },
  // medium warm orb
  { weight: 3, minSize: 6, maxSize: 12, glow: 10, color: "220,210,255" },
  // tiny sharp spark
  { weight: 2, minSize: 2, maxSize: 5,  glow: 4,  color: "255,255,255" },
];

// Weighted random pick
const TOTAL_WEIGHT = VARIANTS.reduce((s, v) => s + v.weight, 0);
function pickVariant() {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const v of VARIANTS) { r -= v.weight; if (r <= 0) return v; }
  return VARIANTS[0];
}

export default function CursorBubbles() {
  useEffect(() => {
    let last = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 22) return; // ~45 particles/sec max
      last = now;

      const v    = pickVariant();
      const size = Math.random() * (v.maxSize - v.minSize) + v.minSize;
      const drift = (Math.random() - 0.5) * 70;   // horizontal spread ±35px
      const rise  = Math.random() * 40 + 50;       // rise 50–90px
      const dur   = Math.random() * 300 + 350;     // lifetime 350–650ms

      const el = document.createElement("div");

      el.style.cssText = `
        position: fixed;
        left: ${e.clientX - size / 2}px;
        top: ${e.clientY - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, rgba(${v.color},0.95) 0%, rgba(${v.color},0.35) 45%, transparent 75%);
        box-shadow: 0 0 ${v.glow}px rgba(${v.color},0.75), 0 0 ${v.glow * 2}px rgba(${v.color},0.35);
        pointer-events: none;
        z-index: 99999;
        will-change: transform, opacity;
        --drift: ${drift}px;
        --rise: ${rise}px;
        animation: orb-float ${dur}ms cubic-bezier(0.22,1,0.36,1) forwards;
      `;

      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <style>{`
      @keyframes orb-float {
        0%   { opacity: 1;   transform: translate(0, 0)                              scale(1);    }
        100% { opacity: 0;   transform: translate(var(--drift), calc(-1 * var(--rise))) scale(0.25); }
      }
    `}</style>
  );
}
