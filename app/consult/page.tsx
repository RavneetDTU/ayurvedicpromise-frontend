import React from 'react';
import Image from 'next/image';
import { LeadForm } from '@/components/public/LeadForm';
import { Star, ShieldCheck, Clock, Award } from 'lucide-react';

export const metadata = {
  title: 'Book Free Doctor Consultation',
  description: 'Book your free Ayurvedic clinical assessment for PCOS, hair fall, acne, and weight gain. Talk to our senior physicians.',
};

export default function ConsultPage() {
  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Trust signals and info */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="bg-sage/10 text-sage-dark font-body text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider self-start">
              🏥 Ovarian Intake Assessment
            </span>
            
            <h1 className="font-display text-4xl font-bold text-text-primary leading-tight">
              Ready to feel like yourself again?
            </h1>
            
            <p className="font-body text-base text-text-muted leading-relaxed">
              Take the first step toward balancing your hormones naturally. Fill out our clinical intake assessment, and our Senior Ayurvedic Physician will call you for a comprehensive 1-on-1 review.
            </p>

            {/* Doctor Card */}
            <div className="bg-cream-white rounded-2xl p-5 border border-border-light shadow-sm flex gap-4 items-center mt-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-cream-dark flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
                  alt="Dr. Priya Sharma BAMS"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-body text-sm font-bold text-text-primary">Under Supervision of</h3>
                <p className="font-body text-xs text-terracotta font-semibold">Dr. Priya Sharma, BAMS</p>
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <span className="text-text-muted text-[11px] font-body font-semibold ml-1">4.9 (10k+ cases)</span>
                </div>
              </div>
            </div>

            {/* Trust Bullet List */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-sage/10 text-sage rounded-xl flex-shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-text-primary">100% Private & Confidential</h4>
                  <p className="font-body text-xs text-text-muted mt-0.5">Your clinical profile and contact details are stored securely and never shared.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-sage/10 text-sage rounded-xl flex-shrink-0 mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-text-primary">Doctor Callback in 24 Hours</h4>
                  <p className="font-body text-xs text-text-muted mt-0.5">You will receive a call slot booking option on WhatsApp within 24 hours.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-sage/10 text-sage rounded-xl flex-shrink-0 mt-0.5">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-text-primary">Certified Ayurvedic Gynecologists</h4>
                  <p className="font-body text-xs text-text-muted mt-0.5">All calls are handled by certified BAMS doctors with specialization in ovarian disorders.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ingestion Form */}
          <div className="lg:col-span-7 w-full">
            <LeadForm variant="full" />
          </div>
        </div>

      </div>
    </div>
  );
}
