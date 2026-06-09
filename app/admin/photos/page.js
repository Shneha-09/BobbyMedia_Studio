'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Folder, Plus, X } from 'lucide-react';

const categories = [
  'All',
  'Wedding',
  'Wedding Cinematography',
  'Birthday Photography',
  'Outdoor Photoshoot',
  'Event Photography',
  'Drone Photography',
  'Album Design',
  'Other Photo Services',
];

const photos = [
  { category: 'Birthday Photography', img: '/images/gallery/birthday.jpg' },
  { category: 'Wedding', img: '/images/gallery/bride.jpg' },
  { category: 'Outdoor Photoshoot', img: '/images/gallery/outdoor.jpg' },
  { category: 'Wedding Cinematography', img: '/images/gallery/wedding cine.jpg' },
  { category: 'Event Photography', img: '/images/gallery/event.jpg' },
  { category: 'Drone Photography', img: '/images/gallery/drone.jpg' },
  { category: 'Other Photo Services', img: '/images/gallery/other servies.jpg' },
];

export default function AdminPhotos() {
  const [active, setActive] = useState('All');
  const [showCategories, setShowCategories] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const filtered =
    active === 'All' ? photos : photos.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#07142a]">
      <div className="mx-auto max-w-7xl">
        <div className="relative border-b border-[#dfe3ea] pb-6">
          <div className="hidden md:block">
            <div className="absolute left-0 top-0">
              <Link
                href="/admin/dashboard"
                className="rounded-xl bg-white px-6 py-3 font-semibold shadow-sm"
              >
                ← Back
              </Link>
            </div>

            <h1 className="text-center text-3xl font-bold tracking-[0.45em]">
              PHOTOS
            </h1>

            <div className="absolute right-0 top-0 flex gap-3">
              <button
                onClick={() => setShowCategories(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#dfe3ea] bg-white px-5 py-3 font-semibold shadow-sm"
              >
                <Folder size={18} />
                Categories
              </button>

              <button
                onClick={() => setShowAdd(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-green-700 bg-[#eaf4ee] px-5 py-3 font-semibold text-green-700 shadow-sm"
              >
                <Plus size={18} />
                Add Photo
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            <h1 className="text-center text-2xl font-bold tracking-[0.35em]">
              PHOTOS
            </h1>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/admin/dashboard"
                className="rounded-xl bg-white px-5 py-3 font-semibold shadow-sm"
              >
                ← Back
              </Link>

              <button
                onClick={() => setShowCategories(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#dfe3ea] bg-white px-5 py-3 font-semibold shadow-sm"
              >
                <Folder size={18} />
                Categories
              </button>

              <button
                onClick={() => setShowAdd(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-green-700 bg-[#eaf4ee] px-5 py-3 font-semibold text-green-700 shadow-sm"
              >
                <Plus size={18} />
                Add Photo
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                active === cat
                  ? 'border-[#07142a] bg-[#07142a] text-white'
                  : 'border-[#07142a] bg-white text-[#07142a] hover:bg-[#07142a] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-[#dfe3ea] bg-white sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((photo, index) => (
            <div
              key={index}
              className="h-[120px] overflow-hidden border border-[#dfe3ea] sm:h-[150px] lg:h-[170px]"
            >
              <img
                src={photo.img}
                alt={photo.category}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-[#5f6b7a]">
            No photos found in this category.
          </p>
        )}

        {showCategories && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Categories</h2>
                <button onClick={() => setShowCategories(false)}>
                  <X />
                </button>
              </div>

              <div className="mt-6 grid gap-3">
                {categories
                  .filter((c) => c !== 'All')
                  .map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between rounded-xl border border-[#dfe3ea] p-4"
                    >
                      <span>{cat}</span>
                      <button className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {showAdd && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Add Photo</h2>
                <button onClick={() => setShowAdd(false)}>
                  <X />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <select className="w-full rounded-xl border border-[#dfe3ea] px-4 py-3">
                  <option>Select Category</option>
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                </select>

                <input
                  type="file"
                  className="w-full rounded-xl border border-[#dfe3ea] px-4 py-3"
                />

                <button className="w-full rounded-xl bg-[#07142a] px-5 py-3 font-bold text-white">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}