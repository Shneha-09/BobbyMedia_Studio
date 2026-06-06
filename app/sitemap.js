export default function sitemap(){const base='https://bobby-media-photo-studio.vercel.app';return ['','/about','/services','/gallery','/contact'].map(p=>({url:base+p,lastModified:new Date()}))}
