import React from 'react';

export const metadata = {
  title: 'Medical Disclaimer',
  description: 'Ayurvedic Promise Medical Disclaimer. Read this clinical warning regarding recommendations on this website.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-cream min-h-screen pb-16">
      {/* Header */}
      <div className="bg-sage-dark text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Medical Disclaimer</h1>
          <p className="font-body text-xs md:text-sm text-cream/70 mt-2">Last Updated: June 18, 2026</p>
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-4xl mx-auto px-4 mt-12 bg-white rounded-2xl p-8 border border-border-light shadow-sm text-left">
        <div className="prose max-w-none flex flex-col gap-6 font-body text-text-primary text-sm md:text-base leading-relaxed">
          <p className="font-semibold text-terracotta">
            PLEASE READ THIS MEDICAL DISCLAIMER CAREFULLY BEFORE USING OUR WEBSITE OR PURSUING HEALTH SUGGESTIONS.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">1. General Information Only</h2>
          <p>
            The content, text, graphics, images, and other materials contained on the Ayurvedic Promise website and health blog are for informational and educational purposes only. None of the content provided represents professional medical diagnosis, treatment, or specific advice.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">2. No Doctor-Patient Relationship</h2>
          <p>
            Reading articles on ayurvedicpromise.com or submitting a symptom assessment form on this website does not constitute or create a doctor-patient relationship between you and any physicians representing Ayurvedic Promise. A formal doctor-patient relationship is only established during paid, scheduled consultations where a doctor reviews clinical history, pulse details, and clinical reports.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">3. Not a Substitute for Medical Advice</h2>
          <p>
            You should never rely on the information on this website as an alternative to medical advice from your regular physician, gynecologist, or other professional healthcare provider.
          </p>
          <p>
            If you have specific questions about any medical matter, you should consult your doctor. If you think you may be suffering from any medical condition, you should seek immediate clinical attention. Never disregard professional medical advice or delay seeking medical treatment because of information you read on this website.
          </p>

          <h2 className="font-display text-xl md:text-2xl font-bold text-sage-dark mt-4">4. Ayurvedic Medicine Action</h2>
          <p>
            Ayurvedic wellness plans involve dietary adjustments, lifestyle routines (yoga/exercise), and botanical herbs. The rate of physiological recovery from PCOS/PCOD varies by individual constitution (Prakriti), metabolic rate (Agni), and consistency. While Ayurvedic treatments are natural and FDA-approved, they are designed to support systemic balance and should be pursued under qualified physician supervision.
          </p>
        </div>
      </div>
    </div>
  );
}
