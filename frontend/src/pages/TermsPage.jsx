import React, { useState } from "react";
import {
  Scissors,
  FileText,
  UserCheck,
  ShieldCheck,
  CreditCard,
  XCircle,
  Scale,
  AlertTriangle,
  RefreshCw,
  Mail,
  Phone,
  Users,
  Star,
  Ban,
  Gavel,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    body: (
      <p>
        By creating an account or using Silrahi as a customer or tailor, you agree to these Terms of
        Service and our Privacy Policy. If you don't agree with any part of these terms, please don't use
        the platform.
      </p>
    ),
  },
  {
    icon: UserCheck,
    title: "2. Eligibility & Account Registration",
    body: (
      <>
        <p>To use Silrahi, you must:</p>
        <ul>
          <li>Be at least 18 years old.</li>
          <li>Provide accurate, current information when creating your profile.</li>
          <li>Keep your login credentials confidential — you're responsible for activity on your account.</li>
          <li>Not create multiple accounts to bypass verification or ratings.</li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "3. Tailor Verification & Responsibilities",
    body: (
      <>
        <p>Tailors joining Silrahi agree to:</p>
        <ul>
          <li>Submit accurate ID and address proof for verification before going live.</li>
          <li>Represent their skills, pricing, and turnaround times honestly on their profile.</li>
          <li>Fulfil accepted bookings with the quality and timeline agreed with the customer.</li>
          <li>Maintain a safe, professional environment for in-person fittings and collections.</li>
        </ul>
        <p>Silrahi reserves the right to suspend or remove a tailor profile that fails verification or repeatedly breaches these terms.</p>
      </>
    ),
  },
  {
    icon: Users,
    title: "4. Customer Responsibilities",
    body: (
      <>
        <p>As a customer, you agree to:</p>
        <ul>
          <li>Provide accurate measurements and requirements for each order.</li>
          <li>Honor confirmed appointments, or cancel with reasonable notice.</li>
          <li>Pay for completed work as agreed at booking.</li>
          <li>Treat tailors respectfully — harassment or abuse will result in account action.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Scissors,
    title: "5. Role of the Platform",
    body: (
      <p>
        Silrahi is a marketplace that connects customers with independent, verified tailors. We are not the
        employer of any tailor, nor a party to the stitching or alteration work itself. Tailors operate as
        independent professionals, and the quality, pricing, and delivery of services are agreed directly
        between customer and tailor, within the guidelines of this platform.
      </p>
    ),
  },
  {
    icon: CreditCard,
    title: "6. Bookings & Payments",
    body: (
      <>
        <p>
          Bookings are confirmed once a tailor accepts a request. Payments are processed through our
          third-party payment partners; Silrahi does not store your full card or bank details. Prices shown
          on a tailor's profile are set by the tailor and may vary based on fabric, design complexity, or
          alterations discussed during booking.
        </p>
      </>
    ),
  },
  {
    icon: XCircle,
    title: "7. Cancellations & Refunds",
    body: (
      <>
        <ul>
          <li>Customers may cancel a booking free of charge up to the window shown at checkout.</li>
          <li>Late cancellations or no-shows may be subject to a partial charge to compensate the tailor's reserved time.</li>
          <li>Refunds for undelivered or significantly defective work are handled case-by-case through Silrahi support.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Star,
    title: "8. Reviews & Conduct",
    body: (
      <p>
        Reviews must reflect a genuine experience with a tailor or customer. Fake reviews, rating
        manipulation, or offensive content may be removed, and repeat offenders risk account suspension.
        Silrahi has zero tolerance for harassment, discrimination, or unsafe conduct by any user.
      </p>
    ),
  },
  {
    icon: Ban,
    title: "9. Prohibited Activities",
    body: (
      <>
        <p>You may not use Silrahi to:</p>
        <ul>
          <li>Circumvent the platform to avoid fees after being matched through Silrahi.</li>
          <li>Upload false verification documents or impersonate another person or business.</li>
          <li>Scrape, copy, or resell data from tailor or customer profiles.</li>
          <li>Use the platform for any unlawful purpose.</li>
        </ul>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: "10. Limitation of Liability",
    body: (
      <p>
        Silrahi facilitates connections between customers and tailors but does not guarantee the outcome of
        any stitching, alteration, or embroidery work. To the extent permitted by law, Silrahi is not liable
        for indirect damages, lost fabric, or disputes arising from work carried out between a customer and
        a tailor, beyond reasonable platform mediation.
      </p>
    ),
  },
  {
    icon: Gavel,
    title: "11. Termination",
    body: (
      <p>
        You may deactivate your account at any time from your settings. Silrahi may suspend or terminate
        accounts that violate these terms, submit fraudulent information, or pose a safety risk to other
        users, with notice where reasonably possible.
      </p>
    ),
  },
  {
    icon: Scale,
    title: "12. Governing Law",
    body: (
      <p>
        These terms are governed by the laws of India. Any disputes arising from use of Silrahi will be
        subject to the jurisdiction of the courts where Silrahi is registered.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "13. Changes to These Terms",
    body: (
      <p>
        We may update these terms as Silrahi evolves. Material changes will be communicated through the app
        or via email before they take effect. Continued use of Silrahi after changes take effect means you
        accept the updated terms.
      </p>
    ),
  },
];

function AccordionItem({ icon: Icon, title, body, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-pink-500/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left"
      >
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-pink-400" size={18} />
        </div>
        <span className="flex-1 font-semibold text-white text-[15px] sm:text-base">
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-white/40 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-pink-400" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pl-[4.25rem] sm:pl-[4.75rem] -mt-1 text-white/60 text-sm leading-relaxed space-y-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:text-white/80 [&_strong]:font-medium">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SilrahiTermsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0410] text-white font-sans antialiased">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 text-xs font-semibold tracking-wide text-pink-300 mb-6">
          <FileText size={12} /> TERMS OF SERVICE
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Terms of <span className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">Service</span>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
          The ground rules for using Silrahi as a customer or a tailor — written
          plainly, so there are no surprises.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Last updated: July 13, 2026
        </div>
      </section>

      {/* Quick promise cards */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: ShieldCheck, label: "Verified tailors only" },
            { icon: Scale, label: "Fair, transparent rules" },
            { icon: CreditCard, label: "Secure payments" },
            { icon: CheckCircle2, label: "Cancel anytime" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 flex flex-col items-center text-center gap-2"
            >
              <Icon size={18} className="text-pink-400" />
              <span className="text-xs text-white/60 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Accordion sections */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <div className="space-y-3">
          {sections.map((s, i) => (
            <AccordionItem
              key={s.title}
              icon={s.icon}
              title={s.title}
              body={s.body}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-pink-600 via-pink-600/90 to-purple-700 p-8 sm:p-10 text-center relative overflow-hidden">
          <p className="text-xs font-bold tracking-wider text-white/70 mb-2">HAVE A QUESTION ABOUT THESE TERMS?</p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Our support team is here to help.</h3>
        </div>
      </section>
    </div>
  );
}
