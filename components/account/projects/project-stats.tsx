import { Progress } from "@/components/ui/progress";

interface ProjectStatsProps {
  storageUsage: number;
  ramUsage: number;
  cpuUsage: number;
  storage: number;
  ram: number;
  cpu: number;
  activeProjectsLenght: number;
}

export default function ProjectStats({
  storageUsage,
  ramUsage,
  cpuUsage,
  storage,
  ram,
  cpu,
  activeProjectsLenght,
}: ProjectStatsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative max-w-[15rem] w-full h-8 bg-neutral-700 rounded-md overflow-hidden">
        <Progress
          value={(storageUsage / storage) * 100}
          progressColor="bg-gray-600"
          className="bg-neutral-800 absolute h-8 rounded-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
          Storage: {storageUsage} / {storage} GB
        </div>
      </div>

      <div className="relative max-w-[15rem] w-full h-8 bg-neutral-700 rounded-md overflow-hidden">
        <Progress
          value={(ramUsage / ram) * 100}
          progressColor="bg-gray-600"
          className="bg-neutral-800 absolute h-8 rounded-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
          RAM: {ramUsage} / {ram} GB
        </div>
      </div>

      <div className="relative max-w-[15rem] w-full h-8 bg-neutral-700 rounded-md overflow-hidden">
        <Progress
          value={(cpuUsage / cpu) * 100}
          progressColor="bg-gray-600"
          className="bg-neutral-800 absolute h-8 rounded-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
          CPU: {cpuUsage} / {cpu} TU
        </div>
      </div>

      {activeProjectsLenght > 0 && (
        <div className="text-sm text-green-400">
          {activeProjectsLenght} {activeProjectsLenght === 1 ? "project" : "projects"} currently active
        </div>
      )}
    </div>
  );
}