export function AccentBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-300 text-neutral-900 border-l-4 border-green-500 p-4 rounded-sm">
      {children}
    </div>
  );
}