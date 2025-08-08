"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Server, Cpu, Cloud } from 'lucide-react';

const features = [
  {
    icon: Server,
    title: "Efficient Server Management",
    description: "Our system allows you to manage all your game servers in one place. Quickly and easily handle your game server setups with our user-friendly interface.",
    docLink: "/docs/server-management"
  },
  {
    icon: Cpu,
    title: "Powerful Hardware",
    description: "Our servers are equipped with top-tier AMD EPYC™ processors and DDR5 RAM, ensuring smooth and fast performance for all your gaming needs.",
    docLink: "/docs/hardware-specs"
  },
  {
    icon: Cloud,
    title: "Scalability On Demand",
    description: "Our system adapts to your needs. You can add or reduce resources at any time, ensuring you're always getting exactly what you need.",
    docLink: "/docs/scalability"
  }
];

export function ModpackFeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-idx') || '0');
            setVisibleItems(prev => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.tech-feature-item').forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-green-950/10 via-green-950/3 to-card/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Technology Behind the Scenes</h2>
          <p className="text-muted-foreground text-lg">
            Our infrastructure is built on cutting-edge technology to provide reliability,
            performance, and cost-effectiveness for all your gaming needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              data-idx={idx}
              className={cn(
                "tech-feature-item bg-card/50 border rounded-lg p-6 transition-all duration-500",
                visibleItems.includes(idx) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="h-14 w-14 bg-green-900/50 flex items-center justify-center rounded-full mb-6">
                <feature.icon className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
