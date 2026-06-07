'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import { Camera, MapPin, MessageCircle, Phone } from 'lucide-react';

export default function Contact() {
  const [f, setF] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });

  const map = process.env.NEXT_PUBLIC_MAP_URL;
  const insta = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918148645508';

  async function submit(e) {
    e.preventDefault();

    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, eventCategory: 'Contact Form' }),
    });

    alert(res.ok ? 'Message sent successfully' : 'Please try again');
  }

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Reach us for bookings, packages and event enquiries."
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={submit}
            className="glass space-y-4 rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8"
          >
            <input
              className="input"
              placeholder="Name"
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
            />

            <input
              className="input"
              placeholder="Mobile"
              value={f.mobile}
              onChange={(e) => setF({ ...f, mobile: e.target.value })}
            />

            <input
              className="input"
              placeholder="Email"
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
            />

            <textarea
              className="input min-h-32 resize-none"
              placeholder="Message"
              value={f.message}
              onChange={(e) => setF({ ...f, message: e.target.value })}
            />

            <button className="btn-gold w-full rounded-2xl py-4">
              Send Message
            </button>
          </form>

          <div className="glass rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#b89b63]">
              Connect
            </p>

            <h2 className="serif text-4xl text-[#1f1a17] sm:text-5xl">
              Connect With Us
            </h2>

            <div className="mt-8 grid gap-4">
              <a
                href={map}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[#d8cbbd] bg-white p-4 text-[#1f1a17] transition hover:border-[#b89b63]"
              >
                <MapPin className="text-[#C9A84C]" />
                Google Map
              </a>

              <a
                href={insta}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[#d8cbbd] bg-white p-4 text-[#1f1a17] transition hover:border-[#b89b63]"
              >
                <Camera className="text-[#C9A84C]" />
                Instagram
              </a>

              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[#d8cbbd] bg-white p-4 text-[#1f1a17] transition hover:border-[#b89b63]"
              >
                <MessageCircle className="text-[#C9A84C]" />
                WhatsApp
              </a>

              <a
                href="tel:+918148645508"
                className="flex items-center gap-3 rounded-2xl border border-[#d8cbbd] bg-white p-4 text-[#1f1a17] transition hover:border-[#b89b63]"
              >
                <Phone className="text-[#C9A84C]" />
                Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}