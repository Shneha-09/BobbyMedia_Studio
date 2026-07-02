'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/featured/work1.jpg',
  '/images/featured/work2.jpg',
  '/images/featured/work3.jpg',
  '/images/featured/work7.jpg',
];

export default function FeaturedWorksSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f8f5f1] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#b89b63]">
          Portfolio
        </p>

        <h2 className="serif text-4xl text-[#1f1a17] sm:text-6xl">
          Featured Work
        </h2>

        <div className="relative mx-auto mt-10 h-[350px] max-w-4xl overflow-hidden rounded-[2rem] bg-black sm:h-[500px]">
          {images.map((image, index) => (
            <Image
              key={`featured-${index}`}
              src={image}
              alt={`Bobby Media Featured Work ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-opacity duration-1000 ${
                active === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setActive(index)}
                className={`h-3 w-3 rounded-full transition ${
                  active === index
                    ? 'bg-[#d4b06a]'
                    : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}