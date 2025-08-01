'use client';

import { useState, useEffect } from "react";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  useEffect(() => {
    setLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") || "0");
            setVisibleItems((prev) => [...prev, idx]);
            console.log("yes")
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".card-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-green-950" />
        <div className="absolute inset-0 bg-[url('/572.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 text-center max-w-2xl px-4">
        <div className={`space-y-6 ${loaded ? "animate-fadeIn" : "opacity-0"}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Our <span className="text-green-400">General Plans</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Pick your favorite game and set up your perfect server. Whether it's for you <br />
            and your friends, or an entire community, we've got you covered.
          </p>

          {/* Karten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-sm text-left max-w-[70rem] mx-auto">
            {[
              { title: "10+ Games", subtitle: "Host all your favorite titles anytime" },
              { title: "General Plan", subtitle: "Enjoy all games with a single plan" },
              { title: "24/7 Uptime", subtitle: "Non stop action, always online" }
            ].map((item, idx) => (
              <div
                key={idx}
                data-idx={idx}
                className={`card-item bg-black/30 h-80 max-w-80 backdrop-blur-sm p-4 rounded-lg transition-all duration-500 ${
                  visibleItems.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-green-400 font-bold text-xl">{item.title}</div>
                <div className="text-muted-foreground">{item.subtitle}</div>
              </div>
            ))}
          </div>
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