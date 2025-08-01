"use client";

import { useState, useEffect } from 'react';
import { 
  Sliders,
  LayoutDashboard,
  ServerCog,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Sliders,
    title: "Flexible Usage",
    description: "Change server size anytime. Downgrades give you Zenth back for unused time - only pay for what you really use."
  },
  {
    icon: LayoutDashboard,
    title: "Smart Panel",
    description: "Manage all your servers in one clean, user-friendly interface built for gamers and power users alike."
  },
  {
    icon: ServerCog,
    title: "Custom Projects",
    description: "Save entire server configurations and setups to quickly reuse them for events, resets, or new deployments."
  },
  {
    icon: Coins,
    title: "Zenth Credits",
    description: "Pay for all upgrades, changes, and resources with Zenth - automatically used based on your purchases."
  }
];

export function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-idx') || '0');
          setVisibleItems(prev => [...prev, idx]);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-item').forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-green-950/10">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Hosting?</h2>
          <p className="text-muted-foreground text-lg">
            Our game server hosting is designed to be flexible, cost-effective, and powerful,
            giving you full control over your gaming experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              data-idx={idx}
              className={cn(
                "feature-item bg-card/50 border rounded-lg p-6 transition-all duration-500",
                visibleItems.includes(idx) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="h-12 w-12 bg-green-900/50 flex items-center justify-center rounded-lg mb-5">
                <feature.icon className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}