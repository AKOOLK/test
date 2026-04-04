'use client';

import { useEffect, useState } from 'react';
import { useOSStore } from '@/lib/store';
import {
  Search,
  Wifi,
  Battery,
  Volume2,
} from 'lucide-react';

export default function MenuBar() {
  const { windows, spotlightOpen, setSpotlightOpen } = useOSStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeApp = windows.find((w) => w.isOpen && !w.isMinimized);

  return (
    <div className="fixed top-0 left-0 right-0 z-[997] h-7 glass flex items-center justify-between px-3 text-[13px] font-medium">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="text-base leading-none hover:opacity-70 transition-opacity" title="CyberSakura">
          🌸
        </button>
        <span className="font-bold text-foreground/90">
          {activeApp ? `${activeApp.icon} ${activeApp.title}` : 'Finder'}
        </span>
        <div className="hidden sm:flex items-center gap-3 text-foreground/70">
          <button className="hover:text-foreground/90 transition-colors">File</button>
          <button className="hover:text-foreground/90 transition-colors">Edit</button>
          <button className="hover:text-foreground/90 transition-colors">View</button>
          <button className="hover:text-foreground/90 transition-colors">Window</button>
          <button className="hover:text-foreground/90 transition-colors">Help</button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2.5 text-foreground/70">
        <button
          onClick={() => setSpotlightOpen(!spotlightOpen)}
          className="hover:text-foreground/90 transition-colors"
          title="Spotlight"
        >
          <Search size={13} />
        </button>
        <Wifi size={13} className="hidden sm:block" />
        <Volume2 size={13} className="hidden sm:block" />
        <Battery size={13} className="hidden sm:block" />
        <div className="text-right">
          <span className="text-[11px] text-foreground/60">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="ml-1.5">
            {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
