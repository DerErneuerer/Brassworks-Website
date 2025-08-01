"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CommunityPartnersSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(".community-partners-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="py-20 community-partners-section text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "space-y-6 order-2 lg:order-1 transition-all duration-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Become a Community Partner</h2>
            <p className="text-lg text-muted-foreground">
              Join our growing network! We offer tailored partnerships that empower your community 
              with exclusive benefits, including discounts and free services depending on your community size.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Exclusive Discounts & Free Services</h3>
                  <p className="text-muted-foreground">
                    Enjoy special pricing and even complimentary services based on the size and activity of your community.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Shared Growth & Support</h3>
                  <p className="text-muted-foreground">
                    We provide your community with powerful tools, resources, and expert support to help you scale effectively.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Exclusive Community Events</h3>
                  <p className="text-muted-foreground">
                    Participate in joint gaming events, workshops, and campaigns to increase your community’s reach.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/contact">
                <Button className="bg-green-600 hover:bg-green-700">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>

          <div
            className={cn(
              "relative h-[450px] order-1 lg:order-2 rounded-lg overflow-hidden border border-green-700 transition-all duration-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 to-green-800 opacity-90" />
            <div
              className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <svg
                viewBox="0 0 24 24"
                width="64"
                height="64"
                className="mb-6 text-green-400"
                strokeWidth="1.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M17 8h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3v4l-4-4H9a1.994 1.994 0 0 1-1.414-.586m0 0L11 14h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l.586-.586Z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Let's Grow Together</h3>
              <p className="text-muted-foreground max-w-sm">
                Partner with us and benefit from a thriving community, exclusive offers, and shared success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
