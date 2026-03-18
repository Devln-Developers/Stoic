"use client";

import { useEffect, useRef } from "react";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgIcon1       = "/assets/6e0c1c8eadadc49f60553a59292f375550bb866f.svg";
const imgIcon2       = "/assets/e8a72b339561eb7d4fefa712bb7950d43bf4a828.svg";
const imgIcon3       = "/assets/3c459997f13d7ff6d15a52cbcba7e2935651ea7c.svg";
const imgQuoteOpen   = "/assets/3e895ef1d77b74ee18d391457f31012b0075dad5.svg";
const imgQuoteClose  = "/assets/36b27e097758728e3b5a51fc64e7e83ea0cb71aa.svg";
const imgFaqIcon     = "/assets/76cea484aa3fa238f18d58c44aa94af32f279da2.svg";
const imgFaqVector   = "/assets/0c4a5219bc5d6f12da7b616ca3545eb041744e6b.svg";

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: imgIcon1,
    title: "Stop Relying On Motivation",
    body: "Motivation is a feeling. Feelings are unreliable. The people who built real discipline stopped waiting to feel ready and started showing up regardless. Do it enough times and the brain stops asking — it just goes.",
  },
  {
    icon: imgIcon2,
    title: "Raise The Cost Of Quitting",
    body: "Discipline collapses when quitting is too easy. Make it harder to stop than to continue. Public commitments. Financial stakes. A standard so embedded in identity that breaking it feels worse than the discomfort of pushing through.",
  },
  {
    icon: imgIcon3,
    title: "Make The Decision Once",
    body: "Every time a decision gets remade, whether to train, whether to work, whether to skip, willpower gets drained. The most disciplined people don't decide daily. They decided once and removed the option to negotiate with themselves entirely.",
  },
];

const testimonials = [
  "Best $37 I ever spent. This isn't your typical self help garbage that makes you feel good for 48 hours then leave you exactly where you started. This is different. It reads like your older brother sitting you down after you've embarrassed yourself and giving you the hard talk you needed five years ago",
  "I don't know if you'll see this or not but really I've been on Instagram for years and I've never followed a page that hits me like this one. The posts, the mindset, the way you speak truth without sugarcoating it just clicks. It's not just posts for me anymore it's a reminder to keep pushing no matter what. Thank you",
  "I'm 27 from Birmingham. I read it on my break at work. Not even finished it yet but I already started fixing my mornings and trying to figure it out even more the four cores you mentioned. Good page too. Thank you and never ever stop posting",
  "Man the addiction it was ruining everything for me and my relationship was falling apart, my career was going nowhere and even my studies suffered because I just couldn't focus for more than a few minutes and I'd waste hours on it, feel empty after, promise myself I will stop then do it again",
];

const faqs = [
  {
    q: "How do your products actually help?",
    a: "Most advice out there is just motivation. Feels good for a day, gone by the weekend. Our products don't motivate you, they install systems. Concrete daily structures that run whether you feel like it or not. Because the people who changed their lives didn't feel inspired every day. They just had a process they refused to break.",
  },
  {
    q: "Why do you run this page?",
    a: "Because the majority of what's out there is either toxic positivity or empty motivation that leaves people exactly where they started. We've been through the process of rebuilding from scratch, the mindset, the body, the habits, and know exactly what works and what's just noise. This page exists to cut through that and give people the real version. No agenda. Just what actually works.",
  },
  {
    q: "What's the single best piece of advice you'd give?",
    a: "Set a schedule and give it everything you have. Not a rough idea of what the day looks like, a real structure, locked in, non negotiable. Most people fail not because they lack ability but because they leave too much to how they feel on the day. Remove the feeling from the equation. The schedule decides. You just show up.",
  },
];

// Direction logic:
// 3 cards → left, bottom, right
// even count → first half left, second half right
// odd count (other) → left half left, middle bottom, right half right
function getDirection(index: number, total: number): "left" | "right" | "bottom" {
  if (total === 3) {
    return index === 0 ? "left" : index === 1 ? "bottom" : "right";
  }
  if (total % 2 === 0) {
    return index < total / 2 ? "left" : "right";
  }
  const mid = Math.floor(total / 2);
  if (index < mid) return "left";
  if (index === mid) return "bottom";
  return "right";
}

function directionStyle(dir: "left" | "right" | "bottom") {
  if (dir === "left")   return "translateX(-70px)";
  if (dir === "right")  return "translateX(70px)";
  return "translateY(70px)";
}

const TRANSITION = "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)";

