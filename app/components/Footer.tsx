// ── Assets ────────────────────────────────────────────────────────────────────
const imgMailIcon  = "/assets/3395e07a0c5ee58815b1655366ae54ef6c70797a.svg";
const imgMailInner = "/assets/4db1cc9e05dd1085ce26deb626122b1391c75045.svg";
const imgIgLogo    = "/assets/1ea323422476cb5e64541b402b7ab5867796d614.svg";

export default function Footer() {
  return (
    <footer className="bg-[#191919] flex flex-col gap-[40px] items-center py-[40px]">

      {/* Top row */}
      <div className="footer-top flex flex-col items-center justify-between gap-[24px] px-4 w-full">

        {/* Left: email + instagram */}
        <div className="footer-contact flex flex-col gap-[16px] items-center">

          {/* Email */}
          <div className="flex gap-[6px] items-center">
            <div className="relative shrink-0 size-[24px] overflow-hidden">
              <img src={imgMailIcon} alt="" className="absolute inset-0 w-full h-full" />
              <div className="absolute" style={{ inset: "16.67% 8.33%" }}>
                <img src={imgMailInner} alt="" className="absolute inset-0 w-full h-full" />
              </div>
            </div>
            <a
              href="mailto:stoicmindset02@gmail.com"
              className="text-white text-[16px] font-normal leading-[22px] whitespace-nowrap hover:text-[#747474] transition-colors"
            >
              stoicmindset02@gmail.com
            </a>
          </div>

          {/* Instagram */}
          <div className="flex gap-[6px] items-center">
            {/* Instagram icon — white rounded square bg + IG logo on top */}
            <div className="relative shrink-0 size-[24px]">
              <div className="absolute inset-0 bg-white rounded-[4.571px] shadow-[0px_2.286px_5.714px_0px_rgba(0,0,0,0.15)]" />
              <div className="absolute inset-[3px] overflow-hidden size-[18px]">
                <div className="absolute" style={{ inset: "4.17% 0.06% 0.02% 4.17%" }}>
                  <img src={imgIgLogo} alt="" className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            </div>
            <a
              href="https://www.instagram.com/stoicmindset0?igsh=d2VydmZzaDV1ZjEz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-[16px] leading-[22px] whitespace-nowrap hover:text-[#747474] transition-colors"
            >
              Stoic Mindset
            </a>
          </div>
        </div>

        {/* Right: links */}
        <div className="flex gap-[24px] items-center">
          <a href="/privacy-policy" className="text-[#747474] text-[16px] leading-[22px] whitespace-nowrap hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-[#747474] text-[16px] leading-[22px] whitespace-nowrap hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-[#747474] text-[16px] leading-[22px] text-center w-full">
        © 2026 Stoic Mindset. All rights reserved.
      </p>

    </footer>
  );
}
