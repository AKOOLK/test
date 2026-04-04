'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootMessages = [
  { text: '🌸 Initializing CyberSakura OS...', delay: 400 },
  { text: '🔐 Loading security modules...', delay: 600 },
  { text: '✨ Applying kawaii patches...', delay: 500 },
  { text: '🛡️ Starting firewall daemon...', delay: 400 },
  { text: '📡 Connecting to secure network...', delay: 500 },
  { text: '🎭 Loading anime theme pack...', delay: 400 },
  { text: '💾 Verifying system integrity... ✓', delay: 600 },
  { text: '🐱 Initializing Neko-chan assistant...', delay: 500 },
  { text: '', delay: 200 },
  { text: '╔══════════════════════════════════════╗', delay: 80 },
  { text: '║   ✿  CyberSakura OS  v1.0.0  ✿     ║', delay: 80 },
  { text: '║     ~ Anime Security Desktop ~       ║', delay: 80 },
  { text: '╚══════════════════════════════════════╝', delay: 80 },
  { text: '', delay: 300 },
  { text: 'Welcome back, Agent-san! ✨', delay: 800 },
  { text: 'Loading your desktop... 💫', delay: 600 },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const completeRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const complete = currentIndex >= bootMessages.length;

  const petals = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 8 + Math.random() * 12,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 4,
      })),
    []
  );

  useEffect(() => {
    if (currentIndex >= bootMessages.length) {
      if (!completeRef.current) {
        completeRef.current = true;
        timerRef.current = setTimeout(onComplete, 800);
      }
      return;
    }

    const msg = bootMessages[currentIndex];
    timerRef.current = setTimeout(() => {
      setVisibleLines((prev) => [...prev, msg.text]);
      setCurrentIndex((prev) => prev + 1);
    }, msg.delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #e1bee7 50%, #bbdefb 75%, #b3e5fc 100%)',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sakura petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: '-20px',
              animation: `sakura-fall ${p.duration}s ease-in ${p.delay}s infinite, sakura-sway ${2 + p.delay}s ease-in-out ${p.delay}s infinite`,
              fontSize: `${p.size}px`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Boot content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            {/* Loading icon */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="inline-block text-5xl"
              >
                ⚔️
              </motion.div>
            </div>

            {/* Boot messages */}
            <div className="space-y-1.5 font-mono text-xs sm:text-sm">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`leading-relaxed ${
                    line.includes('✓') || line.includes('Welcome')
                      ? 'text-purple-600 font-bold'
                      : line.includes('╔') || line.includes('║') || line.includes('╚')
                      ? 'text-pink-500'
                      : 'text-purple-400'
                  }`}
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
              {currentIndex < bootMessages.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="inline-block w-2 h-4 bg-pink-400 rounded-full ml-1"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
