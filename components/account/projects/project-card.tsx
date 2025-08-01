"use client";

import { Pencil, Trash2, FileDown, CirclePower } from 'lucide-react';
import Tooltip from '@/components/tooltip';

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="px-2 py-1 bg-neutral-600 text-white text-xs rounded-full">
      {label}: {value}
    </div>
  );
}

export default function ProjectCard({
  id,
  active,
  title,
  ram,
  cpu,
  storage,
  onDelete,
  onLoad,
  onDeactivate,
}: any) {
  return (
    <div className={`relative w-full max-w-[24.25rem] h-[9rem] border rounded-md ${active ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}>
      <div className="absolute w-full h-[7rem] bg-neutral-700 bottom-0 text-white">
        <div className="relative w-full h-full pt-2 px-3 flex flex-col">
          <div className="w-full h-[4rem]">
            <p className="text-sm font-semibold truncate">{title}</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              <StatPill label="RAM" value={`${ram} GB`} />
              <StatPill label="CPU" value={`${cpu} TU`} />
              <StatPill label="Storage" value={`${storage} GB`} />
            </div>
          </div>
          <div className="relative w-full flex-1 pt-3 flex justify-end">
            <div className="flex gap-2">
              {active ? (
                <Tooltip text="Deactivate Project">
                  <CirclePower
                    className="h-[1.15rem] w-[1.15rem] text-gray-400 hover:text-gray-200"
                    onClick={() => onDeactivate(id)}
                  />
                </Tooltip>
              ) : (
                <Tooltip text="Activate Project">
                  <CirclePower
                    className="h-[1.15rem] w-[1.15rem] text-gray-400 hover:text-gray-200"
                    onClick={() => onLoad(id)}
                  />
                </Tooltip>
              )}
              <Tooltip text="Edit Template">
                <Pencil className="h-[1.15rem] w-[1.15rem] text-gray-400 hover:text-gray-200" />
              </Tooltip>
              <Tooltip text="Copy Template">
                <FileDown className="h-[1.15rem] w-[1.15rem] text-gray-400 hover:text-gray-200" />
              </Tooltip>
              <Tooltip text="Delete Project">
                <Trash2
                  className="h-[1.15rem] w-[1.15rem] text-gray-400 hover:text-red-400"
                  onClick={() => onDelete(id)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}