'use client';

import { useOSStore } from '@/lib/store';

interface DesktopIconProps {
  id: string;
  icon: string;
  label: string;
}

export default function DesktopIcon({ id, icon, label }: DesktopIconProps) {
  const { openWindow, focusWindow, windows } = useOSStore();
  const win = windows.find((w) => w.id === id);

  const handleClick = () => {
    if (win?.isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-150 group w-24 select-none"
      title={label}
    >
      <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-150 drop-shadow-lg">
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs text-green-300 font-mono text-center leading-tight drop-shadow-md">
        {label}
      </span>
    </button>
  );
}
