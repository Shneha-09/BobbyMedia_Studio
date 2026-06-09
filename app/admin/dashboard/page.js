'use client';

import Link from 'next/link';
import { Camera, ArrowRight, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-5 py-10 text-[#07142a]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-3 text-[#5f6b7a]">
              Welcome back. Manage your studio photos below.
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#dfe3ea] bg-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-[#07142a] hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/photos"
            className="group rounded-[28px] border border-[#dfe3ea] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Camera size={30} />
              </div>

              <div className="text-right">
                <p className="text-4xl font-bold text-[#07142a]">0</p>
                <p className="mt-1 text-sm text-[#8a95a3]">total</p>
              </div>
            </div>

            <h2 className="mt-10 text-2xl font-bold">Photos</h2>

            <p className="mt-4 max-w-sm leading-7 text-[#5f6b7a]">
              Manage gallery images by category. Upload, edit and delete photos
              for the frontend.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 font-semibold text-[#5f6b7a] group-hover:text-[#07142a]">
              Manage
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}