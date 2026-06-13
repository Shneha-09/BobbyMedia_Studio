import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata = {
  title: 'Gallery | Bobby Media Photo Studio',
};

export default function Gallery() {
  return (
    <main>
      <PageHero
        title="Gallery"
        subtitle="Premium masonry portfolio with category filters."
      />

      <section className="section-pad">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        © Bobby Media Photo Studio
      </footer>
    </main>
  );
}