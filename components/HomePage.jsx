'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Phone } from 'lucide-react';
import Header from './Header';
import QuotePopup from './QuotePopup';
import SectionTitle from './SectionTitle';
import MotionWrap from './MotionWrap';
import { gallery, services, why, testimonials } from './data';

export default function HomePage() {
  return (
    <main>
      <Header />
      <QuotePopup />

      <section className="hero-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-6xl text-center"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[.55em] text-[#C9A84C]">
            Luxury Photography Studio
          </p>

          <h1 className="lux-title text-5xl text-white sm:text-7xl lg:text-8xl">
            Capture Your Beautiful Moments With{' '}
            <span className="gold-text">Bobby Media</span> Photo Studio
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-300 sm:text-xl">
            Professional Wedding Photography, Birthday Events, Outdoor
            Photoshoots & Cinematic Storytelling.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/?quote=true" className="btn-gold rounded-full px-8 py-4">
              Get Quote
            </Link>

            <Link
              href="/gallery"
              className="rounded-full border border-white/15 px-8 py-4 font-bold hover:border-[#C9A84C]"
            >
              View Gallery
            </Link>
          </div>

          <div className="mx-auto mt-16 h-12 w-7 rounded-full border border-white/20 p-1">
            <div className="mx-auto h-2 w-2 animate-bounce rounded-full bg-[#C9A84C]" />
          </div>
        </motion.div>
      </section>

      <section className="section-pad">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <MotionWrap>
            <SectionTitle
              eyebrow="About Studio"
              title="We frame your celebrations with timeless emotion."
            />
            <p className="mt-6 leading-8 text-zinc-300">
              Bobby Media Photo Studio creates premium photo and video stories
              for weddings, birthdays, outdoor shoots and special events with
              cinematic style and careful editing.
            </p>
            <Link href="/about" className="btn-gold mt-8 inline-block rounded-full px-7 py-3">
              Learn More
            </Link>
          </MotionWrap>

          <div className="grid gap-4 sm:grid-cols-2">
            <MotionWrap className="relative h-80 overflow-hidden rounded-[2rem]">
              <Image src={gallery[0].img} alt="About image" fill className="object-cover" />
            </MotionWrap>

            <MotionWrap
              delay={0.1}
              className="relative mt-0 h-80 overflow-hidden rounded-[2rem] sm:mt-12"
            >
              <Image src={gallery[1].img} alt="Studio image" fill className="object-cover" />
            </MotionWrap>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/[.03]">
        <div className="container">
          <SectionTitle center eyebrow="Services" title="Premium photography services" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <MotionWrap
                key={`${s.title}-${i}`}
                delay={i * 0.05}
                className="group glass overflow-hidden rounded-[2rem]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <Camera className="text-[#C9A84C]" />
                  <h3 className="mt-4 text-3xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{s.desc}</p>
                  <p className="mt-4 font-bold text-[#E8C97A]">{s.price}</p>
                  <Link
                    href="/?quote=true"
                    className="mt-5 inline-block rounded-full border border-white/15 px-5 py-2 text-sm"
                  >
                    Get Quote
                  </Link>
                </div>
              </MotionWrap>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionTitle center eyebrow="Why Choose Us" title="Designed for premium memories" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <MotionWrap
                key={`${w}-${i}`}
                delay={i * 0.05}
                className="glass rounded-3xl p-6 text-center"
              >
                <h3 className="text-3xl">{w}</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Luxury quality, smooth process and professional delivery.
                </p>
              </MotionWrap>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/[.03]">
        <div className="container">
          <SectionTitle center eyebrow="Featured Gallery" title="Selected visual stories" />

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.slice(0, 6).map((g, i) => (
              <MotionWrap
                key={`${g.title}-${i}`}
                delay={i * 0.05}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-[2rem] bg-zinc-900"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={g.img}
                    alt={g.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <p className="text-sm text-[#C9A84C]">{g.cat}</p>
                  <h3 className="text-2xl">{g.title}</h3>
                </div>
              </MotionWrap>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionTitle center eyebrow="Testimonials" title="Loved by our clients" />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <MotionWrap key={`${t.name}-${i}`} className="glass rounded-3xl p-6">
                <p className="text-[#E8C97A]">{'★'.repeat(t.stars)}</p>
                <p className="mt-4 leading-7 text-zinc-300">“{t.text}”</p>
                <p className="mt-5 font-bold">{t.name}</p>
              </MotionWrap>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container glass rounded-[2rem] p-8 text-center sm:p-12">
          <h2 className="lux-title text-4xl sm:text-6xl">
            Ready to book your event?
          </h2>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/?quote=true" className="btn-gold rounded-full px-8 py-4">
              Get Quote
            </Link>

            <a
              href="tel:+918148645508"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-bold"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-3xl">Bobby Media</h3>
          <p className="mt-3 text-sm text-zinc-400">
            Premium photography and event booking studio.
          </p>
        </div>

        <div>
          <h4 className="font-bold">Quick Links</h4>
          <div className="mt-3 space-y-2 text-sm text-zinc-400">
            <Link href="/about" className="block">
              About
            </Link>
            <Link href="/services" className="block">
              Services
            </Link>
            <Link href="/gallery" className="block">
              Gallery
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold">Services</h4>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Wedding, Birthday, Outdoor, Events, Drone, Albums
          </p>
        </div>

        <div>
          <h4 className="font-bold">Contact</h4>
          <a
            className="mt-3 block text-sm text-zinc-400"
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
          >
            Instagram
          </a>
          <a
            className="mt-2 block text-sm text-zinc-400"
            href={process.env.NEXT_PUBLIC_MAP_URL}
          >
            Google Map
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Bobby Media Photo Studio. All rights
        reserved.
      </p>
    </footer>
  );
}