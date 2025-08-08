'use client';

import { getTeamMembers, roleIcons } from "@/lib/services/teamService";
import { Shuffle } from "lucide-react";
import Tooltip from "@/components/tooltip";

export function TeamList() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 uppercase font-bold font-minecraft">Our Team</h2>
          <p className="text-muted-foreground text-lg">
            Meet our dedicated team who keep everything running smoothly.
          </p>
        </div>

        <div className="mx-48 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {getTeamMembers().map((member, idx) => {
            const Icon = roleIcons[member.role];
            return (
              <div
                key={idx}
                className="cursor-pointer bg-neutral-800/60 border border-neutral-700 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col h-[23rem]"
              >
                <div className="relative w-auto h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-40 object-contain absolute bottom-0 left-0"
                  />
                  <div className="absolute inset-0 border-b-[4px]" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-semibold text-xl line-clamp-2">{member.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{member.tag}</p>
                  </div>
                  <div className="flex gap-2 mt-2 items-center">
                    <Tooltip text={member.role.charAt(0).toUpperCase() + member.role.slice(1)}>
                      <Icon className="h-6 w-6 text-amber-400" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}