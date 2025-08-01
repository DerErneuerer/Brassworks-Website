'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Banner() {
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || '';
  const title = formatSegment(firstSegment);

  useEffect(() => {
    setAnimate(true);
  }, [pathname]);

  return (
    <section className="relative h-[15rem] flex items-center justify-center overflow-hidden border-b-[0.4rem]">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-green-950 z-0">
        <div className="absolute inset-0 bg-[url('/572.png')] mix-blend-overlay opacity-30 bg-cover bg-center scale-110 transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 text-center">
        <h1
          className={`text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-200 tracking-tight whitespace-nowrap text-ellipsis transition-all duration-1000 ease-out 
                      ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}