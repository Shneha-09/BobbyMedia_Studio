'use client';
import Header from './Header';
export default function PageHero({title,subtitle}){return <><Header/><section className="hero-bg relative flex min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-28"><div className="absolute inset-0 bg-black/50"/><div className="relative z-10 max-w-5xl text-center"><p className="mb-5 text-xs uppercase tracking-[.5em] text-[#C9A84C]">Bobby Media Photo Studio</p><h1 className="lux-title text-5xl sm:text-7xl">{title}</h1>{subtitle&&<p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-300">{subtitle}</p>}</div></section></>}
