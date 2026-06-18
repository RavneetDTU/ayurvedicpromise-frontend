'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Scale, 
  Scissors, 
  Calendar, 
  BatteryWarning, 
  Sparkles, 
  Smile, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Clock,
  CalendarCheck,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SymptomCard } from './SymptomCard';
import { TestimonialCard } from './TestimonialCard';
import { LeadForm } from './LeadForm';
import { BlogCard } from './BlogCard';
import { Blog } from '@/types';

interface HomepageClientProps {
  blogs: Blog[];
}

export const HomepageClient: React.FC<HomepageClientProps> = ({ blogs }) => {
  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Symptoms data
  const symptoms = [
    { label: 'Weight Gain', icon: Scale },
    { label: 'Hair Fall', icon: Scissors },
    { label: 'Irregular Periods', icon: Calendar },
    { label: 'Fatigue', icon: BatteryWarning },
    { label: 'Adult Acne', icon: Sparkles },
    { label: 'Facial Hair', icon: Smile },
  ];

  // FAQ list
  const faqs = [
    {
      q: 'How does Ayurveda help with PCOS weight gain and hair fall?',
      a: 'Ayurveda views PCOS as a combination of Kapha (metabolic lag) and Vata (hormonal dysregulation) imbalance. Instead of masking symptoms with contraceptive pills, we use organic herbs like Shatavari and Kanchanar to restore ovarian function, and boost Kapha metabolism to naturally melt fat and prevent hair thinning from the roots.',
    },
    {
      q: 'Are these plans doctor-backed?',
      a: 'Yes, absolutely. Every plan is customized and monitored by qualified BAMS (Bachelor of Ayurvedic Medicine and Surgery) physicians. You will have regular one-on-one phone consultations to review your progress and tweak your herbal doses.',
    },
    {
      q: 'When will I start seeing results?',
      a: 'Most patients report improved digestion and energy levels within 2-4 weeks. Menstrual cycle regulation and acne reduction typically occur within 3 months, while sustainable weight loss and noticeable hair regrowth are observed in the 3-6 month window.',
    },
    {
      q: 'Are there any side effects to the Ayurvedic medicines?',
      a: 'None. All our herbal formulations are 100% natural, FDA-approved, and heavy-metal tested. They contain zero synthetic chemicals or hormones, making them completely safe for long-term consumption.',
    },
    {
      q: 'Do I need to follow a strict diet?',
      a: 'Not strict, but mindful. We provide an easy-to-follow, personalized anti-inflammatory diet based on your body constitution (Prakriti). It focuses on whole foods, warm meals, and specific seed cycling routines rather than starvation or calorie counting.',
    },
  ];

  // Helper function to scroll to form
  const scrollToForm = () => {
    const element = document.getElementById('lead-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full">
      {/* SECTION 1: HERO */}
      <section className="relative bg-cream pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
            <span className="bg-sage/10 text-sage-dark font-body text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              🌿 Doctor-Backed Ovarian Wellness
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-[1.15] text-balance">
              Feeling tired, gaining weight, losing hair?
            </h1>
            <p className="font-body text-lg text-text-muted max-w-xl leading-relaxed">
              It might be PCOS — and we can help. Get a personalized, doctor-backed Ayurvedic plan designed for sustainable relief, naturally.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToForm}
              className="mt-2 font-body font-semibold group"
            >
              Book Free Consultation
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>

          {/* Right Image Placeholder (Wow Visual styling) */}
          <div className="md:col-span-5 relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-border-light/50 bg-cream-dark/30">
            <Image
              src="/images/doctor-hero.jpg"
              alt="Ayurvedic Doctor Consultation"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 40vw"
              priority
            />
            {/* Trust overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-body text-xs font-bold text-text-primary">10,000+ Indian Women</h4>
                <p className="font-body text-[11px] text-text-muted">Recovered from severe PCOS symptoms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYMPTOM STRIP */}
      <section className="bg-cream-white py-12 border-y border-border-light/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-6">
            Click your primary symptom to check treatment options
          </p>
          {/* Scrollable strip */}
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-none justify-start md:justify-center">
            {symptoms.map((symptom) => (
              <SymptomCard
                key={symptom.label}
                label={symptom.label}
                icon={symptom.icon}
                onClick={scrollToForm}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="section-py bg-cream-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark mb-3">
            Your 3-Step Journey to Balance
          </h2>
          <p className="font-body text-text-muted max-w-lg mx-auto mb-16">
            Simple, natural, and scientifically formulated for your unique body type.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-sage text-white font-body font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-body text-lg font-bold text-text-primary mt-2">
                Share Your Symptoms
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Take our 2-minute symptom assessment. Tell us about your cycles, energy, skin, and wellness challenges.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-sage text-white font-body font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-body text-lg font-bold text-text-primary mt-2">
                Get Doctor Consultation
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Connect on call with an expert Ayurvedic gynecologist. Get a customized herbs, diet, and wellness blueprint.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-sage text-white font-body font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-body text-lg font-bold text-text-primary mt-2">
                See Results in 4 Weeks
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Follow your plan with constant doctor check-ins, seed cycling support, and observe natural healing indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MEET YOUR DOCTOR */}
      <section className="section-py bg-cream">
        <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Image */}
          <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-cream-dark">
            <Image
              src="/images/doctor-priya.jpg"
              alt="Ayurvedic Doctor, Dr. Priya Sharma"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 40vw"
            />
          </div>

          {/* Doctor Bio */}
          <div className="md:col-span-7 flex flex-col items-start gap-4 text-left">
            <span className="bg-sage/10 text-sage-dark font-body text-xs font-bold px-3 py-1 rounded-full">
              Meet Your Guide
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark">
              Dr. Priya Sharma
            </h2>
            <p className="font-body text-sm font-semibold text-terracotta -mt-2">
              BAMS, Senior Ayurvedic Physician & PCOS Specialist (12+ Years Experience)
            </p>
            <p className="font-body text-base text-text-primary leading-relaxed mt-2">
              &quot;Ayurveda doesn&apos;t treat diseases; it restores the body&apos;s natural intelligence. In my 12 years of clinical practice, I have helped thousands of women heal their reproductive metabolic cycles simply by altering lifestyle and leveraging pure botanical compounds.&quot;
            </p>
            <p className="font-body text-sm italic text-text-muted">
              &quot;Your personal wellness guide — not a generic chatbot.&quot;
            </p>
            
            <Button
              variant="outline"
              size="md"
              onClick={scrollToForm}
              className="mt-4 font-body"
            >
              Consult with Dr. Priya
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: RESULTS TIMELINE */}
      <section className="section-py bg-cream-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark mb-4">
            Your Natural Healing Timeline
          </h2>
          <p className="font-body text-text-muted max-w-lg mx-auto mb-16">
            Real biological changes require time. Here is what you can expect with consistent care:
          </p>

          <div className="max-w-4xl mx-auto flex flex-col gap-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-dark md:before:left-1/2 md:before:-translate-x-0.5">
            {/* Timeline Item 1 */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 md:items-center text-left md:even:flex-row-reverse">
              <div className="absolute left-6 top-1.5 md:left-1/2 md:-translate-x-3 w-6 h-6 rounded-full border-4 border-white bg-terracotta shadow z-10" />
              <div className="pl-12 md:pl-0 md:w-1/2 md:text-right md:even:text-left">
                <span className="font-body text-xs font-bold text-terracotta uppercase tracking-wider block mb-1">
                  Weeks 2 - 4
                </span>
                <h3 className="font-body text-lg font-bold text-text-primary mb-2">
                  Improved Energy & Digestion
                </h3>
                <p className="font-body text-sm text-text-muted max-w-md md:ml-auto md:even:ml-0">
                  Bloating reduces, metabolic rate goes up, sleep quality improves, and afternoon fatigue disappears.
                </p>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 md:items-center text-left md:even:flex-row-reverse">
              <div className="absolute left-6 top-1.5 md:left-1/2 md:-translate-x-3 w-6 h-6 rounded-full border-4 border-white bg-terracotta shadow z-10" />
              <div className="pl-12 md:pl-0 md:w-1/2 md:text-left md:odd:text-right">
                <span className="font-body text-xs font-bold text-terracotta uppercase tracking-wider block mb-1">
                  Months 2 - 3
                </span>
                <h3 className="font-body text-lg font-bold text-text-primary mb-2">
                  Regular Periods & Cleared Skin
                </h3>
                <p className="font-body text-sm text-text-muted max-w-md">
                  Ovulation cycles align, period pain reduces, cystic acne clears up, and androgen markers improve.
                </p>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 md:items-center text-left md:even:flex-row-reverse">
              <div className="absolute left-6 top-1.5 md:left-1/2 md:-translate-x-3 w-6 h-6 rounded-full border-4 border-white bg-terracotta shadow z-10" />
              <div className="pl-12 md:pl-0 md:w-1/2 md:text-right md:even:text-left">
                <span className="font-body text-xs font-bold text-terracotta uppercase tracking-wider block mb-1">
                  Months 4 - 6
                </span>
                <h3 className="font-body text-lg font-bold text-text-primary mb-2">
                  Weight Reduction & Hair Recovery
                </h3>
                <p className="font-body text-sm text-text-muted max-w-md md:ml-auto md:even:ml-0">
                  Sustainable weight loss of 5-8kg, cessation of severe hair shedding, and growth of new hair follicles.
                </p>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="section-py bg-cream">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark mb-4">
            Loved by 10,000+ Happy Women
          </h2>
          <p className="font-body text-text-muted max-w-lg mx-auto mb-16">
            Real stories of transformation, without hormonal pills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Ananya R."
              condition="PCOS (3 Years)"
              result="Cycle Regulated"
              quote="I was put on contraceptive pills which made me depressed. Dr. Priya changed my diet and gave me natural herbs. My periods are now regular on the dot, and my bloating is completely gone."
            />
            <TestimonialCard
              name="Preeti M."
              condition="PCOD + Weight Gain"
              result="Lost 8kg in 4 months"
              quote="I was gaining weight rapidly and felt tired all day. Following seed cycling and the Kapha diet recommended by the doctor, I lost 8kgs and feel so energetic."
            />
            <TestimonialCard
              name="Sneha K."
              condition="PCOS Hair Thinning"
              result="New Hair Growth"
              quote="My scalp was visible due to heavy hair fall. Within 3 months of the Ayurvedic scalp oil and supplements, the shedding stopped and I can see tiny baby hair growing back!"
            />
          </div>
        </div>
      </section>

      {/* SECTION 7: PLANS & PRICING */}
      <section className="section-py bg-cream-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-text-muted max-w-lg mx-auto mb-16">
            All plans include herbal medicines, personalized diet charts, doctor consultation, and WhatsApp check-ins.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* 1 Month */}
            <div className="bg-cream-white border border-border-light rounded-2xl p-8 flex flex-col justify-between hover:shadow transition-shadow duration-300">
              <div className="text-left flex flex-col gap-4">
                <h3 className="font-body text-lg font-bold text-text-primary">1-Month Kickstart</h3>
                <p className="font-body text-xs text-text-muted">Best for body detox and testing out the diet response.</p>
                <div className="my-4">
                  <span className="font-display text-3xl font-extrabold text-text-primary">₹4,500</span>
                  <span className="font-body text-xs text-text-muted"> / month</span>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-border-light text-left text-sm text-text-primary">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> 1 Doctor Consultation</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> 1 Month Herbal Medicines</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Basic Diet Chart</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Email Support</li>
                </ul>
              </div>
              <Button variant="outline" size="md" onClick={scrollToForm} className="w-full font-body mt-8">
                Get Started
              </Button>
            </div>

            {/* 3 Month - RECOMMENDED */}
            <div className="bg-cream-white border-2 border-terracotta rounded-2xl p-8 flex flex-col justify-between shadow-md relative scale-105">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-terracotta text-white font-body text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommended
              </span>
              <div className="text-left flex flex-col gap-4">
                <h3 className="font-body text-lg font-bold text-text-primary">3-Month Balance Plan</h3>
                <p className="font-body text-xs text-text-muted">Best for regulating periods, clearing acne and triggers fat loss.</p>
                <div className="my-4">
                  <span className="font-display text-3xl font-extrabold text-text-primary">₹9,000</span>
                  <span className="font-body text-xs text-text-muted"> (₹3,000/mo)</span>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-border-light text-left text-sm text-text-primary">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-terracotta" /> 3 Doctor Consultations</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-terracotta" /> 3 Months Herbal Medicines</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-terracotta" /> Seed Cycling & Diet Chart</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-terracotta" /> Personal WhatsApp Support</li>
                </ul>
              </div>
              <Button variant="primary" size="md" onClick={scrollToForm} className="w-full font-body mt-8">
                Choose Recommended
              </Button>
            </div>

            {/* 6 Month */}
            <div className="bg-cream-white border border-border-light rounded-2xl p-8 flex flex-col justify-between hover:shadow transition-shadow duration-300">
              <div className="text-left flex flex-col gap-4">
                <h3 className="font-body text-lg font-bold text-text-primary">6-Month Transformation</h3>
                <p className="font-body text-xs text-text-muted">Best for severe long-term PCOS, cyst reduction & hair regrowth.</p>
                <div className="my-4">
                  <span className="font-display text-3xl font-extrabold text-text-primary">₹15,000</span>
                  <span className="font-body text-xs text-text-muted"> (₹2,500/mo)</span>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-border-light text-left text-sm text-text-primary">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Unlimited Doctor Consultations</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> 6 Months Herbal Medicines</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> Comprehensive Lifestyle Plan</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> 24/7 Priority WhatsApp</li>
                </ul>
              </div>
              <Button variant="outline" size="md" onClick={scrollToForm} className="w-full font-body mt-8">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LEAD FORM */}
      <section id="lead-form-section" className="section-py bg-sage-dark text-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4 text-left">
            <span className="bg-white/10 text-white font-body text-xs font-bold px-3 py-1 rounded-full uppercase">
              Start Today
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              Start your healing journey today
            </h2>
            <p className="font-body text-sm md:text-base text-cream/80 leading-relaxed">
              Don&apos;t wait for symptoms to worsen. Book your free clinical assessment and let a certified Ayurvedic doctor review your reports.
            </p>
            <div className="flex flex-col gap-3 mt-4 text-sm text-cream/90">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-terracotta-light" />
                <span>10-Minute Clinical Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-terracotta-light" />
                <span>Free Call Slot Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-terracotta-light" />
                <span>100% Private & Certified Doctors</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-7">
            <LeadForm variant="full" />
          </div>
        </div>
      </section>

      {/* SECTION 9: BLOG PREVIEW */}
      {blogs.length > 0 && (
        <section className="section-py bg-cream-white">
          <div className="container-custom text-center">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <div className="text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark">
                  Latest Wellness Articles
                </h2>
                <p className="font-body text-text-muted mt-1">
                  Doctor-verified guides on managing cycle imbalances, skin and weight.
                </p>
              </div>
              <Link href="/blog" className="font-body text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors flex items-center gap-1.5 group select-none">
                Read More Articles
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: FAQ */}
      <section className="section-py bg-cream">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-4 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-cream-white rounded-2xl border border-border-light overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-body font-bold text-base text-text-primary pr-4">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-sage flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-text-muted flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 font-body text-sm text-text-muted leading-relaxed border-t border-border-light/40 animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
