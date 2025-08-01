"use client";

import { X, Check } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
};

export default function DeleteProjectModal({ onClose, onConfirm, projectName }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    if (input.trim() !== projectName) {
      setError("Project name does not match.");
      return;
    }

    setError("");
    onConfirm();
    handleClose();
  };

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(projectName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-2 text-white">Confirm Deletion</h2>
          <p className="text-white text-sm mb-3">
            This will permanently delete the following project and all associated data. This action cannot be undone.
          </p>

          <div className="mb-3">
            <div
              onClick={copied ? undefined : handleCopy}
              className={`inline-flex items-center gap-2 select-none px-3 py-1 rounded-full text-xs transition-all duration-300 ease-in-out transform origin-center ${
                copied
                  ? "bg-neutral-700 text-white cursor-pointer hover:bg-neutral-600 active:scale-95 pl-3 pr-2"
                  : "bg-neutral-700 text-white cursor-pointer hover:bg-neutral-600 active:scale-95"
              }`}
              style={{
                minWidth: copied ? "100px" : "80px",
              }}
            >
              {projectName}
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
              To confirm, type the project name exactly:
            </label>
            <input
              id="confirmInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border border-neutral-700 p-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-transparent"
              placeholder={projectName}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all w-full"
          >
            Delete Project
          </button>
        </div>
      </div>

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