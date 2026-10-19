import images from '@/data/images.json';

// Responsive image from the pre-optimised derivative set (public/images, see scripts/optimize-images.py).
// Width/height are always set so the browser reserves space (no layout shift).
export default function Img({ name, sizes = '100vw', priority = false, alt, className, position }) {
  const im = images[name];
  if (!im) return null;
  return (
    <img
      src={im.src}
      srcSet={im.srcSet.map((s) => `${s.src} ${s.w}w`).join(', ')}
      sizes={sizes}
      width={im.width}
      height={im.height}
      alt={alt ?? im.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
