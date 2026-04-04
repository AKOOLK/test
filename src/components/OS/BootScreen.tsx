'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  { text: '[BIOS] CyberOS v3.7.1 - Secure Boot Enabled', delay: 100 },
  { text: '[BIOS] POST check... OK', delay: 300 },
  { text: '[KERNEL] Loading crypto modules...', delay: 200 },
  { text: '[KERNEL] Initializing AES-256 encryption engine...', delay: 250 },
  { text: '[NET] Starting firewall daemon (iptables)...', delay: 300 },
  { text: '[NET] Configuring VPN tunnel interface...', delay: 200 },
  { text: '[SEC] Verifying integrity of system files... OK', delay: 400 },
  { text: '[SEC] Loading threat detection module...', delay: 300 },
  { text: '[SEC] IDS/IPS engine initialized', delay: 200 },
  { text: '[FS] Mounting encrypted filesystem /sec/data... OK', delay: 350 },
  { text: '[AUTH] Two-factor authentication module loaded', delay: 250 },
  { text: '[SYS] Starting desktop environment...', delay: 300 },
  { text: '[SYS] Loading user profile: cyb3r_s3cur1ty', delay: 200 },
  { text: '', delay: 100 },
  { text: '███████╗███████╗███╗   ██╗████████╗███████╗██████╗ ████████╗██╗  ██╗██╗  ██╗██╗   ██╗███████╗', delay: 80 },
  { text: '██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗╚══██╔══╝██║  ██║██║  ██║██║   ██║██╔════╝', delay: 80 },
  { text: '███████╗█████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝   ██║   ███████║███████║██║   ██║███████╗', delay: 80 },
  { text: '╚════██║██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗   ██║   ██╔══██║██╔══██║██║   ██║╚════██║', delay: 80 },
  { text: '███████║███████╗██║ ╚████║   ██║   ███████╗██║  ██║   ██║   ██║  ██║██║  ██║╚██████╔╝███████║', delay: 80 },
  { text: '╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝', delay: 80 },
  { text: '', delay: 100 },
  { text: '> Welcome, Agent. Access granted.', delay: 400 },
  { text: '> Loading portfolio desktop...', delay: 600 },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const completeRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const complete = currentIndex >= bootLines.length;

  useEffect(() => {
    if (currentIndex >= bootLines.length) {
      if (!completeRef.current) {
        completeRef.current = true;
        timerRef.current = setTimeout(onComplete, 800);
      }
      return;
    }

    const line = bootLines[currentIndex];
    timerRef.current = setTimeout(() => {
      setVisibleLines((prev) => [...prev, line.text]);
      setCurrentIndex((prev) => prev + 1);
    }, line.delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 opacity-10">
        <MatrixRain />
      </div>

      {/* Boot text */}
      <div className="relative z-10 flex-1 p-4 sm:p-8 font-mono text-sm sm:text-base overflow-hidden">
        <div className="max-w-4xl">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed ${
                line.startsWith('[ERR')
                  ? 'text-red-500'
                  : line.startsWith('[SEC]')
                  ? 'text-yellow-400'
                  : line.startsWith('[NET]')
                  ? 'text-cyan-400'
                  : line.startsWith('[FS]')
                  ? 'text-emerald-400'
                  : line.startsWith('>')
                  ? 'text-green-400 font-bold'
                  : line.includes('██')
                  ? 'text-green-500 text-[0.55rem] sm:text-xs leading-tight'
                  : 'text-green-400'
              }`}
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
          {currentIndex < bootLines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-2 h-4 bg-green-400 ml-1"
            />
          )}
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none scanline" />
    </motion.div>
  );
}

function MatrixRain() {
  const columns = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: (i / 40) * 100,
        speed: 0.5 + Math.random() * 2,
        chars: Array.from({ length: 20 }, () =>
          String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
        ),
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 text-green-500 font-mono text-xs whitespace-nowrap"
          style={{
            left: `${col.x}%`,
            animation: `matrix-fall ${col.speed}s linear ${col.delay}s infinite`,
            opacity: 0.3,
          }}
        >
          {col.chars.join('\n')}
        </div>
      ))}
    </div>
  );
}
