'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
];

export default function Header({ onQuoteClick }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  function handleQuoteClick() {
    setOpen(false);
    if (onQuoteClick) onQuoteClick();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="leading-none">
          <span className="block font-serif text-xl font-bold tracking-[0.12em] text-white sm:text-2xl">
            BOBBY MEDIA
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.42em] text-[#C9A84C]">
            Photo Studio
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition hover:text-[#E8C97A] ${
                path === href ? 'text-[#E8C97A]' : 'text-white/85'
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={handleQuoteClick}
            className="btn-gold rounded-full px-6 py-3 text-sm"
          >
            Get Quote
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-black/85 p-4 backdrop-blur-xl lg:hidden">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-base font-medium ${
                path === href
                  ? 'bg-white/10 text-[#E8C97A]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={handleQuoteClick}
            className="mt-3 block w-full rounded-xl bg-[#C9A84C] px-4 py-3 text-center font-bold text-black"
          >
            Get Quote
          </button>
        </div>
      )}
    </header>
  );
}