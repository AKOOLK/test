'use client';

import { useEffect, useState } from 'react';
import { useOSStore } from '@/lib/store';
import { Terminal, FolderOpen, Shield, Trophy, FileText, Radio } from 'lucide-react';

interface TaskbarProps {
  onOpenTerminal: () => void;
}

export default function Taskbar({ onOpenTerminal }: TaskbarProps) {
  const { windows, openWindow, focusWindow, minimizeWindow, startMenuOpen, setStartMenuOpen } =
    useOSStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <>
      {/* Start Menu */}
      {startMenuOpen && (
        <>
          <div className="fixed inset-0 z-[998]" onClick={() => setStartMenuOpen(false)} />
          <div className="fixed bottom-14 left-2 z-[999] bg-[#0d1117]/95 backdrop-blur-xl border border-green-900/50 rounded-lg p-3 min-w-[220px] shadow-2xl shadow-black/70">
            <div className="text-green-400 font-mono text-xs mb-3 px-2 border-b border-green-900/50 pb-2">
              &gt; CyberOS Start Menu
            </div>
            <div className="space-y-1">
              <StartMenuItem icon={<Terminal size={16} />} label="Terminal" onClick={() => { onOpenTerminal(); setStartMenuOpen(false); }} />
              <StartMenuItem icon={<FolderOpen size={16} />} label="Projects" onClick={() => { openWindow('projects'); setStartMenuOpen(false); }} />
              <StartMenuItem icon={<Shield size={16} />} label="Skills" onClick={() => { openWindow('skills'); setStartMenuOpen(false); }} />
              <StartMenuItem icon={<Trophy size={16} />} label="CTF Scoreboard" onClick={() => { openWindow('ctf'); setStartMenuOpen(false); }} />
              <StartMenuItem icon={<FileText size={16} />} label="Certificates" onClick={() => { openWindow('certs'); setStartMenuOpen(false); }} />
              <StartMenuItem icon={<Radio size={16} />} label="Contact" onClick={() => { openWindow('contact'); setStartMenuOpen(false); }} />
            </div>
            <div className="mt-3 pt-2 border-t border-green-900/50 text-red-400 font-mono text-[10px] px-2">
              &gt; System: CyberOS v3.7.1
            </div>
          </div>
        </>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[997] h-12 bg-[#0d1117]/90 backdrop-blur-xl border-t border-green-900/50 flex items-center px-2 gap-1">
        {/* Start button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`h-9 px-3 flex items-center gap-2 rounded-md text-xs font-mono transition-all ${
            startMenuOpen
              ? 'bg-green-900/40 text-green-400'
              : 'hover:bg-white/10 text-green-300'
          }`}
        >
          <span className="text-lg">&gt;_</span>
          <span className="hidden sm:inline">Start</span>
        </button>

        <div className="w-px h-6 bg-green-900/50 mx-1" />

        {/* Running windows */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {openWindows.map((win) => (
            <button
              key={win.id}
              onClick={() => {
                if (win.isMinimized) {
                  useOSStore.getState().openWindow(win.id);
                } else {
                  focusWindow(win.id);
                }
              }}
              className={`h-9 px-3 flex items-center gap-2 rounded-md text-xs font-mono transition-all whitespace-nowrap ${
                win.isMinimized
                  ? 'bg-white/5 text-green-600'
                  : 'bg-green-900/30 text-green-400 border border-green-800/30'
              }`}
            >
              <span>{win.icon}</span>
              <span className="hidden md:inline max-w-[120px] truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="flex items-center gap-3 text-xs font-mono text-green-400/70">
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px]">SECURE</span>
          </div>
          <div className="w-px h-6 bg-green-900/50" />
          <div className="text-right">
            <div className="text-[10px] text-green-400/50">
              {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-green-400">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StartMenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-green-900/30 text-green-300 hover:text-green-400 text-xs font-mono transition-all"
    >
      <span className="text-green-400">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
