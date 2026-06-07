'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles, Check } from 'lucide-react';

const events = [
  'Wedding',
  'Birthday',
  'Other Events',
  'Outdoor Photoshoot',
  'Other Photo Services',
];

const weddings = [
  'Hindu Wedding',
  'Christian Wedding',
  'Muslim Wedding',
  'Other Wedding Types',
];

const budgets = [
  '₹15,000',
  '₹20,000',
  '₹25,000',
  '₹50,000',
  'Custom Budget',
];

export default function QuotePopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    eventCategory: '',
    weddingType: '',
    priceCategory: '',
    customBudget: '',
    name: '',
    mobile: '',
    email: '',
  });

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, []);

  function choose(key, value) {
    setForm((f) => ({ ...f, [key]: value }));

    if (key === 'eventCategory') {
      setStep(value === 'Wedding' ? 2 : 3);
    }

    if (key === 'weddingType') {
      setStep(3);
    }

    if (key === 'priceCategory') {
      setStep(4);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setSuccess('');

    if (!form.name || !form.mobile || !form.email) {
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
      setTimeout(() => setOpen(false), 1500);
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

              <p className="mt-3 max-w-md text-sm leading-6 text-[#6b625a]">
                Choose your event type and budget. Our team will contact you
                with the best package.
              </p>
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
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left text-base font-semibold text-[#1f1a17] shadow-sm transition hover:-translate-y-1 hover:border-[#b89b63] hover:bg-[#fff8ed]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {weddings.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('weddingType', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left text-base font-semibold text-[#1f1a17] shadow-sm transition hover:-translate-y-1 hover:border-[#b89b63] hover:bg-[#fff8ed]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {budgets.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose('priceCategory', item)}
                    className="rounded-2xl border border-[#d8cbbd] bg-white p-5 text-left text-base font-semibold text-[#1f1a17] shadow-sm transition hover:-translate-y-1 hover:border-[#b89b63] hover:bg-[#fff8ed]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <form onSubmit={submit} className="space-y-4">
                {form.priceCategory === 'Custom Budget' && (
                  <input
                    className="input"
                    placeholder="Custom Budget"
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
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
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