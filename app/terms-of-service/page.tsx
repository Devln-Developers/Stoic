export default function TermsOfService() {
  const sections = [
    {
      title: "1. Overview",
      body: "Stoic Mindset operates a website offering self-improvement content, digital products, physical products, and related services. These Terms govern your use of our website and any purchases made through it.",
    },
    {
      title: "2. Eligibility",
      body: "You must be at least 16 years of age to use this website. By using our site, you confirm that you meet this requirement and that the information you provide is accurate and complete.",
    },
    {
      title: "3. Intellectual Property",
      body: "All content on this website — including text, graphics, logos, images, videos, course material, and digital downloads — is the property of Stoic Mindset and is protected by copyright and intellectual property laws. You may not reproduce, distribute, modify, or republish any content without our prior written consent. Purchasing a product grants you a personal, non-transferable licence to use that product. It does not grant you resale or redistribution rights.",
    },
    {
      title: "4. Purchases and Payments",
      body: "All prices are displayed at checkout and may be subject to change without notice. Payments are processed through secure third-party payment providers. You agree to provide accurate billing information. All sales of digital products are final unless otherwise stated at the point of sale.",
    },
    {
      title: "5. Refund Policy",
      body: "Due to the nature of digital products, refunds are generally not offered once the product has been delivered or accessed. For physical products, refund and return requests must be made within 14 days of receiving the item. The item must be unused and in its original condition. Contact us at the email listed below to initiate a return.",
    },
    {
      title: "6. User Conduct",
      body: "When using our website, you agree not to use our site for any unlawful purpose, attempt to gain unauthorised access to any part of our website or systems, copy, scrape, or redistribute our content without permission, impersonate any person or entity, or interfere with the proper functioning of the website.",
    },
    {
      title: "7. Disclaimer of Warranties",
      body: "All content on this website is provided \"as is\" and for general informational and educational purposes only. Stoic Mindset does not guarantee any specific results from using our products or content. Nothing on this site constitutes medical, financial, legal, or professional advice. You are solely responsible for any decisions or actions you take based on our content.",
    },
    {
      title: "8. Limitation of Liability",
      body: "To the fullest extent permitted by law, Stoic Mindset shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of the website or any products purchased. Our total liability to you for any claim shall not exceed the amount you paid for the specific product or service giving rise to the claim.",
    },
    {
      title: "9. Third-Party Links",
      body: "Our website may contain links to third-party websites or services. We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party sites.",
    },
    {
      title: "10. Termination",
      body: "We reserve the right to suspend or terminate your access to our website at our sole discretion, without notice, for conduct that we determine violates these Terms or is otherwise harmful to our business or other users.",
    },
    {
      title: "11. Governing Law",
      body: "These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    },
    {
      title: "12. Changes to These Terms",
      body: "We reserve the right to update or modify these Terms at any time. Changes will be posted on this page with an updated \"Last Updated\" date. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.",
    },
    {
      title: "13. Contact Us",
      body: "If you have any questions about these Terms, contact us at: stoicmindset02@gmail.com",
    },
  ];

  return (
    <section className="bg-[#030303] min-h-screen py-[80px] px-4 lg:px-[80px]">
      <div className="max-w-[860px] flex flex-col gap-[32px]">

        <h1 className="text-white font-black text-[40px] leading-[48px] uppercase">
          Terms of Service
        </h1>

        <div className="flex flex-col gap-[8px]">
          <p className="text-[#747474] text-[14px] leading-[22px]">
            Last Updated: March 12, 2026
          </p>
          <p className="text-white text-[15px] leading-[26px]">
            Welcome to Stoic Mindset. By accessing or using our website, purchasing our products, or engaging with our content, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use our website or services.
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
