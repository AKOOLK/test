import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface OSStore {
  booted: boolean;
  setBoot: (v: boolean) => void;
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  spotlightOpen: boolean;
  setSpotlightOpen: (v: boolean) => void;
  terminalHistory: string[];
  addTerminalLine: (line: string) => void;
  clearTerminal: () => void;
}

const initialWindows: WindowState[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: '🐱',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 60 },
    size: { width: 680, height: 500 },
  },
  {
    id: 'skills',
    title: 'Skill Arsenal',
    icon: '⚔️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 150, y: 80 },
    size: { width: 700, height: 520 },
  },
  {
    id: 'projects',
    title: 'Mission Files',
    icon: '📚',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 80, y: 50 },
    size: { width: 760, height: 540 },
  },
  {
    id: 'ctf',
    title: 'CTF Arena',
    icon: '🎯',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 120, y: 70 },
    size: { width: 740, height: 520 },
  },
  {
    id: 'certs',
    title: 'Achievements',
    icon: '✨',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 140, y: 60 },
    size: { width: 700, height: 500 },
  },
  {
    id: 'contact',
    title: 'Secret Comms',
    icon: '💌',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 180, y: 90 },
    size: { width: 650, height: 480 },
  },
];

export const useOSStore = create<OSStore>((set) => ({
  booted: false,
  setBoot: (v) => set({ booted: v }),
  windows: initialWindows,
  nextZIndex: 10,
  openWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: state.nextZIndex + 1 }
          : w
      ),
      nextZIndex: state.nextZIndex + 1,
    })),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
      ),
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    })),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false, zIndex: state.nextZIndex + 1 } : w
      ),
      nextZIndex: state.nextZIndex + 1,
    })),
  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex + 1 } : w
      ),
      nextZIndex: state.nextZIndex + 1,
    })),
  updatePosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position: { x, y } } : w
      ),
    })),
  spotlightOpen: false,
  setSpotlightOpen: (v) => set({ spotlightOpen: v }),
  terminalHistory: [],
  addTerminalLine: (line) =>
    set((state) => ({
      terminalHistory: [...state.terminalHistory, line],
    })),
  clearTerminal: () => set({ terminalHistory: [] }),
}));
