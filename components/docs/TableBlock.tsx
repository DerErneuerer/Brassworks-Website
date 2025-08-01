"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export function TableBlock({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
    const [copied, setCopied] = useState(false);
  
    console.log('Headers:', headers);
    console.log('Rows:', rows);
  
    const handleCopy = () => {
      const tableText = rows.map(row => row.join("\t")).join("\n");
      navigator.clipboard.writeText(tableText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <div className="relative overflow-x-auto rounded-sm border bg-stone-90w0">
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
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  