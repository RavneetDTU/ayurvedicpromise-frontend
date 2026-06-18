import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'About Our Mission',
  description: 'Learn about Ayurvedic Promise, our values, our personalized 4-fold method, and our leading Ayurvedic physician, Dr. Priya Sharma.',
};

export default function AboutPage() {
  const values = [
    {
      title: '100% Natural & Safe',
      description: 'Our herbs are pure, heavy-metal tested, FDA-approved, and organic. Zero chemical hormones.',
      icon: Leaf,
    },
    {
      title: 'Doctor-Backed Clinical Care',
      description: 'Every customized plan is formulated and overseen by experienced BAMS doctors, not bots.',
      icon: Award,
    },
    {
      title: 'Personalized to Your Prakriti',
      description: 'Ayurveda knows no single prescription. We analyze your metabolic type (Prakriti) before recommending plans.',
      icon: Heart,
    },
    {
      title: 'Honest & Transparent',
      description: 'We set realistic targets. No false promises of 5-day cures. True healing takes consistent daily alignment.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-cream-white min-h-screen">
      {/* SECTION 1: Brand Story */}
      <section className="section-py bg-cream relative overflow-hidden">
        <div className="container-custom max-w-4xl text-center flex flex-col items-center gap-6">
          <span className="bg-sage/10 text-sage-dark font-body text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Our Roots & Vision
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Redefining Women&apos;s Ovarian Health, Naturally
          </h1>
          <p className="font-body text-lg text-text-muted leading-relaxed mt-2">
            Ayurvedic Promise was born out of a simple observation: millions of young Indian women are diagnosed with PCOS/PCOD and immediately put on oral contraceptive pills. These pills mask symptoms temporarily while introducing side effects like mood swings, weight gain, and insulin resistance.
          </p>
          <p className="font-body text-base text-text-muted leading-relaxed max-w-3xl">
            We set out to create a warm, doctor-backed, and holistic alternative. By merging ancient Ayurvedic wisdom with modern clinical supervision, we address the root metabolic imbalances to stimulate natural ovulation and bring the body back into harmony.
          </p>
        </div>
      </section>

      {/* SECTION 2: Doctor Profile */}
      <section className="section-py bg-cream-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-dark shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop"
              alt="Dr. Priya Sharma BAMS"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 40vw"
            />
          </div>
          {/* Bio */}
          <div className="md:col-span-7 flex flex-col items-start gap-4 text-left">
            <span className="bg-terracotta/10 text-terracotta font-body text-xs font-bold px-3 py-1 rounded-full uppercase">
              Our Medical Director
            </span>
            <h2 className="font-display text-3xl font-bold text-sage-dark">
              Dr. Priya Sharma
            </h2>
            <p className="font-body text-sm font-semibold text-text-muted -mt-2">
              Bachelor of Ayurvedic Medicine & Surgery (BAMS) · Senior Gynecological Advisor
            </p>
            <p className="font-body text-base text-text-primary leading-relaxed mt-2">
              Dr. Priya Sharma is a highly respected Ayurvedic physician with over 12 years of experience specializing in female endocrine wellness and ovarian disorders. She graduated from one of India&apos;s premier government Ayurvedic colleges and has since treated over 10,000 women suffering from irregular cycles, hirsutism, and insulin resistance.
            </p>
            <p className="font-body text-base text-text-primary leading-relaxed">
              Her clinical approach balances ancient pulse diagnosis (Nadi Pariksha) with modern hormonal panel tests, creating a bridge between traditional wisdom and empirical results.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Method */}
      <section className="section-py bg-cream">
        <div className="container-custom text-center">
          <span className="bg-sage/10 text-sage-dark font-body text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">
            The 4-Fold Approach
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark mb-4">
            How We Heal PCOS Root Causes
          </h2>
          <p className="font-body text-text-muted max-w-lg mx-auto mb-16">
            We do not believe in pills that act as quick band-aids. True hormonal recovery involves aligning four vital layers of your life:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-cream-white p-6 rounded-2xl border border-border-light shadow-sm text-left">
              <span className="font-display text-3xl font-extrabold text-terracotta mb-3 block">01</span>
              <h3 className="font-body text-base font-bold text-text-primary mb-2">Targeted Herbs</h3>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Custom formulations like Shatavari, Ashoka, and Lodhra to regulate cycles, reduce ovarian cyst load, and clear insulin pathways.
              </p>
            </div>
            
            <div className="bg-cream-white p-6 rounded-2xl border border-border-light shadow-sm text-left">
              <span className="font-display text-3xl font-extrabold text-terracotta mb-3 block">02</span>
              <h3 className="font-body text-base font-bold text-text-primary mb-2">Anti-Inflammatory Diet</h3>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Prakriti-specific food blueprints incorporating seed cycling to naturally stimulate progesterone production and clear toxic Ama.
              </p>
            </div>

            <div className="bg-cream-white p-6 rounded-2xl border border-border-light shadow-sm text-left">
              <span className="font-display text-3xl font-extrabold text-terracotta mb-3 block">03</span>
              <h3 className="font-body text-base font-bold text-text-primary mb-2">Metabolic Movement</h3>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Gentle, stress-reducing yoga flows (like Supta Baddha Konasana) and aerobic exercise to improve cellular insulin sensitivity.
              </p>
            </div>

            <div className="bg-cream-white p-6 rounded-2xl border border-border-light shadow-sm text-left">
              <span className="font-display text-3xl font-extrabold text-terracotta mb-3 block">04</span>
              <h3 className="font-body text-base font-bold text-text-primary mb-2">Doctor Coaching</h3>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Regular one-on-one checks, progress tracking, and dose optimization to keep you motivated and supported throughout your plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Values */}
      <section className="section-py bg-cream-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-dark mb-12">
            The Promises We Keep
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="flex gap-4 items-start text-left p-6 rounded-2xl bg-cream-white border border-border-light hover:shadow-sm transition-all duration-300">
                  <div className="p-3 bg-sage/10 text-sage rounded-2xl flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-body text-base font-bold text-text-primary mb-1.5">
                      {val.title}
                    </h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-sage-dark text-white text-center">
        <div className="container-custom max-w-2xl flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Ready to reclaim your hormone health?
          </h2>
          <p className="font-body text-sm md:text-base text-cream/80 max-w-lg leading-relaxed">
            Get your body constitution analyzed and consult with Dr. Priya Sharma on the most suitable herbs for your symptoms.
          </p>
          <Link href="/consult">
            <Button variant="primary" size="lg" className="bg-terracotta text-white hover:bg-terracotta-dark">
              Book Free Doctor Call
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
