"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-green-950 z-0">
        <div className="absolute inset-0 bg-[url('/572.png')] mix-blend-overlay opacity-30 bg-cover bg-center scale-110 transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      
      <div className="container relative z-10 mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn("space-y-6", loaded ? "animate-fadeIn" : "opacity-0")}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              Flexible Game Server <span className="text-green-400">Hosting</span> for Gamers and Communities
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Pay only for the time you use, with no long-term contracts. Start, pause, and resume your server whenever you want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto font-medium">
                  Start Now
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={cn(
            "relative h-[400px] rounded-lg overflow-hidden border shadow-xl opacity-0", 
            loaded ? "animate-slideUp" : "opacity-0 translate-y-10"
          )}>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-950 to-green-700 opacity-80" />
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg max-w-xs text-center">
                <h3 className="text-xl font-bold mb-2">Game Servers On Demand</h3>
                <p className="text-muted-foreground mb-4">Ready in minutes. Scale as you grow.</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/30 p-3 rounded">
                    <div className="font-bold text-green-400 text-xl">99.9%</div>
                    <div className="text-muted-foreground">Uptime</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <div className="font-bold text-green-400 text-xl">24/7</div>
                    <div className="text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
}