// Hook: observes an array of refs and adds "visible" class when in view
function useRevealOnScroll(refs: React.MutableRefObject<(HTMLDivElement | null)[]>) {
  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Animate in — transition is already set, just move to final state
            el.style.opacity = "1";
            el.style.transform = "translate(0,0)";
          } else {
            // 1. Kill transition so the reset is instant (no animation back)
            el.style.transition = "none";
            el.style.transitionDelay = "0ms";
            el.style.opacity = "0";
            el.style.transform = el.dataset.initTransform ?? "";
            // 2. Restore transition in the next frame so it's ready for re-entry
            requestAnimationFrame(() => {
              el.style.transition = TRANSITION;
              el.style.transitionDelay = el.dataset.initDelay ?? "0ms";
            });
          }
        });
      },
      { threshold: [0, 0.15] }
    );

    els.forEach((el) => {
      el.dataset.initTransform = el.style.transform;
      el.dataset.initDelay     = el.style.transitionDelay;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [refs]);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DisciplineSection() {
  const featureRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const faqRefs         = useRef<(HTMLDivElement | null)[]>([]);

  useRevealOnScroll(featureRefs);
  useRevealOnScroll(testimonialRefs);
  useRevealOnScroll(faqRefs);

  return (
    <section id="achievements" className="bg-[#030303] py-[120px]">
      <div className="px-4 lg:px-[80px] flex flex-col gap-[120px]">

        {/* ── 1. Build Unshakeable Discipline ────────────────────────────── */}
        <div className="flex flex-col gap-[48px] items-center">
          <div className="flex flex-col gap-[24px] items-center text-center w-full lg:w-[706px]">
            <h2 className="text-white font-bold text-[40px] leading-[48px] w-full">
              Build Unshakeable Discipline
            </h2>
            <p className="text-white font-normal text-[16px] leading-[22px] w-full">
              It is time to silence the noise and sharpen the mind. With the
              Stoic Bundle you will reclaim discipline, master your emotions and
              forge the kind of self control that cannot be bought. Rise through
              every obstacle with unbreakable resolve.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col lg:flex-row gap-[28px] items-stretch w-full">
            {features.map((f, i) => {
              const dir = getDirection(i, features.length);
              return (
                <div
                  key={i}
                  ref={el => { featureRefs.current[i] = el; }}
                  className="flex-1 flex flex-col gap-[16px] items-center bg-[#030303] border border-[#2d2d2d] rounded-[8px] p-[24px]"
                  style={{
                    opacity: 0,
                    transform: directionStyle(dir),
                    transition: `${TRANSITION}`,
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="relative shrink-0 size-[42px]">
                    <img src={f.icon} alt="" className="absolute inset-0 w-full h-full" />
                  </div>
                  <p className="text-white font-semibold text-[18px] leading-[24px] text-center">
                    {f.title}
                  </p>
                  <p className="text-[#747474] font-normal text-[14px] leading-[20px] text-center">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 2. Our Clients Words ────────────────────────────────────────── */}
        <div className="flex flex-col gap-[48px] items-center -mx-4 lg:mx-0">
          <h2 className="text-white font-bold text-[40px] leading-[48px] text-center px-4 lg:px-0">
            Our Clients Words
          </h2>

          <div className="flex flex-row lg:flex-row gap-[24px] items-stretch w-full overflow-x-auto pb-2 lg:overflow-x-visible snap-x snap-mandatory px-4 lg:px-0">
            {testimonials.map((text, i) => {
              const dir = getDirection(i, testimonials.length);
              return (
                <div
                  key={i}
                  ref={el => { testimonialRefs.current[i] = el; }}
                  className="flex-shrink-0 w-[80vw] lg:flex-1 lg:w-auto flex flex-col justify-between gap-[12px] bg-[#191919] rounded-[8px] p-[24px] snap-start"
                  style={{
                    opacity: 0,
                    transform: directionStyle(dir),
                    transition: TRANSITION,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="shrink-0 size-[24px]" style={{ transform: "scaleY(-1)" }}>
                    <img src={imgQuoteOpen} alt="" className="w-full h-full" />
                  </div>
                  <p className="flex-1 text-white font-normal text-[14px] leading-[20px]">{text}</p>
                  <div className="flex justify-end shrink-0 h-[24px]">
                    <div className="size-[24px]" style={{ transform: "rotate(180deg)" }}>
                      <img src={imgQuoteClose} alt="" className="w-full h-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. Frequently Asked Questions ──────────────────────────────── */}
        <div id="faq" className="flex flex-col gap-[48px] items-center">
          <h2 className="text-white font-bold text-[40px] leading-[48px] text-center w-full">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col lg:flex-row gap-[24px] items-stretch w-full">
            {faqs.map((faq, i) => {
              const dir = getDirection(i, faqs.length);
              return (
                <div
                  key={i}
                  ref={el => { faqRefs.current[i] = el; }}
                  className="flex-1 flex flex-col gap-[12px] bg-[#191919] rounded-[8px] p-[24px]"
                  style={{
                    opacity: 0,
                    transform: directionStyle(dir),
                    transition: TRANSITION,
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="flex gap-[12px] items-center w-full">
                    <p className="flex-1 text-white font-bold text-[16px] leading-[22px]">{faq.q}</p>
                    <div className="relative shrink-0 size-[18px] overflow-hidden">
                      <img src={imgFaqIcon} alt="" className="absolute inset-0 w-full h-full" />
                      <div className="absolute" style={{ inset: "8.33%" }}>
                        <img src={imgFaqVector} alt="" className="absolute inset-0 w-full h-full" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[#747474] font-normal text-[14px] leading-[20px] w-full">{faq.a}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
