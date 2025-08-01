// services/accountService.ts

// ----------------------------------------
// 🔹 Types
// ----------------------------------------

export type Session = {
  id: number;
  device: string;
  ip: string;
  lastActive: string;
  current: boolean;
};

export type UserAccount = {
  email: string;
  username: string;
  name: string;
  address: string;
  twoFactorEnabled: boolean;
  zenth: number;
  storage: number;
  storageUsage: number;
  ram: number;
  ramUsage: number;
  cpu: number;
  cpuUsage: number;
};

export interface Project {
  id: string;
  active: boolean;
  title: string;
  template: string;
  members: number;
  servers: number;
  storage: number;
  ram: number;
  cpu: number;
}

export type ResourceUsage = {
  storage: number;
  ram: number;
  cpu: number;
};

// ----------------------------------------
// 🔹 In-memory state (resets on reload)
// ----------------------------------------

let userAccount: UserAccount = {
  email: "user@572.host",
  username: "572-User",
  name: "",
  address: "",
  twoFactorEnabled: true,
  zenth: 1389,
  ram: 16,
  ramUsage: 8,
  cpu: 8,
  cpuUsage: 6,
  storage: 240,
  storageUsage: 200,
};

let sessions: Session[] = [
  { id: 1, device: "Chrome on Windows", ip: "192.168.0.24", lastActive: "May 27, 2025 – 18:45", current: true },
  { id: 2, device: "Firefox on Mac", ip: "192.168.0.100", lastActive: "May 26, 2025 – 09:30", current: false },
  { id: 3, device: "Safari on iPhone", ip: "192.168.0.150", lastActive: "May 25, 2025 – 20:00", current: false },
];

let projects: Project[] = [
  { id: "1", active: true, title: "Minecraft Server", template: "54532421", members: 12, servers: 3, storage: 120, ram: 16, cpu: 10 },
  { id: "2", active: false, title: "Event Project", template: "32841923", members: 8, servers: 2, storage: 80, ram: 12, cpu: 8 },
  { id: "3", active: false, title: "ARK Setup", template: "39450275", members: 15, servers: 5, storage: 200, ram: 24, cpu: 18 },
  { id: "4", active: false, title: "Backup System", template: "11223344", members: 5, servers: 1, storage: 150, ram: 8, cpu: 5 },
  { id: "5", active: false, title: "Dev Cluster", template: "55667788", members: 10, servers: 2, storage: 160, ram: 32, cpu: 20 },
];

// ----------------------------------------
// 🔹 Cache Variablen
// ----------------------------------------

let cachedUserAccount: UserAccount | null = null;
let cachedSessions: Session[] | null = null;
let cachedProjects: Project[] | null = null;

// ----------------------------------------
// 🔹 User Account
// ----------------------------------------

export function getUserAccount(): Promise<UserAccount> {
  if (cachedUserAccount) {
    return Promise.resolve(cachedUserAccount);
  }
  return Promise.resolve({ ...userAccount }).then(data => {
    cachedUserAccount = data;
    return data;
  });
}

export function updateUserAccount(data: Partial<UserAccount>): Promise<UserAccount> {
  userAccount = { ...userAccount, ...data };
  cachedUserAccount = { ...userAccount }; // Cache aktualisieren
  return Promise.resolve({ ...userAccount });
}

// ----------------------------------------
// 🔹 Sessions
// ----------------------------------------

export function getSessions(): Promise<Session[]> {
  if (cachedSessions) {
    return Promise.resolve(cachedSessions);
  }
  return Promise.resolve([...sessions]).then(data => {
    cachedSessions = data;
    return data;
  });
}

export function logoutSession(id: number): Promise<Session[]> {
  sessions = sessions.filter((s) => s.id !== id);
  cachedSessions = [...sessions]; // Cache aktualisieren
  return Promise.resolve(cachedSessions);
}

export function logoutAllOtherSessions(): Promise<Session[]> {
  sessions = sessions.filter((s) => s.current);
  cachedSessions = [...sessions]; // Cache aktualisieren
  return Promise.resolve(cachedSessions);
}

// ----------------------------------------
// 🔹 Projects
// ----------------------------------------

export function getProjects(): Promise<Project[]> {
  if (cachedProjects) {
    return Promise.resolve(cachedProjects);
  }
  return Promise.resolve([...projects]).then(data => {
    cachedProjects = data;
    return data;
  });
}

export function getActiveProjects(): Promise<Project[]> {
  // Wenn Projekte schon gecached sind, filtern wir einfach
  if (cachedProjects) {
    return Promise.resolve(cachedProjects.filter(p => p.active));
  }
  return getProjects().then(projects => projects.filter(p => p.active));
}

export function addProject(newProject: Project): Promise<Project[]> {
  projects.push(newProject);
  cachedProjects = [...projects]; // Cache aktualisieren
  return Promise.resolve(cachedProjects);
}

export function deleteProject(id: string): Promise<Project[]> {
  projects = projects.filter(project => project.id !== id);
  cachedProjects = [...projects]; // Cache aktualisieren
  return Promise.resolve(cachedProjects);
}

export function toggleProjectActive(id: string): Promise<Project[]> {
  projects = projects.map(project => project.id === id ? { ...project, active: !project.active } : project);
  cachedProjects = [...projects]; // Cache aktualisieren
  return Promise.resolve(cachedProjects);
}

export function deactivateAllProjects(): Promise<Project[]> {
  projects = projects.map(project => ({ ...project, active: false }));
  cachedProjects = [...projects]; // Cache aktualisieren
  return Promise.resolve(cachedProjects);
}

// ----------------------------------------
// 🔹 Aggregated Resource Usage
// ----------------------------------------

export function getUsedResources(): Promise<ResourceUsage> {
  // Nutze gecachte Projekte, wenn vorhanden
  const sourceProjects = cachedProjects || projects;
  const storage = sourceProjects.reduce((sum, p) => sum + p.storage, 0);
  const ram = sourceProjects.reduce((sum, p) => sum + p.ram, 0);
  const cpu = sourceProjects.reduce((sum, p) => sum + p.cpu, 0);
  return Promise.resolve({ storage, ram, cpu });
}