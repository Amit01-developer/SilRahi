import React, { useState } from "react";
import {
  Scissors,
  Shield,
  MapPin,
  TrendingUp,
  Globe,
  ChevronDown,
  Lock,
  Database,
  Users,
  CreditCard,
  Eye,
  Share2,
  Trash2,
  Baby,
  RefreshCw,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    body: (
      <>
        <p>We collect only what's needed to connect you with the right tailor or customer:</p>
        <ul>
          <li><strong>Account details</strong> — name, phone number, email, and password when you sign up as a customer or tailor.</li>
          <li><strong>Profile information</strong> — photos, portfolio images, service categories, and pricing for tailor profiles.</li>
          <li><strong>Verification documents</strong> — ID proof and address proof submitted by tailors during our verification process.</li>
          <li><strong>Location data</strong> — your approximate or precise location, only when you enable it, to power nearby tailor discovery.</li>
          <li><strong>Order details</strong> — measurements, garment preferences, appointment times, and messages exchanged through the platform.</li>
          <li><strong>Payment information</strong> — handled by our payment partners; we do not store full card or bank details on our servers.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: "2. How We Use Your Information",
    body: (
      <>
        <p>Your information helps us run Silrahi and keep it trustworthy:</p>
        <ul>
          <li>Matching customers with verified tailors nearby.</li>
          <li>Processing bookings, appointments, and order updates.</li>
          <li>Verifying tailor identity to keep the platform safe.</li>
          <li>Powering Ask SilRahi AI to suggest fabrics, styles, and tailors based on your request.</li>
          <li>Sending booking confirmations, reminders, and support messages.</li>
          <li>Improving the app through aggregated, non-identifying usage patterns.</li>
        </ul>
      </>
    ),
  },
  {
    icon: MapPin,
    title: "3. Location & Map Discovery",
    body: (
      <p>
        Location access is optional and used only to show nearby tailors on the map and estimate distance.
        You can turn location off anytime in your device settings — you'll still be able to search tailors
        manually by city or area, though nearby recommendations may be less accurate.
      </p>
    ),
  },
  {
    icon: Users,
    title: "4. Tailor Verification Data",
    body: (
      <p>
        Tailors on Silrahi go through an admin verification step involving ID and address proof. These
        documents are used solely to confirm identity and are stored securely, accessible only to our
        verification team. They are never shown publicly on your profile.
      </p>
    ),
  },
  {
    icon: CreditCard,
    title: "5. Payments & Earnings",
    body: (
      <p>
        Payments are processed through PCI-compliant third-party payment gateways. Silrahi does not store
        your full card, UPI, or bank account numbers. Tailors' earnings and payout history are visible only
        to them on their private earnings dashboard.
      </p>
    ),
  },
  {
    icon: Share2,
    title: "6. When We Share Information",
    body: (
      <>
        <p>We share information only where it's necessary to run the service:</p>
        <ul>
          <li>Between a customer and tailor, limited to what's needed to complete a booking.</li>
          <li>With payment partners to process transactions securely.</li>
          <li>With law enforcement if legally required.</li>
        </ul>
        <p>We do not sell your personal data to advertisers or third parties.</p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "7. Data Security",
    body: (
      <p>
        We use encryption in transit, restricted internal access, and regular security reviews to protect
        your data. No system is 100% risk-free, but we work continuously to keep Silrahi's platform safe
        for both customers and tailors.
      </p>
    ),
  },
  {
    icon: Shield,
    title: "8. Your Rights & Choices",
    body: (
      <>
        <p>You're in control of your data on Silrahi. You can:</p>
        <ul>
          <li>Access or update your profile information anytime.</li>
          <li>Request a copy of the data we hold about you.</li>
          <li>Withdraw location permission at any time.</li>
          <li>Request deletion of your account and associated data.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Trash2,
    title: "9. Data Retention",
    body: (
      <p>
        We retain your data only as long as your account is active or as needed to provide the service.
        Once you request deletion, we remove personal data within 30 days, except where we're required to
        retain records for legal or tax purposes.
      </p>
    ),
  },
  {
    icon: Baby,
    title: "10. Children's Privacy",
    body: (
      <p>
        Silrahi is intended for users 18 years and older. We do not knowingly collect data from children.
        If you believe a minor has created an account, please contact us so we can remove it.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "11. Changes to This Policy",
    body: (
      <p>
        We may update this policy as Silrahi grows. Significant changes will be notified through the app
        or via email before they take effect. The "last updated" date at the top of this page always
        reflects the current version.
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

export function SilrahiPrivacyPage() {
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
          <Lock size={12} /> YOUR DATA, YOUR CONTROL
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Privacy <span className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">Policy</span>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
          How Silrahi collects, uses, and protects information for customers and
          tailors — explained simply, in plain English and Hindi-friendly terms.
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
            { icon: Shield, label: "Verified & Encrypted" },
            { icon: MapPin, label: "Location is optional" },
            { icon: TrendingUp, label: "No data resold, ever" },
            { icon: CheckCircle2, label: "Delete anytime" },
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
          <p className="text-xs font-bold tracking-wider text-white/70 mb-2">QUESTIONS ABOUT YOUR DATA?</p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">We're happy to walk you through it.</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <Scissors size={14} className="text-pink-400" />
            <span>© 2026 Silrahi. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70">Privacy Policy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <a href="#" className="hover:text-white/70">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
