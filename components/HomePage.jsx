'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Camera, Phone, Heart, Video, Cake, Mountain, Plane } from 'lucide-react';
import Header from './Header';
import QuotePopup from './QuotePopup';
import MotionWrap from './MotionWrap';
import { gallery, services } from './data';

export default function HomePage() {
  return (
    <main className="bg-[#f8f5f1] text-[#1f1a17]">
      <Header />
      <QuotePopup />

      <section className="relative min-h-[90vh] overflow-hidden sm:min-h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex min-h-[90vh] items-center px-4 pt-24 sm:min-h-screen sm:px-6">
          <div className="container">
            <div className="max-w-3xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b06a] sm:text-xs sm:tracking-[0.35em]">
                Bobby Media Photo Studio
              </p>

              <h2 className="serif text-4xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
                Capturing Moments,
                <br />
                Creating Stories.
              </h2>

              <div className="my-6 h-[1px] w-16 bg-[#d4b06a]" />

              <p className="max-w-md text-sm leading-7 text-white/90 sm:text-base">
                Professional wedding photography, birthday events, outdoor
                photoshoots and cinematic storytelling crafted with elegance.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/gallery"
                  className="bg-white px-7 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#1f1a17]"
                >
                  View Portfolio
                </Link>

                <Link
                  href="/?quote=true"
                  className="border border-white px-7 py-4 text-center text-xs font-bold uppercase tracking-widest text-white"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <MotionWrap>
            <div className="relative h-[320px] overflow-hidden bg-[#e8ded0] sm:h-[420px]">
              <Image
                src="/images/about/studio-1.jpg"
                alt="About Bobby Media"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </MotionWrap>

          <MotionWrap delay={0.1}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#b89b63]">
              About Us
            </p>

            <h2 className="serif text-4xl leading-tight text-[#1f1a17] sm:text-6xl">
              We frame your celebrations with timeless emotion.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-8 text-[#6b625a]">
              Bobby Media Photo Studio creates premium photo and video stories
              for weddings, birthdays, outdoor shoots and special events with
              cinematic style and careful editing.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-block bg-[#1f1a17] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
            >
              More About Us
            </Link>
          </MotionWrap>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="container text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#b89b63]">
            Portfolio
          </p>

          <h2 className="serif text-4xl text-[#1f1a17] sm:text-6xl">
            Featured Work
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {gallery.slice(0, 5).map((item, index) => (
              <MotionWrap
                key={`${item.title}-${index}`}
                delay={index * 0.05}
                className="group relative aspect-[3/4] overflow-hidden bg-[#e8ded0]"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </MotionWrap>
            ))}
          </div>

          <Link
            href="/gallery"
            className="mt-10 inline-block bg-[#1f1a17] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
          >
            View Full Gallery
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="container text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#b89b63]">
            Services
          </p>

          <h2 className="serif text-4xl text-[#1f1a17] sm:text-6xl">
            What We Offer
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Heart, title: 'Weddings' },
              { icon: Video, title: 'Cinematography' },
              { icon: Cake, title: 'Birthdays' },
              { icon: Mountain, title: 'Outdoor Shoots' },
              { icon: Plane, title: 'Drone Coverage' },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <MotionWrap
                  key={item.title}
                  delay={index * 0.05}
                  className="border-[#d8cbbd] px-4 sm:border-r sm:px-6 sm:last:border-r-0"
                >
                  <Icon className="mx-auto text-[#b89b63]" size={32} />

                  <h3 className="mt-5 text-sm font-bold uppercase tracking-widest text-[#1f1a17]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[#6b625a]">
                    Premium photography service crafted for beautiful memories.
                  </p>
                </MotionWrap>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <MotionWrap
              key={`${service.title}-${index}`}
              delay={index * 0.05}
              className="overflow-hidden bg-white shadow-sm"
            >
              <div className="relative h-[280px] overflow-hidden sm:h-[350px]">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="p-5 sm:p-7">
                <Camera className="text-[#b89b63]" />

                <h3 className="serif mt-5 text-2xl text-[#1f1a17] sm:text-3xl">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6b625a]">
                  {service.desc}
                </p>

                <p className="mt-4 font-bold text-[#b89b63]">
                  {service.price}
                </p>
              </div>
            </MotionWrap>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="container relative overflow-hidden px-6 py-16 text-white sm:px-8 sm:py-20">
          <Image
            src="/images/connect/letsconnect.png"
            alt="Book Bobby Media"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="serif text-4xl sm:text-6xl">
              Let’s Capture Something Beautiful
            </h2>

            <p className="mt-4 text-sm text-white/80">
              Have a project in mind? We’d love to hear from you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/?quote=true"
                className="bg-white px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#1f1a17]"
              >
                Get In Touch
              </Link>

              <a
                href="tel:+918148645508"
                className="inline-flex items-center justify-center gap-2 border border-white/40 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#ded3c4] bg-[#f8f5f1] px-4 py-10 text-center sm:px-6">
      <h3 className="serif text-3xl tracking-widest text-[#1f1a17]">
        Bobby Media
      </h3>

      <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#b89b63]">
        Photo Studio
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6b625a] sm:gap-6">
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <p className="mt-8 text-xs text-[#8a8178]">
        © {new Date().getFullYear()} Bobby Media Photo Studio. All rights
        reserved.
      </p>
    </footer>
  );
}