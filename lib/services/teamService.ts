// services/teamService.ts

import { Scale, Crown, LucideIcon } from "lucide-react";

// ----------------------------------------
// 🔹 Types
// ----------------------------------------

export type Role = "administrator" | "moderator";

export interface TeamMember {
  name: string;
  role: Role;
  tag: string;
  avatarUrl: string;
}

// ----------------------------------------
// 🔹 Icon mapping for roles
// ----------------------------------------

export const roleIcons: Record<Role, LucideIcon> = {
  administrator: Crown,
  moderator: Scale,
};

// ----------------------------------------
// 🔹 In-memory state (resets on reload)
// ----------------------------------------

let teamMembers: TeamMember[] = [
  {
    name: "swzo",
    role: "administrator",
    tag: "@iimillie",
    avatarUrl: "/avatars/swzo.png",
  },
    {
    name: "Pipo",
    role: "administrator",
    tag: "@pipo1660",
    avatarUrl: "/avatars/pipo.png",
  },
    {
    name: "DerErneuerer",
    role: "moderator",
    tag: "@dererneuerer",
    avatarUrl: "/avatars/dererneuerer.png",
  },
    {
        name: "Float420",
        role: "moderator",
        tag: "@float420",
        avatarUrl: "/avatars/float420.png",
    }
];

// ----------------------------------------
// 🔹 Cache variable for team members list
// ----------------------------------------

let cachedTeamMembers: TeamMember[] | null = null;

// ----------------------------------------
// 🔹 Service functions with cache mechanism
// ----------------------------------------

export const getTeamMembers = (): TeamMember[] => {
  if (cachedTeamMembers) {
    console.log("[Cache] getTeamMembers: returning cached team members");
    return cachedTeamMembers;
  }
  console.log("[Load] getTeamMembers: loading fresh team members");
  cachedTeamMembers = [...teamMembers];
  return cachedTeamMembers;
};

export const getTeamMemberByName = (name: string): TeamMember | undefined => {
  const allMembers = getTeamMembers();
  return allMembers.find(member => member.name === name);
};

export const addTeamMember = (newMember: TeamMember): void => {
  teamMembers.push(newMember);
  cachedTeamMembers = [...teamMembers];
  console.log(`[Update] addTeamMember: member "${newMember.name}" added, cache updated`);
};

export const updateTeamMember = (updatedMember: TeamMember): void => {
  teamMembers = teamMembers.map(member => (member.name === updatedMember.name ? updatedMember : member));
  cachedTeamMembers = [...teamMembers];
  console.log(`[Update] updateTeamMember: member "${updatedMember.name}" updated, cache updated`);
};

export const deleteTeamMember = (name: string): void => {
  teamMembers = teamMembers.filter(member => member.name !== name);
  cachedTeamMembers = [...teamMembers];
  console.log(`[Update] deleteTeamMember: member "${name}" deleted, cache updated`);
};