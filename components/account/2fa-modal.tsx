import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onClose: () => void;
  onSubmit: (code: string) => Promise<boolean>;  // Promise<boolean> erwartet
};

export default function TwoFAModal({ onClose, onSubmit }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
      const firstEmptyIndex = code.findIndex((c) => c === '');
      if (firstEmptyIndex !== -1) {
        inputsRef.current[firstEmptyIndex]?.focus();
      } else {
        inputsRef.current[5]?.focus();
      }
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];

    if (value.length > 1) {
      const chars = value.slice(0, 6).split('');
      chars.forEach((char, i) => {
        newCode[i] = char;
        if (inputsRef.current[i]) {
          inputsRef.current[i]!.value = char;
        }
      });
      setCode(newCode);
      inputsRef.current[Math.min(chars.length, 5)]?.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 0) return;

    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = pasted[i];
      }
    }

    setCode(newCode);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const joined = code.join('');
    if (joined.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }
    setError('');

    const success = await onSubmit(joined);

    if (success) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    } else {
      setError('Invalid code, please try again.');
    }
  };

  const handleFocusReset = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      focusFirstEmptyInput();
      e.preventDefault();
      return;
    }

    if (
      (e.currentTarget as HTMLElement).contains(e.target as Node) &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLButtonElement)
    ) {
      focusFirstEmptyInput();
      e.preventDefault();
    }
  };

  const focusFirstEmptyInput = () => {
    const firstEmptyIndex = code.findIndex((c) => c === '');
    if (firstEmptyIndex !== -1) {
      inputsRef.current[firstEmptyIndex]?.focus();
    } else {
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div
      onMouseDown={handleFocusReset}
      className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-neutral-900 rounded-lg shadow-lg w-[22rem] p-5 relative transform transition-all duration-300 ${
          isVisible ? 'scale-100' : 'scale-95 opacity-0'
        }`}
        onMouseDown={handleFocusReset}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-all duration-100"
          aria-label="Close modal"
        >
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-1 text-white text-center">Enter Authentication Code</h2>
        <p className="text-xs text-gray-400 text-center mb-4">
          We've sent a 6-digit code to your email address
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
          <div className="flex justify-between gap-1">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-10 h-12 text-center text-xl rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded transition-all duration-100 hover:bg-green-700 text-center w-full mt-1"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}