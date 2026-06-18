'use client';

import React, { useState } from 'react';
import { submitLead } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LeadFormProps {
  variant?: 'full' | 'inline';
}

const SYMPTOM_OPTIONS = [
  'Weight Gain',
  'Hair Fall',
  'Irregular Periods',
  'Fatigue',
  'Adult Acne',
  'Facial Hair',
  'Infertility',
  'Other',
];

export const LeadForm: React.FC<LeadFormProps> = ({ variant = 'full' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Validation
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone); // 10-digit Indian mobile starting with 6-9
  const isNameValid = name.trim().length >= 2;
  const isSymptomValid = selectedSymptoms.length >= 1;
  const isAgeValid = variant === 'full' && age ? (parseInt(age) >= 18 && parseInt(age) <= 60) : true;
  
  const isFormValid = isNameValid && isPhoneValid && isSymptomValid && isAgeValid;

  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Map symptoms to single comma-separated string required by the API
      const symptomString = selectedSymptoms.join(', ');
      
      // Combine age and city into message field for backend preservation
      let combinedMessage = '';
      if (variant === 'full') {
        const parts = [];
        if (age) parts.push(`Age: ${age}`);
        if (city) parts.push(`City: ${city}`);
        combinedMessage = parts.join(' | ');
      }

      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        symptom: symptomString,
        message: combinedMessage || 'Lead Form Submission',
        source: typeof window !== 'undefined' ? window.location.pathname : 'homepage',
      });

      setIsSuccess(true);
      // Reset form
      setName('');
      setPhone('');
      setAge('');
      setCity('');
      setSelectedSymptoms([]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again or WhatsApp us.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-border-light shadow-sm max-w-lg mx-auto my-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
          Consultation Booked!
        </h3>
        <p className="font-body text-text-muted mb-6">
          Thank you for choosing Ayurvedic Promise. Our team will call you within 24 hours.
        </p>
        <a
          href="https://wa.me/919999999999?text=Hi%2C%20I%20just%20submitted%20my%20symptoms%20on%20your%20website.%20I%27d%20like%20to%20connect%20with%20a%20doctor."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#25D366] text-white rounded-full px-6 py-3 font-body font-semibold hover:bg-[#20ba59] transition-all"
        >
          Chat with us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl p-6 md:p-8 border border-border-light shadow-sm max-w-xl mx-auto my-4 flex flex-col gap-6 text-left`}
    >
      <div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-1">
          {variant === 'full' ? 'Book a Free Consultation' : 'Struggling with PCOS?'}
        </h3>
        <p className="font-body text-sm text-text-muted">
          {variant === 'full' 
            ? 'Fill in your details below and a doctor will call you to discuss your plan.' 
            : 'Get your personalized doctor-backed Ayurvedic plan today.'}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Name Input */}
        <Input
          label="Your Name *"
          id="lead-name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Phone Input */}
        <Input
          label="Indian Phone Number *"
          id="lead-phone"
          type="tel"
          placeholder="10-digit mobile number (e.g. 9876543210)"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          error={phone && !isPhoneValid ? 'Please enter a valid 10-digit Indian mobile number.' : undefined}
          required
        />

        {/* Age and City (Full Layout Only) */}
        {variant === 'full' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Age (Optional)"
              id="lead-age"
              type="number"
              placeholder="Your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              error={age && !isAgeValid ? 'Must be between 18 and 60 years old.' : undefined}
            />
            <Input
              label="City (Optional)"
              id="lead-city"
              placeholder="Your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        )}

        {/* Symptoms Checkbox Group */}
        <div className="flex flex-col gap-2">
          <label className="font-body text-sm font-medium text-text-primary">
            Select Your Symptoms (Select at least 1) *
          </label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {SYMPTOM_OPTIONS.map((symptom) => {
              const isChecked = selectedSymptoms.includes(symptom);
              return (
                <label
                  key={symptom}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    isChecked
                      ? 'border-terracotta bg-terracotta/5 text-text-primary font-medium'
                      : 'border-border-light hover:bg-cream-white text-text-muted'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSymptomChange(symptom)}
                    className="accent-terracotta h-4 w-4"
                  />
                  <span className="font-body text-sm leading-none">{symptom}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 text-sm font-body rounded-xl border border-red-100">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        disabled={!isFormValid}
        className="w-full font-body font-semibold mt-2"
      >
        Submit Symptoms & Book Consultation
      </Button>
    </form>
  );
};
