"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.cta-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="py-24 cta-section">
      <div className="container">
        <div 
          className={cn(
            "max-w-5xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="relative bg-green-950 rounded-lg overflow-hidden border shadow-lg">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1034940/pexels-photo-1034940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20" />
            <div className="relative p-12 md:p-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started Today!</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Sign up and begin enjoying the most flexible and affordable game server hosting today!
                No credit card required to create an account.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-medium w-full sm:w-auto">
                    Start Now
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}