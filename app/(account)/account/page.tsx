"use client";

import { useEffect, useState } from "react";
import {
  getUserAccount,
  getSessions,
  logoutSession,
  logoutAllOtherSessions,
  Session,
} from "@/lib/services/accountService";

import ProfileCard from "@/components/account/profile-card";
import SecurityCard from "@/components/account/security-card";
import PlanCard from "@/components/account/plan-card";
import ActivityCard from "@/components/account/activity-card";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [zenth, setZenth] = useState(0);
  const [ram, setRam] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [storage, setStorage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [storageUsage, setStorageUsage] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    getUserAccount().then((account) => {
      setEmail(account.email);
      setUsername(account.username);
      setName(account.name);
      setAddress(account.address);
      setTwoFactorEnabled(account.twoFactorEnabled);
      setZenth(account.zenth);
      setRam(account.ram);
      setRamUsage(account.ramUsage);
      setCpu(account.cpu);
      setCpuUsage(account.cpuUsage);
      setStorage(account.storage);
      setStorageUsage(account.storageUsage);
    });
    getSessions().then(setSessions);
  }, []);

  return (
    <div className="relative flex flex-col gap-6 px-[1rem] md:pl-[15rem] sm:px-[3rem] w-full h-full overflow-y-scroll overflow-x-hidden transition-[padding] duration-300 ease-in-out py-7">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Account Overview</h1>
          <p className="text-sm text-gray-400">
            View and manage your account details and security preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-white text-xl font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">{username}</p>
              <div className="text-neutral-300 text-sm font-semibold flex items-center gap-1">
                {zenth} Zenth{" "}
                <span className="text-neutral-400 font-normal">
                  ({(zenth / 100).toFixed(2)} €)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ProfileCard
          email={email}
          username={username}
          name={name}
          address={address}
          setEmail={setEmail}
          setUsername={setUsername}
          setName={setName}
          setAddress={setAddress}
        />
        <SecurityCard
          username={username}
          twoFactorEnabled={twoFactorEnabled}
          setTwoFactorEnabled={setTwoFactorEnabled}
        />
        <PlanCard
          ram={ram}
          cpu={cpu}
          storage={storage}
          ramUsage={ramUsage}
          cpuUsage={cpuUsage}
          storageUsage={storageUsage}
        />
        <ActivityCard
          sessions={sessions}
          handleLogoutSession={logoutSession}
          handleLogoutAllOtherSessions={logoutAllOtherSessions}
        />
      </div>
    </div>
  );
}