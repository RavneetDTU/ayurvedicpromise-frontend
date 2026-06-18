import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Ayurvedic Promise support or schedule a consultation with our doctors.',
};

export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen pb-16">
      {/* Header */}
      <div className="bg-sage-dark text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Contact Our Team</h1>
          <p className="font-body text-xs md:text-sm text-cream/70 mt-2">
            We are here to support your holistic hormone recovery journey.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Column */}
        <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm text-left flex flex-col gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-sage-dark mb-2">Reach Out</h2>
            <p className="font-body text-sm text-text-muted">
              Have questions about our herbal plans, shipping, or consultation slots? Feel free to contact us.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-start">
              <div className="p-3 bg-sage/10 text-sage rounded-xl flex-shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-body text-sm font-bold text-text-primary">WhatsApp Support</h3>
                <p className="font-body text-xs text-text-muted mt-0.5">Click below to start an instant text session.</p>
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-body text-sm font-semibold text-terracotta hover:underline block mt-1"
                >
                  +91 (WhatsApp Chat)
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-3 bg-sage/10 text-sage rounded-xl flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-body text-sm font-bold text-text-primary">Email Support</h3>
                <p className="font-body text-xs text-text-muted mt-0.5">We typically reply within 12-24 hours.</p>
                <a 
                  href="mailto:support@ayurvedicpromise.com" 
                  className="font-body text-sm font-semibold text-terracotta hover:underline block mt-1"
                >
                  support@ayurvedicpromise.com
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-3 bg-sage/10 text-sage rounded-xl flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-body text-sm font-bold text-text-primary">Wellness Clinic</h3>
                <p className="font-body text-xs text-text-muted mt-0.5">Ayurvedic Promise Health Hub</p>
                <span className="font-body text-xs text-text-primary block mt-1 font-medium">
                  Sector 62, Noida, Uttar Pradesh, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours Column */}
        <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm text-left flex flex-col gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-sage-dark mb-2">Clinic Hours</h2>
            <p className="font-body text-sm text-text-muted">
              Our doctor call lines and WhatsApp support operate during these hours.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-light pb-2">
              <span className="font-body text-sm text-text-primary font-semibold">Monday - Friday</span>
              <span className="font-body text-sm text-text-muted flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-sage" />
                9:00 AM - 6:00 PM (IST)
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-border-light pb-2">
              <span className="font-body text-sm text-text-primary font-semibold">Saturday</span>
              <span className="font-body text-sm text-text-muted flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-sage" />
                10:00 AM - 4:00 PM (IST)
              </span>
            </div>

            <div className="flex items-center justify-between pb-2">
              <span className="font-body text-sm text-text-primary font-semibold">Sunday</span>
              <span className="font-body text-sm text-red-500 font-medium">Closed (Rest Day)</span>
            </div>
          </div>

          <div className="mt-auto bg-cream rounded-xl p-4 border border-border-light/40 flex flex-col gap-3">
            <h4 className="font-body text-xs font-bold text-sage-dark uppercase tracking-wider">
              Need immediate triage?
            </h4>
            <p className="font-body text-xs text-text-muted">
              Submit your symptom profile, and a doctor will call you back directly to plan your herbal dosage.
            </p>
            <a href="/consult" className="w-full">
              <Button variant="primary" size="sm" className="w-full font-body text-xs py-2">
                Go to Consult Form
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
