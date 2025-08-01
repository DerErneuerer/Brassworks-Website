"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';
import { Cpu, MemoryStick, HardDrive, CornerDownRight } from 'lucide-react';
import Tooltip from '../tooltip';

const formatZenth = (amount: number) => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const formatEuros = (amount: number) => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const calculateThreads = (ram: number) => {
  if (ram <= 2) return 1;
  if (ram <= 4) return 2;
  if (ram <= 6) return 2;
  if (ram <= 8) return 3;
  if (ram <= 10) return 4;
  if (ram <= 12) return 4;
  if (ram <= 14) return 5;
  if (ram <= 16) return 6;
  if (ram <= 18) return 7;
  if (ram <= 20) return 8;
  if (ram <= 22) return 8;
  if (ram <= 24) return 9;
  if (ram <= 26) return 10;
  if (ram <= 28) return 10;
  if (ram <= 30) return 11;
  return 12;
};

const calculateStorage = (ram: number) => {
  return 25 * Math.ceil(ram / 2);
};

export function PricingSection() {
  const [ram, setRam] = useState(2);
  const threads = calculateThreads(ram);
  const storage = calculateStorage(ram);

  const basePrice = 5;
  const threadPrice = 2;
  const ramPrice = 1.50;

  const calculateMonthlyPrice = () => {
    const additionalRamUnits = ram - 2;
    const additionalThreadUnits = threads - 1;
    return basePrice + (additionalRamUnits * ramPrice) + (additionalThreadUnits * threadPrice);
  };

  const monthlyPriceInEuros = calculateMonthlyPrice();
  const monthlyPriceInZenth = monthlyPriceInEuros * 100;

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

    const section = document.querySelector('.pricing-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="py-20 pricing-section bg-green-950/10">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple and Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Customize your server configuration and only pay for what you use.
            Start with our base configuration and scale up as needed.
          </p>
        </div>

        <div 
          className={cn(
            "max-w-4xl mx-auto bg-card rounded-lg border shadow-lg transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r">
              <h3 className="text-2xl font-bold mb-6">Configure Your Server</h3>
              <div className="space-y-8">
                {/* RAM Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <MemoryStick className="w-4 h-4 mr-2 text-green-400" />
                      <span>DDR5 RAM</span>
                    </div>
                    <span className="font-medium">{ram} GB</span>
                  </div>
                  <Slider
                    value={[ram]}
                    min={2}
                    max={32}
                    step={2}
                    onValueChange={(value) => setRam(value[0])}
                    className="my-4"
                  />
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>2 GB</span>
                    <span>32 GB</span>
                  </div>
                </div>

                {/* CPU Threads */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Cpu className="w-4 h-4 mr-2 text-green-400" />
                      <span>CPU Threads</span>
                    </div>
                    <span className="font-medium">{threads} threads</span>
                  </div>
                  <Slider
                    value={[threads]}
                    min={1}
                    max={12}
                    step={1}
                    disabled
                    className="my-4 opacity-50 pointer-events-none"
                  />
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>1 threads</span>
                    <span>12 threads</span>
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <HardDrive className="w-4 h-4 mr-2 text-green-400" />
                      <span>Storage</span>
                    </div>
                    <span className="font-medium">{storage} GB</span>
                  </div>
                  <Slider
                    value={[storage]}
                    min={25}
                    max={400}
                    step={25}
                    disabled
                    className="my-4 opacity-50 pointer-events-none"
                  />
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>25 GB</span>
                    <span>400 GB</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <CornerDownRight className="w-4 h-4 shrink-0" />
                  <span>Base price includes 1 CPU thread, 2GB RAM, and 20GB storage</span>
                </div>
                <div className="flex gap-2">
                  <CornerDownRight className="w-4 h-4 shrink-0" />
                  <span>Additional CPU thread: 200 Zenth (€2.50) per month</span>
                </div>
                <div className="flex gap-2">
                  <CornerDownRight className="w-4 h-4 shrink-0" />
                  <span>Additional RAM: 150 Zenth (€1.50) per GB per month</span>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Your Plan Summary</h3>

              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Base plan</span>
                    <span>€{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span>• {threads} CPU threads</span>
                      <span>€{(threads * threadPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span>• {ram} GB RAM</span>
                      <span>€{(ram * ramPrice).toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Monthly total</div>
                      <div className="text-xl font-bold text-green-400">
                        {formatZenth(monthlyPriceInZenth)} Z
                        <span className="text-xs text-muted-foreground ml-1">
                          = €{formatEuros(monthlyPriceInEuros)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    1 Euro (€) = 100 Zenth (Z)
                  </div>
                </div>

                <div className="pt-4 border-t text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <CheckIcon />
                      <span>
                        <a href="/docs" className="transition duration-300 ease-in-out hover:text-primary hover:scale-105">
                          Full access to all features
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon />
                      <span>
                        <a href="/docs" className="transition duration-300 ease-in-out hover:text-primary hover:scale-105">
                          Free dedicated IP starting from 8 GB RAM
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon />
                      <span>
                        <a href="/docs" className="transition duration-300 ease-in-out hover:text-primary hover:scale-105">
                          Flexible upgrade/downgrade with Zenth
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon />
                      <span>
                        <a href="/docs" className="transition duration-300 ease-in-out hover:text-primary hover:scale-105">
                          Daily backups + 3 manual slots
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckIcon />
                      <span>
                        <a href="/docs" className="transition duration-300 ease-in-out hover:text-primary hover:scale-105">
                          DDoS Protection
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/signup">
                  <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-base">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}