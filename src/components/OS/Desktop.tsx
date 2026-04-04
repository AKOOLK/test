'use client';

import { useCallback, useMemo, useState } from 'react';
import { useOSStore } from '@/lib/store';
import BootScreen from './BootScreen';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import Terminal from './Terminal';
import AboutWindow from './AboutWindow';
import SkillsWindow from './SkillsWindow';
import ProjectsWindow from './ProjectsWindow';
import CTFWindow from './CTFWindow';
import CertsWindow from './CertsWindow';
import ContactWindow from './ContactWindow';

const desktopIcons = [
  { id: 'about', icon: '👤', label: 'about_me.sys' },
  { id: 'skills', icon: '🛡️', label: 'skill_scan.exe' },
  { id: 'projects', icon: '📁', label: 'project_db.dat' },
  { id: 'ctf', icon: '🏴', label: 'ctf_scores.log' },
  { id: 'certs', icon: '📜', label: 'certificates.crt' },
  { id: 'contact', icon: '📡', label: 'secure_comms.sh' },
];

function getWindowContent(id: string) {
  switch (id) {
    case 'about':
      return <AboutWindow />;
    case 'skills':
      return <SkillsWindow />;
    case 'projects':
      return <ProjectsWindow />;
    case 'ctf':
      return <CTFWindow />;
    case 'certs':
      return <CertsWindow />;
    case 'contact':
      return <ContactWindow />;
    default:
      return null;
  }
}

export default function Desktop() {
  const { booted, setBoot, windows, openWindow } = useOSStore();
  const [showDesktop, setShowDesktop] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 3,
      })),
    []
  );

  const handleBootComplete = useCallback(() => {
    setBoot(true);
    setTimeout(() => setShowDesktop(true), 100);
  }, [setBoot]);

  const handleOpenTerminal = useCallback(() => {
    // Check if terminal window exists
    const existing = useOSStore.getState().windows.find((w) => w.id === 'terminal');
    if (existing) {
      useOSStore.getState().openWindow('terminal');
    } else {
      // Add terminal window dynamically
      useOSStore.setState((state) => ({
        windows: [
          ...state.windows,
          {
            id: 'terminal',
            title: 'agent@cyberos: ~',
            icon: '⬛',
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: state.nextZIndex + 1,
            position: { x: 60, y: 40 },
            size: { width: 720, height: 480 },
          },
        ],
        nextZIndex: state.nextZIndex + 1,
      }));
    }
  }, []);

  const visibleWindows = windows.filter((w) => w.isOpen);

  return (
    <div className="fixed inset-0 bg-[#0a0e14] overflow-hidden select-none">
      {/* Boot Screen */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Desktop Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-cyan-900/10" />
        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-green-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              opacity: 0.15,
            }}
          />
        ))}
        {/* Scanline */}
        <div className="absolute inset-0 scanline pointer-events-none" />
      </div>

      {/* Desktop Content */}
      <div
        className={`relative z-10 h-full transition-opacity duration-500 ${
          showDesktop ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Desktop Icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Terminal icon always first */}
          <button
            onClick={handleOpenTerminal}
            onDoubleClick={handleOpenTerminal}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-150 group w-24"
          >
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-150 drop-shadow-lg">
              ⬛
            </div>
            <span className="text-[10px] sm:text-xs text-green-300 font-mono text-center leading-tight drop-shadow-md">
              terminal.sh
            </span>
          </button>

          {desktopIcons.map((item) => (
            <DesktopIcon key={item.id} id={item.id} icon={item.icon} label={item.label} />
          ))}
        </div>

        {/* Windows */}
        {visibleWindows.map((win) => (
          <Window key={win.id} id={win.id}>
            {win.id === 'terminal' ? <Terminal /> : getWindowContent(win.id)}
          </Window>
        ))}

        {/* Taskbar */}
        <Taskbar onOpenTerminal={handleOpenTerminal} />
      </div>
    </div>
  );
}
