'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Heart } from 'lucide-react';
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
  const [likedPhotos, setLikedPhotos] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedPhotos') || '[]');
    setLikedPhotos(savedLikes);

    async function fetchPhotos() {
      try {
        const res = await fetch('/api/photos');
        const data = await res.json();

        if (data.success) {
          const uploadedPhotos = data.photos.map((photo) => ({
            _id: photo._id,
            title: photo.category,
            cat: photo.category,
            img: photo.imageUrl,
            likes: photo.likes || 0,
          }));

          setItems([...uploadedPhotos, ...gallery]);
        }
      } catch (error) {
        console.error('Gallery photos fetch error:', error);
      }
    }

    fetchPhotos();
  }, []);

  async function handleLike(e, photoId) {
    e.stopPropagation();

    const isAlreadyLiked = likedPhotos.includes(photoId);

    const updatedLikedPhotos = isAlreadyLiked
      ? likedPhotos.filter((id) => id !== photoId)
      : [...likedPhotos, photoId];

    setLikedPhotos(updatedLikedPhotos);

    setItems((prev) =>
      prev.map((item) =>
        item._id === photoId
          ? {
              ...item,
              likes: isAlreadyLiked
                ? Math.max((item.likes || 1) - 1, 0)
                : (item.likes || 0) + 1,
            }
          : item
      )
    );

    localStorage.setItem('likedPhotos', JSON.stringify(updatedLikedPhotos));

    try {
      const res = await fetch(`/api/photos/${photoId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isAlreadyLiked ? 'unlike' : 'like' }),
      });

      const data = await res.json();

      if (!data.success) {
        console.error('Like update failed');
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  }

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
          {filteredItems.map((item, i) => {
            const isLiked = item._id && likedPhotos.includes(item._id);

            return (
              <div
                key={`${item.img}-${i}`}
                onClick={() => setActive(item)}
                className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl bg-[#e8ded0] shadow-md sm:rounded-2xl"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  unoptimized
                  priority={i < 8}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {item._id && (
                  <button
                    onClick={(e) => handleLike(e, item._id)}
                    className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/90 backdrop-blur-md transition active:scale-125 ${
                      isLiked
                        ? 'bg-white text-red-500'
                        : 'bg-black/20 text-white hover:bg-white hover:text-red-500'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isLiked ? 'currentColor' : 'none'}
                      strokeWidth={2.4}
                    />
                  </button>
                )}
              </div>
            );
          })}
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
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}