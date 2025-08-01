"use client";

import { X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import TwoFAModal from "@/components/account/2fa-modal";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  username: string;
  onSubmit2FA: (code: string) => Promise<boolean>;
};

export default function DeleteAccountModal({ onClose, onConfirm, username, onSubmit2FA }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [show2FAInput, setShow2FAInput] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setInput("");
      setError("");
      setShow2FAInput(false);
    }, 300);
  };

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmClick = () => {
    if (input.trim() !== username) {
      setError("Account name does not match.");
      return;
    }
    setError("");
    setIsVisible(false);
    setShow2FAInput(true);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-neutral-900 rounded-lg shadow-lg w-[30rem] p-6 relative transform transition-all duration-300 ${
            isVisible ? "scale-100" : "scale-95 opacity-0"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-all duration-100"
            aria-label="Close modal"
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-2 text-white">Confirm Account Deletion</h2>
          <p className="text-white text-sm mb-3">
            This will permanently delete your account <strong>{username}</strong> and all associated data. This action cannot be undone.
          </p>

          <div className="mb-3">
            <div
              onClick={copied ? undefined : handleCopy}
              className={`inline-flex items-center gap-2 select-none px-3 py-1 rounded-full text-xs transition-all duration-300 ease-in-out transform origin-center ${
                copied
                  ? "bg-neutral-700 text-white cursor-pointer hover:bg-neutral-600 active:scale-95 pl-3 pr-2"
                  : "bg-neutral-700 text-white cursor-pointer hover:bg-neutral-600 active:scale-95"
              }`}
              style={{ minWidth: copied ? "100px" : "80px" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !copied) handleCopy();
              }}
            >
              {username}
              {copied && (
                <span
                  className="inline-block text-green-400"
                  style={{
                    animation: "popScale 0.3s ease forwards",
                    transformOrigin: "center",
                  }}
                >
                  <Check className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="confirmInput" className="text-sm mb-1 text-white">
              To confirm, type your account name exactly:
            </label>
            <input
              id="confirmInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border border-neutral-700 p-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-transparent"
              placeholder={username}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            onClick={handleConfirmClick}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all w-full"
          >
            Confirm Deletion
          </button>
        </div>
      </div>

      {show2FAInput && (
        <TwoFAModal
          onClose={() => {setShow2FAInput(false), onClose()}}
          onSubmit={async (code): Promise<boolean> => {
            const success = await onSubmit2FA(code);
            if (success) {
              setTimeout(() => setShow2FAInput(false), 300);
              onClose()
            } else {
              setError("Invalid 2FA code.");
            }
            return success;
          }}
        />
      )}


      <style jsx>{`
        @keyframes popScale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}