import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Ayurvedic Promise Privacy Policy. Learn how we handle your personal and clinical data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream min-h-screen pb-16">
      {/* Header */}
      <div className="bg-sage-dark text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="font-body text-xs md:text-sm text-cream/70 mt-2">Last Updated: June 18, 2026</p>
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-4xl mx-auto px-4 mt-12 bg-white rounded-2xl p-8 border border-border-light shadow-sm text-left">
        <div className="prose max-w-none flex flex-col gap-6 font-body text-text-primary text-sm md:text-base leading-relaxed">
          <p>
            At Ayurvedic Promise, accessible from ayurvedicpromise.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Ayurvedic Promise and how we use it.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">1. Information We Collect</h2>
          <p>
            If you contact us directly or submit a lead form, we may receive additional information about you such as your name, email address, phone number, age, city, and the symptoms you select (such as weight gain, hair fall, adult acne, etc.).
          </p>
          <p>
            This clinical intake information is collected solely for the purpose of matching you with an appropriate Ayurvedic physician who can review your physiological conditions.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Provide, operate, and maintain our website and medical triage channels.</li>
            <li>Improve, personalize, and expand our clinical consultation flows.</li>
            <li>Understand and analyze how you use our health hubs and articles.</li>
            <li>Connect you with certified BAMS doctors who will handle your callback.</li>
            <li>Communicate with you (via phone calls or WhatsApp messaging) for booking consultation slots.</li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">3. Data Security & Integrity</h2>
          <p>
            Your clinical answers, phone numbers, and profile details are protected by active database encryption. We do not sell or lease your personal identifiers or wellness indicators to meta-advertisers or third-party pharmaceutical conglomerates. Your data is strictly private.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">4. Consent</h2>
          <p>
            By using our website and submitting forms on `/consult` or `/blog`, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
}
