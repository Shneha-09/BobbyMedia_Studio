'use client';
import {motion} from 'framer-motion';import {stats} from './data';
export default function Stats(){return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{stats.map((s,i)=><motion.div key={s.label} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}} className="glass rounded-3xl p-6 text-center"><p className="text-4xl font-black text-[#C9A84C]">{s.value}+</p><p className="mt-2 text-zinc-300">{s.label}</p></motion.div>)}</div>}
