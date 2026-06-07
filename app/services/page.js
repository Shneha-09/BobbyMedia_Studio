import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import MotionWrap from '@/components/MotionWrap';
import { services } from '@/components/data';

export const metadata = {
  title: 'Services | Bobby Media Photo Studio',
};

const features = [
  'Candid Coverage',
  'Creative Editing',
  'Premium Output',
  'Fast Delivery',
];

export default function Services() {
  const allServices = services;

  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Detailed photography and cinematography packages for every occasion."
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="container space-y-8 sm:space-y-10">
          {allServices.map((s, i) => (
            <MotionWrap
              key={s.title}
              className="glass overflow-hidden rounded-[1.5rem] lg:grid lg:grid-cols-2 lg:rounded-[2rem]"
            >
              <div
                className={`relative h-[280px] w-full overflow-hidden bg-[#f8f5f1] sm:h-[350px] lg:h-[450px] ${
                  i % 2 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 sm:p-4"
                />
              </div>

              <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                <p className="text-base font-semibold text-[#C9A84C] sm:text-lg">
                  {s.price}
                </p>

                <h2 className="serif mt-3 text-3xl text-[#1f1a17] sm:text-4xl lg:text-5xl">
                  {s.title}
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#6b625a] sm:text-base sm:leading-8">
                  {s.desc}
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="text-sm text-[#6b625a]">
                      ✓ {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/?quote=true"
                  className="btn-gold mt-8 inline-block w-full rounded-full px-8 py-4 text-center sm:w-fit"
                >
                  Get Quote
                </Link>
              </div>
            </MotionWrap>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#d8cbbd] px-4 py-8 text-center text-sm text-[#6b625a]">
        © Bobby Media Photo Studio
      </footer>
    </main>
  );
}