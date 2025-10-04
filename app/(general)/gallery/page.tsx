'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GalleryPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[93vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/background-not-found.png')] bg-cover bg-center opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 text-center max-w-2xl px-4">
        <div className={`space-y-6 ${loaded ? "animate-fadeIn" : "opacity-0"}`}>
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-neutral-400">
              Gallery Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground">
              The gallery isn't ready yet - we'll add it once it's worth showing.
          </p>
          <Link
            href="/"
            className="                font-minecraft inline-flex items-center justify-center gap-x-2
                px-5 py-3 h-12 text-lg ring-2 ring-inset
                border-amber-600 bg-amber-500 text-white
                shadow-[0_4px_theme(colors.amber.600)]
                ring-amber-400
                hover:translate-y-0.5 hover:bg-amber-400
                hover:shadow-[0_2px_theme(colors.amber.500)]
                hover:ring-amber-300"
          >
            Return to Homepage
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
