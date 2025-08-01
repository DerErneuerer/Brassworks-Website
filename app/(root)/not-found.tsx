'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[93vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-green-950" />
        <div className="absolute inset-0 bg-[url('/images/minecraft.jpg')] bg-cover bg-center opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 text-center max-w-2xl px-4">
        <div className={`space-y-6 ${loaded ? "animate-fadeIn" : "opacity-0"}`}>
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-green-400">
            404 : Page not found
          </h1>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist. Maybe you took a wrong turn?
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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
