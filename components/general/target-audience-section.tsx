"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '../icons';

export function TargetAudienceSection() {
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

    const section = document.querySelector('.target-audience-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="py-20 target-audience-section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={cn(
              "space-y-6 order-2 lg:order-1 transition-all duration-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Ideal for Gamers and Communities</h2>
            <p className="text-lg text-muted-foreground">
              Our hosting is designed for budget-conscious gamers and communities looking for flexible, 
              high-quality, and fair server solutions. Whether you're a casual gamer or manage a large 
              community, we give you complete control over your server costs.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Casual Gamers</h3>
                  <p className="text-muted-foreground">
                    Host servers for your friend group and only pay when you're playing.
                    No need to waste money when no one is online.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Gaming Communities</h3>
                  <p className="text-muted-foreground">
                    Scale your community servers based on actual demand. Easily add more resources
                    during peak times and scale down during off-hours.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Content Creators</h3>
                  <p className="text-muted-foreground">
                    Create event servers for your audience that you can spin up just for special streams
                    or videos, without long-term commitments.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Your Server
                </Button>
              </Link>
            </div>
          </div>
          
          <div 
            className={cn(
              "relative h-[450px] order-1 lg:order-2 rounded-lg overflow-hidden border transition-all duration-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 to-green-800 opacity-80" />
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="mb-6">
                  <svg 
                    viewBox="0 0 24 24" 
                    width="64" 
                    height="64" 
                    className="mx-auto text-green-400"
                    strokeWidth="1.5" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M17 8h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3v4l-4-4H9a1.994 1.994 0 0 1-1.414-.586m0 0L11 14h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l.586-.586Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Join Our Community</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with other gamers, share your experiences, and get support from our active community of server hosts.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/discord">
                    <Button variant="outline" size="sm">
                      <Icons.discord className="h-5 w-5 mr-2"></Icons.discord>
                      Discord
                    </Button>
                  </Link>
                  <Link href="/forum">
                    <Button variant="outline" size="sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                      Forum
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}