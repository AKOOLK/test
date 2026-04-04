'use client';

import { useCallback, useMemo, useState } from 'react';
import { useOSStore } from '@/lib/store';
import BootScreen from './BootScreen';
import Window from './Window';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Terminal from './Terminal';
import AboutWindow from './AboutWindow';
import SkillsWindow from './SkillsWindow';
import ProjectsWindow from './ProjectsWindow';
import CTFWindow from './CTFWindow';
import CertsWindow from './CertsWindow';
import ContactWindow from './ContactWindow';
import Spotlight from './Spotlight';

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
  const { booted, setBoot, windows } = useOSStore();
  const [showDesktop, setShowDesktop] = useState(false);

  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 6 + Math.random() * 10,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 6,
        opacity: 0.3 + Math.random() * 0.4,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        x: 10 + i * 25 + Math.random() * 10,
        y: 8 + Math.random() * 20,
        size: 60 + Math.random() * 80,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.15,
      })),
    []
  );

  const handleBootComplete = useCallback(() => {
    setBoot(true);
    setTimeout(() => setShowDesktop(true), 100);
  }, [setBoot]);

  const handleOpenTerminal = useCallback(() => {
    const existing = useOSStore.getState().windows.find((w) => w.id === 'terminal');
    if (existing) {
      useOSStore.getState().openWindow('terminal');
    } else {
      useOSStore.setState((state) => ({
        windows: [
          ...state.windows,
          {
            id: 'terminal',
            title: 'Terminal',
            icon: '💻',
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: state.nextZIndex + 1,
            position: { x: 80, y: 60 },
            size: { width: 700, height: 460 },
          },
        ],
        nextZIndex: state.nextZIndex + 1,
      }));
    }
  }, []);

  const visibleWindows = windows.filter((w) => w.isOpen);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {/* Boot Screen */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Desktop Background - Anime Sunset Sky */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #89CFF0 20%, #B8D4E3 35%, #FFB7C5 55%, #FF9AAD 70%, #DDA0DD 85%, #C9A0DC 100%)',
        }}
      >
        {/* Sun glow */}
        <div
          className="absolute"
          style={{
            bottom: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,200,200,0.2) 40%, transparent 70%)',
          }}
        />

        {/* Clouds */}
        {clouds.map((c) => (
          <div
            key={c.id}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: `${c.size}px`,
              height: `${c.size * 0.4}px`,
              background: `radial-gradient(ellipse, rgba(255,255,255,${c.opacity}) 0%, transparent 70%)`,
              borderRadius: '50%',
              animation: `cloud-float ${c.duration}s ease-in-out ${c.delay}s infinite alternate`,
            }}
          />
        ))}

        {/* Sakura petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: '-15px',
              animation: `sakura-fall ${p.duration}s ease-in ${p.delay}s infinite, sakura-sway ${2 + p.delay}s ease-in-out ${p.delay}s infinite`,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
            }}
          >
            🌸
          </div>
        ))}

        {/* Stars/sparkles at top */}
        {useMemo(() => Array.from({ length: 8 }, (_, i) => ({
          id: i,
          x: 5 + Math.random() * 90,
          y: 2 + Math.random() * 15,
          size: 2 + Math.random() * 3,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 3,
        })), []).map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Desktop Content */}
      <div
        className={`relative z-10 h-full transition-opacity duration-700 ${
          showDesktop ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Menu Bar */}
        <MenuBar />

        {/* Windows */}
        {visibleWindows.map((win) => (
          <Window key={win.id} id={win.id}>
            {win.id === 'terminal' ? <Terminal /> : getWindowContent(win.id)}
          </Window>
        ))}

        {/* Spotlight Search */}
        <Spotlight />

        {/* Dock */}
        <Dock onOpenTerminal={handleOpenTerminal} />
      </div>
    </div>
  );
}
