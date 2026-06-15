'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { gallery } from './data';

const cats = [
  'All',
  'Wedding',
  'Wedding Cinematography',
  'Birthday Photography',
  'Outdoor Photoshoot',
  'Fashion',
  'Puberty',
  'Baby Shower',
  'Album Design',
  'Other Photo Services',
];

export default function GalleryGrid() {
  const [cat, setCat] = useState('All');
  const [active, setActive] = useState(null);
  const [items, setItems] = useState(gallery);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch('/api/photos');
        const data = await res.json();

        if (data.success) {
          const uploadedPhotos = data.photos.map((photo) => ({
            title: photo.category,
            cat: photo.category,
            img: photo.imageUrl,
          }));

          setItems([...uploadedPhotos, ...gallery]);
        }
      } catch (error) {
        console.error('Gallery photos fetch error:', error);
      }
    }

    fetchPhotos();
  }, []);

  const filteredItems =
    cat === 'All' ? items : items.filter((item) => item.cat === cat);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-3 px-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              cat === c
                ? 'bg-[#C9A84C] text-black'
                : 'border border-[#d8cbb8] text-black hover:bg-[#C9A84C] hover:text-black'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {filteredItems.map((item, i) => (
            <button
              key={`${item.img}-${i}`}
              onClick={() => setActive(item)}
              className="group w-full overflow-hidden rounded-xl bg-white shadow-md sm:rounded-2xl"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

             
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image
              src={active.img}
              alt={active.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}