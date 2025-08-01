import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
  usedStorage: number;
  totalStorage: number;
};

export default function NewProjectModal({ onClose, usedStorage, totalStorage }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('My Project');
  const [storage, setStorage] = useState('15');
  const [template, setTemplate] = useState('');
  const [errors, setErrors] = useState<{ name?: string; storage?: string; template?: string }>({});
  const router = useRouter();

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const freeSpace = totalStorage - usedStorage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; storage?: string; template?: string } = {};

    if (!name.trim()) newErrors.name = 'Project name is required.';

    const storageValue = parseInt(storage);
    if (!storage || isNaN(storageValue) || storageValue < 15) {
      newErrors.storage = 'Storage must be at least 15GB.';
    } else if (storageValue > freeSpace) {
      newErrors.storage = `Not enough free space. You only have ${freeSpace} GB left.`;
    }

    if (template && isNaN(Number(template))) {
      newErrors.template = 'Template must be a number if provided.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const encodedName = encodeURIComponent(name.trim());
    router.push(`/account/projects/create?name=${encodedName}&storage=${storageValue}&template=${template}`);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-neutral-900 rounded-lg shadow-lg w-[30rem] p-6 relative transform transition-all duration-300 ${
          isVisible ? 'scale-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-all duration-100"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">Create a New Project</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="projectName" className="text-sm mb-1 text-white">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="storage" className="text-sm mb-1 text-white">
              Storage (GB)
              <span className="text-xs text-gray-400 ml-1">(Minimum: 15 GB)</span>
            </label>
            <input
              id="storage"
              type="number"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="border p-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-transparent"
              placeholder="Min. 15"
            />
            {errors.storage && (
              <p className="text-red-500 text-sm mt-1">{errors.storage}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="template" className="text-sm mb-1 text-white">
              Template
              <span className="text-xs text-gray-400 ml-1">(Optional)</span>
            </label>
            <input
              id="template"
              type="text"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="border p-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-transparent"
              placeholder="Enter Template"
            />
            {errors.template && (
              <p className="text-red-500 text-sm mt-1">{errors.template}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded transition-all duration-100 hover:bg-green-700 text-center w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
