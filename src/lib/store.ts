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
  startMenuOpen: boolean;
  setStartMenuOpen: (v: boolean) => void;
  terminalHistory: string[];
  addTerminalLine: (line: string) => void;
  clearTerminal: () => void;
}

const initialWindows: WindowState[] = [
  {
    id: 'about',
    title: 'about_me.sys',
    icon: '👤',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 80, y: 60 },
    size: { width: 680, height: 500 },
  },
  {
    id: 'skills',
    title: 'skill_scan.exe',
    icon: '🛡️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 160, y: 90 },
    size: { width: 720, height: 520 },
  },
  {
    id: 'projects',
    title: 'project_db.dat',
    icon: '📁',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 120, y: 50 },
    size: { width: 780, height: 560 },
  },
  {
    id: 'ctf',
    title: 'ctf_scoreboard.log',
    icon: '🏴',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 100, y: 70 },
    size: { width: 740, height: 540 },
  },
  {
    id: 'certs',
    title: 'certificates.crt',
    icon: '📜',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 140, y: 80 },
    size: { width: 700, height: 500 },
  },
  {
    id: 'contact',
    title: 'secure_comms.sh',
    icon: '📡',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 0,
    position: { x: 200, y: 100 },
    size: { width: 640, height: 480 },
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
  startMenuOpen: false,
  setStartMenuOpen: (v) => set({ startMenuOpen: v }),
  terminalHistory: [],
  addTerminalLine: (line) =>
    set((state) => ({
      terminalHistory: [...state.terminalHistory, line],
    })),
  clearTerminal: () => set({ terminalHistory: [] }),
}));
