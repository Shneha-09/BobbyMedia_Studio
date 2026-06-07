'use client';

import Header from './Header';
import Image from 'next/image';

export default function PageHero({
  title,
  subtitle,
  image = '/images/about/about.png'
}) {
  return (
    <>
      <Header />

      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-28">

        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover object-[center_20%]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[.5em] text-[#C9A84C]">
            Bobby Media Photo Studio
          </p>

          <h1 className="lux-title text-5xl text-white sm:text-7xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/90">
              {subtitle}
            </p>
          )}
        </div>

      </section>
    </>
  );
}