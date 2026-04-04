'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useOSStore } from '@/lib/store';

interface WindowProps {
  id: string;
  children: ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } =
    useOSStore();
  const win = windows.find((w) => w.id === id);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const posRef = useRef(win?.position ?? { x: 0, y: 0 });
  const [pos, setPos] = useState(win?.position ?? { x: 0, y: 0 });
  const [size] = useState(win?.size ?? { w: 680, h: 480 });
  const [isHovered, setIsHovered] = useState(false);

  const show = win ? win.isOpen && !win.isMinimized : false;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win?.isMaximized) return;
      isDragging.current = true;
      dragOffset.current = {
        x: e.clientX - posRef.current.x,
        y: e.clientY - posRef.current.y,
      };
      focusWindow(id);

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const newX = Math.max(0, e.clientX - dragOffset.current.x);
        const newY = Math.max(28, e.clientY - dragOffset.current.y); // Below menu bar
        posRef.current = { x: newX, y: newY };
        setPos({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        updatePosition(id, posRef.current.x, posRef.current.y);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [win?.isMaximized, id, focusWindow, updatePosition]
  );

  if (!win || !win.isOpen) return null;

  return (
    <div
      className={`fixed transition-all duration-300 ease-out ${
        show
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-90 pointer-events-none'
      } ${win.isMaximized ? 'inset-0' : ''}`}
      style={
        win.isMaximized
          ? { zIndex: win.zIndex }
          : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: win.zIndex }
      }
      onMouseDown={() => focusWindow(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full rounded-xl overflow-hidden macos-shadow bg-white/70 backdrop-blur-2xl border border-white/40">
        {/* Title bar - macOS style */}
        <div
          className="flex items-center justify-between px-4 py-2.5 bg-white/50 border-b border-white/30 cursor-move select-none"
          onMouseDown={handleMouseDown}
          onDoubleClick={() => maximizeWindow(id)}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all flex items-center justify-center"
            >
              {isHovered && <span className="text-[8px] text-[#4a0002]">✕</span>}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 transition-all flex items-center justify-center"
            >
              {isHovered && <span className="text-[8px] text-[#985600]">−</span>}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 transition-all flex items-center justify-center"
            >
              {isHovered && <span className="text-[7px] text-[#006500]">⤢</span>}
            </button>
          </div>

          {/* Centered title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-foreground/70 text-[13px] font-medium">
            <span className="text-sm">{win.icon}</span>
            <span>{win.title}</span>
          </div>

          {/* Spacer for right alignment */}
          <div className="w-[52px]" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}
