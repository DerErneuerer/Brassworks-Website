"use client"

import { Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-700 text-sm text-gray-200 p-4 rounded-sm border border-gray-300">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-green-600 hover:text-green-500"
      >
        <Copy size={16} />
      </button>
      {copied && (
        <span className="absolute top-2 right-8 text-xs text-green-600">
          Copied!
        </span>
      )}
      <pre className="overflow-auto whitespace-pre-wrap">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}