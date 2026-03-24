"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do your products actually help?",
    answer:
      "Most advice out there is just motivation. Feels good for a day, gone by the weekend. Our products don't motivate you, they install systems. Concrete daily structures that run whether you feel like it or not. Because the people who changed their lives didn't feel inspired every day. They just had a process they refused to break.",
  },
  {
    question: "Why do you run this page?",
    answer:
      "Because the majority of what's out there is either toxic positivity or empty motivation that leaves people exactly where they started. We've been through the process of rebuilding from scratch, the mindset, the body, the habits, and know exactly what works and what's just noise. This page exists to cut through that and give people the real version. No agenda. Just what actually works.",
  },
  {
    question: "What's the single best piece of advice you'd give?",
    answer:
      "Set a schedule and give it everything you have. Not a rough idea of what the day looks like, a real structure, locked in, non negotiable. Most people fail not because they lack ability but because they leave too much to how they feel on the day. Remove the feeling from the equation. The schedule decides. You just show up.",
  },
];

function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#111111] rounded-[16px] p-6 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-white text-[15px] font-semibold leading-[22px]">
          {question}
        </h3>
        <button
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 w-6 h-6 rounded-full border border-[#2d2d2d] flex items-center justify-center text-white hover:border-[#747474] transition-colors mt-0.5"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <span className="text-[16px] leading-none select-none">
            {open ? "−" : "+"}
          </span>
        </button>
      </div>

      {/* Answer */}
      {open && (
        <p className="text-[#747474] text-[14px] font-normal leading-[22px]">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-[#030303] py-16 px-[80px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">

        <h2 className="text-white text-[32px] font-bold leading-tight text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {faqs.map((faq, i) => (
            <FAQCard key={i} {...faq} />
          ))}
        </div>

      </div>
    </section>
  );
}
