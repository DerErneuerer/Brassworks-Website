import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom';
}

const Tooltip = ({ children, text, position = 'top' }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${
          position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        } left-1/2 transform -translate-x-1/2 w-max max-w-[15rem] p-2 text-xs text-white bg-stone-900 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;