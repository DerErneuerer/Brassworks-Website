"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, MapPin, User } from "lucide-react";
import TwoFAModal from "@/components/account/2fa-modal";
import { Session } from "@/lib/services/accountService";

interface ActivityCardProps {
  sessions: Session[];
  handleLogoutSession: (id: number, code: string) => Promise<Session[]>;
  handleLogoutAllOtherSessions: (code: string) => Promise<Session[]>;
}

export default function ActivityCard({ sessions, handleLogoutSession, handleLogoutAllOtherSessions }: ActivityCardProps) {
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [pendingLogoutId, setPendingLogoutId] = useState<number | null>(null);
  const [logoutAllOthers, setLogoutAllOthers] = useState(false);

  const open2FAModalForSession = (sessionId: number) => {
    setPendingLogoutId(sessionId);
    setLogoutAllOthers(false);
    setShow2FAModal(true);
  };

  const open2FAModalForAll = () => {
    setLogoutAllOthers(true);
    setPendingLogoutId(null);
    setShow2FAModal(true);
  };

  const handle2FASubmit = async (code: string): Promise<boolean> => {
    try {
      if (logoutAllOthers) {
        await handleLogoutAllOtherSessions(code);
      } else if (pendingLogoutId !== null) {
        await handleLogoutSession(pendingLogoutId, code);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Card className="bg-neutral-800 text-white md:col-span-2 xl:col-span-3">
        <CardContent className="p-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CalendarClock className="w-5 h-5" /> Recent Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <CalendarClock className="w-4 h-4" /> Last Login: May 27, 2025 – 18:45
            </div>
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> IP Address: 192.168.0.24
            </div>
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4" /> Sessions Active: {sessions.length}
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-3">Active Sessions</h3>
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex flex-col md:flex-row md:items-center justify-between p-3 mb-2 rounded bg-neutral-700 ${
                  session.current ? "border-2 border-green-600" : ""
                }`}
              >
                <div>
                  <p className="font-semibold">{session.device}</p>
                  <p className="text-sm text-gray-400">IP: {session.ip}</p>
                  <p className="text-xs text-gray-500">Last Active: {session.lastActive}</p>
                  {session.current && (
                    <p className="text-xs text-green-400 font-semibold">Current Session</p>
                  )}
                </div>
                {!session.current && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="mt-2 md:mt-0"
                    onClick={() => open2FAModalForSession(session.id)}
                  >
                    Log out
                  </Button>
                )}
              </div>
            ))}
            {sessions.length > 1 && (
              <Button
                variant="destructive"
                className="mt-2 w-full md:w-auto text-xs sm:text-sm"
                onClick={open2FAModalForAll}
              >
                Log out of all other sessions
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {show2FAModal && (
        <TwoFAModal
          onClose={() => setShow2FAModal(false)}
          onSubmit={handle2FASubmit}
        />
      )}
    </>
  );
}