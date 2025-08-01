"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cpu, CreditCard, HardDrive, Info, MemoryStick, Wallet } from "lucide-react";
import Tooltip from "@/components/tooltip";

interface PlanCardProps {
  ram: number;
  cpu: number;
  storage: number;
  ramUsage: number;
  cpuUsage: number;
  storageUsage: number;
}

export default function PlanCard({
  ram,
  cpu,
  storage,
  ramUsage,
  cpuUsage,
  storageUsage,
}: PlanCardProps) {
  return (
    <Card className="bg-neutral-800 text-white">
      <CardContent className="p-5 flex flex-col gap-5 h-full">
        {/* Plan Title */}
        <h2 className="text-lg leading-none font-semibold flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> Plan
        </h2>

        {/* Plan Details */}
        <div className="space-y-3">
          {/* RAM */}
          <div>
            <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
              <MemoryStick className="w-4 h-4" /> RAM: {ram} GB
              <Tooltip text="RAM consists entirely of DDR5 modules, ensuring consistent speed and efficiency.">
                <Info className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
              </Tooltip>
            </div>
            <Progress value={(ramUsage / ram) * 100} className="h-2" />
          </div>

          {/* CPU */}
          <div>
            <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> CPU: {cpu} Thread units
              <Tooltip text="Each thread unit equals 0.8 threads on a AMD EPYC™ 9454P processor, offering you flawless performance.">
                <Info className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
              </Tooltip>
            </div>
            <Progress value={(cpuUsage / cpu) * 100} className="h-2" />
          </div>

          {/* Storage */}
          <div>
            <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
              <HardDrive className="w-4 h-4" /> Storage: {storage} GB
              <Tooltip text="Storage is exclusively NVMe Gen 4, providing fast and consistent data access.">
                <Info className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
              </Tooltip>
            </div>
            <Progress value={(storageUsage / storage) * 100} className="h-2" />
          </div>
        </div>

        {/* Button */}
        <Link href="/change-plan">
          <Button className="flex items-center gap-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-300">
            <Cpu className="w-4 h-4" /> Change Plan
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}