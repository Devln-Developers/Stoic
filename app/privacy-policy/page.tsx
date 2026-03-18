export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      body: "We may collect the following types of information: Personal information you voluntarily provide, such as your name, email address, and payment details when you make a purchase, subscribe to our newsletter, or contact us. Usage data collected automatically, including your IP address, browser type, device information, pages visited, and time spent on our site. Cookies and tracking data used to improve your experience and analyse site performance.",
    },
    {
      title: "2. How We Use Your Information",
      body: "We use the information we collect to process orders and deliver products or services, send email communications such as newsletters, promotions, and updates (only if you opt in), improve our website, content, and user experience, analyse traffic and usage patterns, and comply with legal obligations.",
    },
    {
      title: "3. Cookies",
      body: "Our website uses cookies and similar tracking technologies. You can control cookie preferences through your browser settings. Third-party services we use (such as analytics or payment processors) may also place cookies on your device.",
    },
    {
      title: "4. Third-Party Services",
      body: "We may use third-party tools and platforms including payment processors (e.g., Stripe, PayPal), email marketing services, analytics providers (e.g., Google Analytics), and social media platforms (e.g., Instagram). These third parties have their own privacy policies, and we encourage you to review them.",
    },
    {
      title: "5. Data Sharing",
      body: "We do not sell, rent, or trade your personal information. We may share data with trusted service providers who assist in operating our website and business, or when required by law.",
    },
    {
      title: "6. Data Security",
      body: "We take reasonable measures to protect your personal information. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "7. Your Rights",
      body: "Depending on your location, you may have the right to access, correct, or delete your personal data, withdraw consent for marketing communications at any time, request a copy of the data we hold about you, and lodge a complaint with a relevant data protection authority. To exercise any of these rights, contact us at the email listed below.",
    },
    {
      title: "8. Children's Privacy",
      body: "Our website and services are not directed at individuals under the age of 16. We do not knowingly collect personal information from children.",
    },
    {
      title: "9. Links to Other Websites",
      body: "Our site may contain links to external websites. We are not responsible for the privacy practices or content of those sites.",
    },
    {
      title: "10. Changes to This Policy",
      body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.',
    },
    {
      title: "11. Contact Us",
      body: "If you have any questions about this Privacy Policy, contact us at: stoicmindset02@gmail.com",
    },
  ];

  return (
    <section className="bg-[#030303] min-h-screen py-[80px] px-4 lg:px-[80px]">
      <div className="max-w-[860px] flex flex-col gap-[32px]">

        <h1 className="text-white font-black text-[40px] leading-[48px] uppercase">
          Privacy Policy
        </h1>

        <div className="flex flex-col gap-[8px]">
          <p className="text-[#747474] text-[14px] leading-[22px]">
            Last Updated: March 12, 2026
          </p>
          <p className="text-white text-[15px] leading-[26px]">
            This Privacy Policy explains how Stoic Mindset (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects your information when you visit our website or interact with our content and services.
          </p>
        </div>

        {sections.map((s, i) => {
          const emailMatch = s.body.match(/^(.*?)(stoicmindset02@gmail\.com)(.*)$/s);
          return (
            <div key={i} className="flex flex-col gap-[8px]">
              <h2 className="text-white font-semibold text-[16px] leading-[24px]">
                {s.title}
              </h2>
              <p className="text-[#747474] text-[14px] leading-[24px]">
                {emailMatch ? (
                  <>
                    {emailMatch[1]}
                    <a
                      href="mailto:stoicmindset02@gmail.com"
                      className="text-white underline hover:text-[#747474] transition-colors"
                    >
                      {emailMatch[2]}
                    </a>
                    {emailMatch[3]}
                  </>
                ) : s.body}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
}
