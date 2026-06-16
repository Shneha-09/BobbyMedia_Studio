'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Folder, Plus } from 'lucide-react';
import imageCompression from 'browser-image-compression';

const initialCategories = [
  'Wedding',
  'Wedding Cinematography',
  'Birthday Photography',
  'Outdoor Photoshoot',
  'Event Photography',
  'Drone Photography',
  'Album Design',
  'Other Photo Services',
];

export default function AdminPhotos() {
  const [categories, setCategories] = useState(initialCategories);
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [uploadMode, setUploadMode] = useState('single');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);

  const allCategories = ['All', ...categories];
  const filtered =
    active === 'All' ? photos : photos.filter((p) => p.category === active);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();

      if (data.success) {
        const dbPhotos = data.photos.map((photo) => ({
          id: photo._id,
          category: photo.category,
          img: photo.imageUrl,
          likes: photo.likes || 0,
        }));

        setPhotos(dbPhotos);
      }
    } catch (error) {
      console.error('Fetch photos error:', error);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );

    setBulkFiles(files);
  }

  function addCategory() {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) return alert('Please enter category name');

    if (categories.includes(trimmedCategory)) {
      return alert('Category already exists');
    }

    setCategories([...categories, trimmedCategory]);
    setNewCategory('');
  }

  function deleteCategory(categoryName) {
    if (!confirm(`Delete ${categoryName}?`)) return;

    setCategories(categories.filter((cat) => cat !== categoryName));
    setPhotos(photos.filter((photo) => photo.category !== categoryName));

    if (active === categoryName) setActive('All');
    if (selectedCategory === categoryName) setSelectedCategory('');
  }

  async function addPhoto() {
    if (!selectedCategory) return alert('Please select a category');

    const files =
      uploadMode === 'single'
        ? selectedFile
          ? [selectedFile]
          : []
        : bulkFiles;

    if (files.length === 0) return alert('Please choose photo');

    setUploading(true);
    const uploadedPhotos = [];

    try {
      for (const file of files) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 3,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const formData = new FormData();
        formData.append('category', selectedCategory);
        formData.append('file', compressedFile);

        const res = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Upload failed');
        }

        uploadedPhotos.push({
          id: data.photo._id,
          category: data.photo.category,
          img: data.photo.imageUrl,
          likes: data.photo.likes || 0,
        });
      }

      setPhotos((prev) => [...uploadedPhotos, ...prev]);
      setActive(selectedCategory);
      setSelectedCategory('');
      setSelectedFile(null);
      setBulkFiles([]);
      alert('Photo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function deletePhoto(id) {
    if (!confirm('Delete this photo?')) return;

    const res = await fetch(`/api/photos?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.success) {
      setPhotos(photos.filter((p) => p.id !== id));
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#07142a]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-[#dfe3ea] pb-6 md:flex-row md:items-center md:justify-between">
          <Link
            href="/admin/dashboard"
            className="w-fit rounded-xl border border-[#dfe3ea] bg-white px-5 py-3 text-sm font-semibold text-[#111] shadow-sm"
          >
            ← Back
          </Link>

          <h1 className="text-center text-2xl font-bold tracking-[0.35em] text-[#111]">
            PHOTOS
          </h1>

          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#dfe3ea] bg-white px-5 py-3 text-sm font-semibold text-[#111] shadow-sm"
            >
              <Folder size={16} />
              Categories
            </button>

            <button
              onClick={() => setShowUpload(!showUpload)}
              className="inline-flex items-center gap-2 rounded-xl border border-green-700 bg-[#eaf4ee] px-5 py-3 text-sm font-semibold text-green-700 shadow-sm"
            >
              <Plus size={16} />
              Add Photo
            </button>
          </div>
        </div>

        {showUpload && (
          <div className="mt-8 ml-auto w-full max-w-[520px] rounded-2xl border border-[#07142a] bg-[#f5f2ea] p-6">
            <div className="mb-4 flex justify-end">
              <div className="flex overflow-hidden rounded-xl border border-[#c0c0c0] bg-white">
                <button
                  onClick={() => setUploadMode('single')}
                  className={`px-8 py-2 text-sm font-semibold transition ${
                    uploadMode === 'single'
                      ? 'bg-[#2f2f2f] text-white'
                      : 'bg-white text-[#333]'
                  }`}
                >
                  Single Upload
                </button>

                <button
                  onClick={() => setUploadMode('bulk')}
                  className={`px-8 py-2 text-sm font-semibold transition ${
                    uploadMode === 'bulk'
                      ? 'bg-[#2f2f2f] text-white'
                      : 'bg-white text-[#333]'
                  }`}
                >
                  Bulk Upload
                </button>
              </div>
            </div>

            <div className="mb-3 flex justify-end">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 text-sm text-[#111] outline-none sm:w-[240px]"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {uploadMode === 'single' ? (
              <label className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#e0e0e0] bg-white px-4 py-3 text-sm font-medium text-[#111] sm:w-[240px]">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />

                <span className="rounded-xl border border-[#d7d7d7] bg-[#f5f5f5] px-3 py-1">
                  Choose File
                </span>

                <span className="truncate text-[#555]">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </span>
              </label>
            ) : (
              <div
                ref={dropRef}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => dropRef.current?.querySelector('input')?.click()}
                className={`mb-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
                  isDragging
                    ? 'border-[#07142a] bg-[#f0f4ff]'
                    : 'border-[#b8b8b8] bg-white'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setBulkFiles(Array.from(e.target.files || []))
                  }
                />

                <p className="text-sm font-medium text-[#555]">
                  📁 Click or drag &amp; drop images here
                </p>

                <p className="text-xs text-[#777]">
                  {bulkFiles.length > 0
                    ? `${bulkFiles.length} images selected`
                    : '0 images selected'}
                </p>
              </div>
            )}

            <button
              onClick={addPhoto}
              disabled={uploading}
              className="rounded-xl border border-[#c0c0c0] bg-[#f8f8f8] px-8 py-2 text-sm font-medium text-[#111] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}

        {showCategories && (
          <div className="mt-8 rounded-2xl border border-[#dfe3ea] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-[#111]">
              Manage Categories
            </h2>

            <div className="mb-5 flex flex-wrap gap-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="h-11 w-full max-w-[320px] rounded-xl border border-[#dfe3ea] bg-white px-4 text-sm outline-none"
              />

              <button
                onClick={addCategory}
                className="rounded-xl border border-green-700 bg-[#eaf4ee] px-5 py-2 text-sm font-semibold text-green-700"
              >
                Add Category
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-3 rounded-full border border-[#dfe3ea] bg-[#f8f8f8] px-4 py-2"
                >
                  <span className="text-sm font-medium text-[#111]">
                    {cat}
                  </span>

                  <button
                    onClick={() => deleteCategory(cat)}
                    className="rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition sm:px-8 sm:py-3 sm:text-base ${
                active === cat
                  ? 'border-[#07142a] bg-[#07142a] text-white'
                  : 'border-[#dfe3ea] bg-white text-[#111] hover:border-[#07142a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 overflow-hidden rounded-xl border border-[#dfe3ea] bg-white sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square border border-[#dfe3ea] bg-white"
            >
              <img
                src={photo.img}
                alt={photo.category}
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-2 left-2 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white shadow-lg">
                ❤️ {photo.likes || 0} Likes
              </div>

              <button
                type="button"
                onClick={() => deletePhoto(photo.id)}
                className="absolute right-2 top-2 z-10 rounded-md bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}