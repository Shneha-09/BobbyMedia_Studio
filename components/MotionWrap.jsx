'use client';
import { motion } from 'framer-motion';
export default function MotionWrap({children,className='',delay=0}){return <motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.7,delay}} className={className}>{children}</motion.div>}
