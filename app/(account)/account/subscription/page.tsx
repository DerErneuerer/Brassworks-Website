"use client";

import Tooltip from "@/components/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getUserAccount } from "@/lib/services/accountService";
import { Cpu, HardDrive, Info, MemoryStick, CornerDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';

export default function SubscriptionPage() {
  const [ram, setRam] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [storage, setStorage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [storageUsage, setStorageUsage] = useState(0);
  const [pricingRam, setPricingRam] = useState(2);

  useEffect(() => {
    async function fetchAccount() {
      const account = await getUserAccount();
      setRam(account.ram);
      setRamUsage(account.ramUsage);
      setCpu(account.cpu);
      setCpuUsage(account.cpuUsage);
      setStorage(account.storage);
      setStorageUsage(account.storageUsage);
    }
    fetchAccount();
  }, []);

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

  const calculateStorage = (ram: number) => 25 * Math.ceil(ram / 2);

  const formatZenth = (amount: number) =>
    amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const formatEuros = (amount: number) =>
    amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const threads = calculateThreads(pricingRam);
  const storageCalc = calculateStorage(pricingRam);

  const basePrice = 5;
  const threadPrice = 2;
  const ramPrice = 1.5;

  const calculateMonthlyPrice = () => {
    const additionalRamUnits = pricingRam - 2;
    const additionalThreadUnits = threads - 1;
    return basePrice + additionalRamUnits * ramPrice + additionalThreadUnits * threadPrice;
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

    const section = document.querySelector(".pricing-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-6 px-[1rem] sm:px-[3rem] md:pl-[15rem] w-full h-full overflow-y-scroll transition-[padding] duration-300 ease-in-out py-7">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Subscriptions Overview</h1>
          <p className="text-sm text-gray-400">
            View and manage your subscription, adjust plans, and track usage.
          </p>
        </div>
      </div>

      <Card className="bg-neutral-800 text-white">
        <CardContent className="p-5 flex flex-col gap-5 h-full">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <MemoryStick className="w-4 h-4" /> RAM: {ram} GB
                <Tooltip text="RAM consists entirely of DDR5 modules, ensuring consistent speed and efficiency.">
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
                </Tooltip>
              </div>
              <Progress value={(ramUsage / ram) * 100} className="h-2" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> CPU: {cpu} Thread units
                <Tooltip text="Each thread unit equals 0.8 threads on a AMD EPYC™ 9454P processor, offering you flawless performance.">
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
                </Tooltip>
              </div>
              <Progress value={(cpuUsage / cpu) * 100} className="h-2" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <HardDrive className="w-4 h-4" /> Storage: {storage} GB
                <Tooltip text="Storage is exclusively NVMe Gen 4, providing fast and consistent data access.">
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
                </Tooltip>
              </div>
              <Progress value={(storageUsage / storage) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Der Rest der PricingSection bleibt unverändert */}
      {/* ... */}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 text-green-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}