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
        const newY = Math.max(0, e.clientY - dragOffset.current.y);
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
      className={`fixed transition-all duration-200 ${
        show
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none'
      } ${win.isMaximized ? 'inset-0' : ''}`}
      style={
        win.isMaximized
          ? { zIndex: win.zIndex }
          : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: win.zIndex }
      }
      onMouseDown={() => focusWindow(id)}
    >
      <div className="flex flex-col h-full bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d] cursor-move select-none"
          onMouseDown={handleMouseDown}
          onDoubleClick={() => maximizeWindow(id)}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{win.icon}</span>
            <span className="text-green-400 font-mono text-xs sm:text-sm font-medium">
              {win.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}
