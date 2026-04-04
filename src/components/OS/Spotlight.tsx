'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useOSStore } from '@/lib/store';
import { Search, Command } from 'lucide-react';

interface SpotlightItem {
  id: string;
  icon: string;
  label: string;
  category: string;
}

const spotlightItems: SpotlightItem[] = [
  { id: 'terminal', icon: '💻', label: 'Terminal', category: 'Apps' },
  { id: 'about', icon: '🐱', label: 'About Me', category: 'Portfolio' },
  { id: 'skills', icon: '⚔️', label: 'Skill Arsenal', category: 'Portfolio' },
  { id: 'projects', icon: '📚', label: 'Mission Files', category: 'Portfolio' },
  { id: 'ctf', icon: '🎯', label: 'CTF Arena', category: 'Portfolio' },
  { id: 'certs', icon: '✨', label: 'Achievements', category: 'Portfolio' },
  { id: 'contact', icon: '💌', label: 'Secret Comms', category: 'Contact' },
];

interface SpotlightProps {
  onOpenTerminal?: () => void;
}

export default function Spotlight({ onOpenTerminal }: SpotlightProps) {
  const { spotlightOpen, setSpotlightOpen, openWindow } = useOSStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return spotlightItems;
    return spotlightItems.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Reset query when spotlight opens
  const effectiveQuery = spotlightOpen ? query : '';

  useEffect(() => {
    if (spotlightOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [spotlightOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setTimeout(() => setSpotlightOpen(!useOSStore.getState().spotlightOpen), 0);
      }
      if (e.key === 'Escape' && useOSStore.getState().spotlightOpen) {
        setTimeout(() => setSpotlightOpen(false), 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSpotlightOpen]);

  if (!spotlightOpen) return null;

  const handleSelect = (item: SpotlightItem) => {
    if (item.id === 'terminal') {
      onOpenTerminal?.();
    } else {
      openWindow(item.id);
    }
    setSpotlightOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm" onClick={() => setSpotlightOpen(false)} />

      {/* Spotlight Panel */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[999] w-[480px] max-w-[90vw]">
        <div className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-foreground/5">
            <Search size={18} className="text-foreground/30 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps and files..."
              className="flex-1 bg-transparent text-foreground/80 outline-none text-sm placeholder:text-foreground/30"
            />
            <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/30 text-[10px]">
              <Command size={10} />K
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
            {filtered.length === 0 ? (
              <div className="text-center py-6 text-foreground/30 text-sm">
                No results found ✨
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors text-left"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-foreground/80">{item.label}</div>
                    <div className="text-[10px] text-foreground/40">{item.category}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
