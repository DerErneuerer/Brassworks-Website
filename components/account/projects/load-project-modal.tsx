"use client";

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
  action: 'activate' | 'deactivate';
};

export default function LoadProjectModal({ onClose, onConfirm, projectName, action }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const title = action === 'activate' ? 'Activate Project' : 'Deactivate Project';
  const confirmText = action === 'activate' ? 'Activate Project' : 'Deactivate Project';
  const description = action === 'activate' 
    ? `Are you sure you want to activate "${projectName}"? You can have multiple active projects.`
    : `Are you sure you want to deactivate "${projectName}"?`;

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-neutral-900 rounded-lg shadow-lg w-[30rem] p-6 relative transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95 opacity-0'}`}>
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-all duration-100"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
        <p className="text-white mb-4">
          {description}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 flex-1 bg-neutral-700 text-white rounded hover:bg-neutral-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onConfirm, 300);
            }}
            className={`px-4 py-2 flex-1 ${
              action === 'activate' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            } text-white rounded`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}