"use client";

import { useState, useMemo, useEffect } from "react";
import ProjectStats from "@/components/account/projects/project-stats";
import ProjectFilters from "@/components/account/projects/project-filters";
import ProjectList from "@/components/account/projects/project-list";
import DeleteProjectModal from "@/components/account/projects/delete-project-modal";
import NewProjectModal from "@/components/account/projects/new-project-modal";
import LoadProjectModal from "@/components/account/projects/load-project-modal";

import {
  getProjects,
  getActiveProjects,
  deleteProject,
  toggleProjectActive,
  Project,
  UserAccount,
  getUserAccount,
} from "@/lib/services/accountService";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [loadTargetId, setLoadTargetId] = useState<string | null>(null);
  const [deactivateTargetId, setDeactivateTargetId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("default");
  const [resources, setResources] = useState({ storage: 0, ram: 0, cpu: 0 });
  const [usedResources, setUsedResources] = useState({ storage: 0, ram: 0, cpu: 0 });
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [projs, active, user] = await Promise.all([
        getProjects(),
        getActiveProjects(),
        getUserAccount()
      ]);
      setProjects(projs);
      setActiveProjects(active);
      setUserAccount(user);
      setResources({storage: user.storage, ram: user.ram, cpu: user.cpu})
      setUsedResources({storage: user.storageUsage, ram: user.ramUsage, cpu: user.cpuUsage})
    }
    fetchData();
  }, []);

  const refreshData = async () => {
    const [projs, active, user] = await Promise.all([
      getProjects(),
      getActiveProjects(),
      getUserAccount()
    ]);
    setProjects(projs);
    setActiveProjects(active);
    setResources({storage: user.storage, ram: user.ram, cpu: user.cpu})
    setUsedResources({storage: user.storageUsage, ram: user.ramUsage, cpu: user.cpuUsage})
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setDeleteTargetId(null);
    await refreshData();
  };

  const handleActivateProject = async (id: string) => {
    await toggleProjectActive(id);
    setLoadTargetId(null);
    await refreshData();
  };

  const handleDeactivateProject = async (id: string) => {
    await toggleProjectActive(id);
    setDeactivateTargetId(null);
    await refreshData();
  };

  const filteredAndSortedProjects = useMemo(() => {
    let result = projects.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortKey) {
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "ram":
        result.sort((a, b) => b.ram - a.ram);
        break;
      case "storage":
        result.sort((a, b) => b.storage - a.storage);
        break;
      case "cpu":
        result.sort((a, b) => b.cpu - a.cpu);
        break;
    }

    result.sort((a, b) => (b.active === a.active ? 0 : b.active ? 1 : -1));
    return result;
  }, [projects, searchTerm, sortKey]);

  const deleteTargetProject = projects.find((p) => p.id === deleteTargetId);
  const loadTargetProject = projects.find((p) => p.id === loadTargetId);
  const deactivateTargetProject = projects.find((p) => p.id === deactivateTargetId);

  return (
    <div className="relative flex flex-col gap-6 px-[1rem] sm:px-[3rem] md:pl-[15rem] w-full h-full overflow-y-auto transition-[padding] duration-300 ease-in-out pt-7">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Project Management</h1>
          <p className="text-sm text-gray-400">
            View and manage your projects, resource allocation and settings
          </p>
        </div>
      </div>

      <ProjectFilters {...{ searchTerm, setSearchTerm, sortKey, setSortKey }} />
      <ProjectStats
        storageUsage={usedResources.storage}
        ramUsage={usedResources.ram}
        cpuUsage={usedResources.cpu}
        storage={userAccount?.storage ?? 240}
        ram={userAccount?.ram ?? 16}
        cpu={userAccount?.cpu ?? 8}
        activeProjectsLenght={activeProjects.length}
      />

      <ProjectList
        projects={filteredAndSortedProjects}
        onDelete={setDeleteTargetId}
        onLoad={setLoadTargetId}
        onDeactivate={setDeactivateTargetId}
        onCreateNew={() => setShowModal(true)}
      />

      {showModal && userAccount && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          usedStorage={usedResources.storage}
          totalStorage={userAccount.storage}
        />
      )}
      {deleteTargetProject && (
        <DeleteProjectModal
          onClose={() => setDeleteTargetId(null)}
          onConfirm={() => handleDelete(deleteTargetProject.id)}
          projectName={deleteTargetProject.title}
        />
      )}
      {loadTargetProject && (
        <LoadProjectModal
          onClose={() => setLoadTargetId(null)}
          onConfirm={() => handleActivateProject(loadTargetProject.id)}
          projectName={loadTargetProject.title}
          action="activate"
        />
      )}
      {deactivateTargetProject && (
        <LoadProjectModal
          onClose={() => setDeactivateTargetId(null)}
          onConfirm={() => handleDeactivateProject(deactivateTargetProject.id)}
          projectName={deactivateTargetProject.title}
          action="deactivate"
        />
      )}
    </div>
  );
}