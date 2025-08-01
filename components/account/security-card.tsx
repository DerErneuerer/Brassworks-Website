"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Trash2, LogOut } from "lucide-react";
import { updateUserProfile } from "@/lib/services/accountService";
import TwoFAModal from "@/components/account/2fa-modal";
import DeleteAccountModal from "@/components/account/delete-account-modal";
import { z } from "zod";

interface SecurityCardProps {
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (val: boolean) => void;
  username: string;
}

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." });

async function checkOldPassword(oldPassword: string): Promise<boolean> {
  console.log("Checking old password:", oldPassword);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return oldPassword === "correctPassword";
}

export default function SecurityCard({ twoFactorEnabled, setTwoFactorEnabled, username }: SecurityCardProps) {
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<boolean | null>(null);
  const [passwordChangePending, setPasswordChangePending] = useState<{ oldPassword: string; newPassword: string } | null>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalUnmountTimer, setDeleteModalUnmountTimer] = useState<NodeJS.Timeout | null>(null);

  const onTwoFactorChange = (checked: boolean) => {
    setPendingToggle(checked);
    setShow2FAModal(true);
  };

  const handlePasswordChange = async () => {
    setPasswordError(null);

    if (!oldPassword || !newPassword) {
      setPasswordError("Please fill in both password fields.");
      return;
    }

    const validation = passwordSchema.safeParse(newPassword);
    if (!validation.success) {
      setPasswordError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    const isOldPasswordValid = await checkOldPassword(oldPassword);
    setLoading(false);

    if (!isOldPasswordValid) {
      setPasswordError("Old password is incorrect.");
      return;
    }

    if (twoFactorEnabled) {
      setPasswordChangePending({ oldPassword, newPassword });
      setShow2FAModal(true);
    } else {
      await sendPasswordUpdate(oldPassword, newPassword);
    }
  };

  const sendPasswordUpdate = async (oldPass: string, newPass: string) => {
    console.log("Password would be updated with:", oldPass, newPass);
    setOldPassword("");
    setNewPassword("");
  };

  const handle2FASubmit = async (code: string): Promise<boolean> => {
    try {
      if (pendingToggle !== null) {
        await updateUserProfile({ twoFactorEnabled: pendingToggle });
        setTwoFactorEnabled(pendingToggle);
        setPendingToggle(null);
      }

      if (passwordChangePending) {
        await sendPasswordUpdate(passwordChangePending.oldPassword, passwordChangePending.newPassword);
        setPasswordChangePending(null);
      }

      setTimeout(() => setShow2FAModal(false), 300);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDeleteAccountClose = () => {
    const timer = setTimeout(() => setDeleteModalVisible(false), 300);
    setDeleteModalUnmountTimer(timer);
  };

  const handleDeleteAccountConfirm = () => {
    console.log("Account deletion confirmed.");
    const timer = setTimeout(() => setDeleteModalVisible(false), 300);
    setDeleteModalUnmountTimer(timer);
  };

  const handleDeleteAccount2FASubmit = async (code: string): Promise<boolean> => {
    try {
      console.log("2FA code for deletion:", code);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    return () => {
      if (deleteModalUnmountTimer) {
        clearTimeout(deleteModalUnmountTimer);
      }
    };
  }, [deleteModalUnmountTimer]);

  return (
    <>
      <Card className="bg-neutral-800 text-white">
        <CardContent className="p-5 flex flex-col gap-5">
          <h2 className="text-lg leading-none font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Security
          </h2>

          <div className="flex items-center justify-between">
            <p className="text-sm text-white">Two-Factor Authentication</p>
            <Switch checked={twoFactorEnabled} onCheckedChange={onTwoFactorChange} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Change Password</p>
            <Input
              type="password"
              placeholder="Old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-neutral-700 text-white border-neutral-600"
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-neutral-700 text-white border-neutral-600"
              disabled={loading}
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <Button className="w-fit" onClick={handlePasswordChange} disabled={loading}>
              {loading ? "Checking..." : "Update Password"}
            </Button>
          </div>

          <div>
            <p className="text-sm mb-2 mt-1 text-red-400 font-semibold">Danger Zone</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="destructive"
                className="flex items-center gap-2 w-40"
                onClick={() => {
                  if (deleteModalUnmountTimer) {
                    clearTimeout(deleteModalUnmountTimer);
                    setDeleteModalUnmountTimer(null);
                  }
                  setDeleteModalVisible(true);
                }}
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </Button>
              <Button variant="secondary" className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white w-40">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {show2FAModal && (
        <TwoFAModal
          onClose={() => {
            setShow2FAModal(false);
            setPendingToggle(null);
            setPasswordChangePending(null);
          }}
          onSubmit={handle2FASubmit}
        />
      )}

      {deleteModalVisible && (
        <DeleteAccountModal
          onClose={handleDeleteAccountClose}
          onConfirm={handleDeleteAccountConfirm}
          username={username}
          onSubmit2FA={handleDeleteAccount2FASubmit}
        />
      )}
    </>
  );
}