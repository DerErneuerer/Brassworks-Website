"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/banner.png')] z-0">
        <div className="absolute inset-0 mix-blend-overlay opacity-10 bg-cover bg-center scale-130 transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto mt-16 flex flex-col items-center gap-20 z-10">
        <img
          src="/brassworks.png"
          className={`w-auto h-40 object-contain transition-opacity duration-1000 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          alt="Brassworks Logo"
        />

        <Link href="/play-now">
          <div
            className={`
              mt-10 transition-all duration-700 ease-in-out
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <Button
              variant="default"
              className={`
                font-minecraft inline-flex items-center justify-center gap-x-2
                px-5 py-3 h-12 text-lg ring-2 ring-inset
                border-amber-600 bg-amber-500 text-white
                shadow-[0_4px_theme(colors.amber.600)]
                ring-amber-400
                hover:translate-y-0.5 hover:bg-amber-400
                hover:shadow-[0_2px_theme(colors.amber.500)]
                hover:ring-amber-300
              `}
            >
              Join Brassworks Now
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
}