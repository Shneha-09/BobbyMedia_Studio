'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles, Check } from 'lucide-react';

const events = [
  'Wedding',
  'Baby Shower',
  'Birthday Party',
  'Outdoor',
  'Baby Shoot',
];

const weddingTypes = [
  'Hindu Wedding',
  'Christian Wedding',
  'Muslim Wedding',
  'Destination Wedding',
];

const ceremonyTypes = [
  'Flowering Ceremony',
  'Engagement Ceremony',
  'Wedding & Reception',
  'Above All',
];

const destinationDays = ['Two Days', 'Three Days', 'Four Days'];

const normalBudgets = [
  '₹25,000',
  '₹35,000',
  '₹50,000',
  '₹65,000',
  'Custom Budget',
];

const fullWeddingBudgets = [
  '₹50,000',
  '₹85,000',
  '₹1.2L+',
  '₹1.5L+',
  'Custom Budget',
];

const destinationBudgets = [
  'Below ₹2L',
  'Below ₹2.5L',
  'Below ₹3L',
  'Below ₹3.5L',
  'Custom Budget',
];

const otherEventBudgets = [
  '₹15,000',
  '₹25,000',
  '₹35,000',
  '₹50,000',
  'Custom Budget',
];

export default function QuotePopup({ open, setOpen }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    eventCategory: '',
    weddingType: '',
    ceremonyType: '',
    destinationDays: '',
    priceCategory: '',
    customBudget: '',
    eventDate: '',
    name: '',
    mobile: '',
    email: '',
  });

function getBudgets() {
  // Destination Wedding
  if (form.weddingType === 'Destination Wedding') {
    return destinationBudgets;
  }

  // Above All uses full wedding package
  if (form.ceremonyType === 'Above All') {
    return fullWeddingBudgets;
  }

  // Wedding & Reception uses full wedding package
  if (form.ceremonyType === 'Wedding & Reception') {
    return fullWeddingBudgets;
  }

  // Normal wedding packages
  if (form.eventCategory === 'Wedding') {
    return normalBudgets;
  }

  // Baby Shoot / Outdoor / Birthday / Baby Shower
  return otherEventBudgets;
}

  function choose(key, value) {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));

  switch (key) {
    case 'eventCategory':
      if (value === 'Wedding') {
        setStep(2); // Religion
      } else {
        setStep(4); // Budget
      }
      break;

    case 'weddingType':
      if (value === 'Destination Wedding') {
        setStep(6); // Days
      } else {
        setStep(3); // Ceremony
      }
      break;

    case 'ceremonyType':
      setStep(4); // Budget
      break;

    case 'destinationDays':
      setStep(4); // Budget
      break;

    case 'priceCategory':
      setStep(5); // Contact Form
      break;

    default:
      break;
  }
}
  async function submit(e) {
    e.preventDefault();
    setSuccess('');

  if (
    !form.eventDate ||
    !form.name ||
    !form.mobile ||
    !form.email
  ) {
    return alert('Please fill all required fields');
  }

    setLoading(true);

    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess('Thank you! We will contact you soon.');

      const whatsappNumber = '919487025305';

      const message = `
New Quote Enquiry

Name: ${form.name}
Mobile: ${form.mobile}
Email: ${form.email}
Event: ${form.eventCategory}
Wedding Type: ${form.weddingType || '-'}
Ceremony Type: ${form.ceremonyType || '-'}
Destination Days: ${form.destinationDays || '-'}
Event Date: ${form.eventDate}
Budget: ${form.priceCategory}
Custom Budget: ${form.customBudget || '-'}
      `;

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank'
      );

      setTimeout(() => {
  setOpen(false);
  setStep(1);

  setForm({
    eventCategory: '',
    weddingType: '',
    ceremonyType: '',
    destinationDays: '',
    priceCategory: '',
    customBudget: '',
    eventDate: '',
    name: '',
    mobile: '',
    email: '',
  });
}, 1500);
    } else {
      alert((await res.json()).error || 'Something went wrong');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, y: 25, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-[#d8cbbd] bg-[#f8f5f1]/95 p-6 text-[#1f1a17] shadow-2xl sm:p-9"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#1f1a17]/10 text-[#1f1a17] transition hover:bg-[#1f1a17] hover:text-white"
            >
              <X size={18} />
            </button>

            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mb-5 flex items-center gap-1 text-sm font-semibold text-[#b89b63]"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}

            <div className="mb-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#b89b63]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b89b63]">
                <Sparkles size={14} />
                Get Quote
              </div>

              <h2 className="serif text-4xl italic leading-tight sm:text-5xl">
                Plan your event
              </h2>
            </div>

            {success && (
              <p className="mb-5 flex items-center gap-2 rounded-2xl bg-green-100 p-4 text-sm font-semibold text-green-700">
                <Check size={18} />
                {success}
              </p>
            )}

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {events.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('eventCategory', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left font-semibold shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {weddingTypes.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('weddingType', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left font-semibold shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {ceremonyTypes.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('ceremonyType', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left font-semibold shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 6 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {destinationDays.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('destinationDays', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left font-semibold shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {getBudgets().map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('priceCategory', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left font-semibold shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 5 && (
              <form onSubmit={submit} className="space-y-4">

                {/* Event Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111]">
                    Event Date
                  </label>

                  <input
                    type="date"
                    value={form.eventDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) =>
                      setForm({ ...form, eventDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#d8cbbd] bg-white px-4 py-3 outline-none"
                  />
                </div>

                {/* Custom Budget */}
                {form.priceCategory === 'Custom Budget' && (
                  <input
                    className="input"
                    placeholder="Enter Your Budget"
                    value={form.customBudget}
                    onChange={(e) =>
                      setForm({ ...form, customBudget: e.target.value })
                    }
                  />
                )}

                <input
                  className="input"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  className="input"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({ ...form, mobile: e.target.value })
                  }
                />

                <input
                  className="input"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <button
                  disabled={loading}
                  className="btn-gold w-full rounded-2xl py-4 text-sm uppercase tracking-widest"
                >
                  {loading ? 'Saving...' : 'Get Quote'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}