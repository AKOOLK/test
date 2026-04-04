'use client';

import { useOSStore } from '@/lib/store';

interface DockItem {
  id: string;
  icon: string;
  label: string;
  color: string;
  isTerminal?: boolean;
}

const dockItems: DockItem[] = [
  { id: 'terminal', icon: '💻', label: 'Terminal', color: 'from-gray-700 to-gray-900' },
  { id: 'about', icon: '🐱', label: 'About Me', color: 'from-pink-400 to-rose-500' },
  { id: 'skills', icon: '⚔️', label: 'Skills', color: 'from-violet-500 to-purple-600' },
  { id: 'projects', icon: '📚', label: 'Projects', color: 'from-blue-400 to-indigo-500' },
  { id: 'ctf', icon: '🎯', label: 'CTF Arena', color: 'from-amber-400 to-orange-500' },
  { id: 'certs', icon: '✨', label: 'Achievements', color: 'from-emerald-400 to-teal-500' },
  { id: 'contact', icon: '💌', label: 'Contact', color: 'from-pink-400 to-fuchsia-500' },
];

interface DockProps {
  onOpenTerminal: () => void;
}

export default function Dock({ onOpenTerminal }: DockProps) {
  const { windows, openWindow, focusWindow } = useOSStore();

  const handleClick = (item: DockItem) => {
    if (item.isTerminal || item.id === 'terminal') {
      onOpenTerminal();
      return;
    }
    const win = windows.find((w) => w.id === item.id);
    if (win?.isOpen) {
      focusWindow(item.id);
    } else {
      openWindow(item.id);
    }
  };

  const isOpen = (id: string) => {
    if (id === 'terminal') {
      return windows.some((w) => w.id === 'terminal' && w.isOpen);
    }
    return windows.some((w) => w.id === id && w.isOpen);
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[997]">
      <div className="glass rounded-2xl px-2 py-1.5 dock-shadow flex items-end gap-1.5">
        {dockItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center group relative">
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-foreground/80 text-white text-[11px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </div>
            {/* Icon */}
            <button
              onClick={() => handleClick(item)}
              className="relative"
            >
              <div
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-[16px]
                  bg-gradient-to-br ${item.color}
                  flex items-center justify-center text-2xl sm:text-3xl
                  shadow-md hover:shadow-lg
                  transition-all duration-200 ease-out
                  group-hover:scale-[1.35] group-hover:-translate-y-3
                  active:scale-95
                  cursor-pointer
                `}
              >
                {item.icon}
              </div>
              {/* Open indicator dot */}
              {isOpen(item.id) && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/50" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
