import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import MotionWrap from '@/components/MotionWrap';
import Stats from '@/components/Stats';

export const metadata = {
  title: 'About | Bobby Media Photo Studio',
};

export default function About() {
  return (
    <main>
      <PageHero
        title="Our Studio Story"
        subtitle="Premium wedding and event memories crafted with passion."
        image="/images/about/abouthero.png"
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <MotionWrap>
            <SectionTitle
              eyebrow="About"
              title="Every frame should feel alive."
            />

            <p className="mt-6 text-sm leading-8 text-[#6b625a] sm:text-base">
              Bobby Media Photo Studio focuses on emotional storytelling,
              clean compositions and cinematic post-production for weddings,
              birthdays, outdoor shoots and events.
            </p>

            <p className="mt-6 text-sm leading-8 text-[#6b625a] sm:text-base">
              We believe every celebration deserves to be remembered
              beautifully. Our goal is to create timeless photographs and films
              that preserve genuine emotions for generations.
            </p>
          </MotionWrap>

          <MotionWrap>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-[280px] overflow-hidden rounded-[1.5rem] sm:h-[450px] sm:rounded-[2rem]">
                <Image
                  src="/images/about/mainabout.png"
                  alt="Studio"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative mt-8 h-[280px] overflow-hidden rounded-[1.5rem] sm:mt-12 sm:h-[450px] sm:rounded-[2rem]">
                <Image
                  src="/images/about/studio-2.jpg"
                  alt="Wedding"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </MotionWrap>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="container grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] sm:h-[500px] sm:rounded-[2rem]">
            <Image
              src="/images/about/about.png"
              alt="Bobby Media"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="glass rounded-[1.5rem] p-6 sm:rounded-[2rem] sm:p-10">
            <h3 className="serif text-4xl sm:text-5xl">Mission</h3>

            <p className="mt-5 text-sm leading-8 text-[#6b625a] sm:text-base">
              To deliver elegant, premium and memorable visuals for every
              client.
            </p>

            <h3 className="serif mt-10 text-4xl sm:text-5xl">Vision</h3>

            <p className="mt-5 text-sm leading-8 text-[#6b625a] sm:text-base">
              To become a trusted photography brand known for capturing
              beautiful life events with creativity and authenticity.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="container">
          <Stats />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d8cbb8] px-4 py-8 text-center text-sm text-[#6b625a]">
      © Bobby Media Photo Studio
    </footer>
  );
}