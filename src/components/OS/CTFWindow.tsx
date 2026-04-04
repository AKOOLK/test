'use client';

import { Badge } from '@/components/ui/badge';

const ctfHistory = [
  {
    name: 'DEF CON 32 CTF',
    date: 'Aug 2024',
    placement: 'Top 50',
    emoji: '🏟️',
    solved: '8/25',
    highlights: ['Pwned hypervisor', 'Zero-day exploit'],
    gradient: 'from-red-500 to-orange-500',
  },
  {
    name: 'HTB Cyber Apocalypse',
    date: 'Mar 2024',
    placement: '1st Uni',
    emoji: '🌍',
    solved: '22/30',
    highlights: ['Full chain exploit', 'Blockchain sweep'],
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    name: 'CryptoCTF 2024',
    date: 'Jul 2024',
    placement: '3rd Place',
    emoji: '🔐',
    solved: '15/20',
    highlights: ['Lattice crypto', 'RSA multi-prime'],
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'picoCTF 2024',
    date: 'Mar 2024',
    placement: 'Top 100',
    emoji: '🎒',
    solved: '38/45',
    highlights: ['Forensics king', 'Binary sweep'],
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    name: 'Angstrom CTF',
    date: 'May 2024',
    placement: 'Top 20',
    emoji: '⚡',
    solved: '18/22',
    highlights: ['Kernel exploit', 'Jail escape'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'imaginaryCTF',
    date: 'Jul 2023',
    placement: 'Top 30',
    emoji: '🎨',
    solved: '45/50',
    highlights: ['Web category', 'Creative solutions'],
    gradient: 'from-pink-500 to-rose-500',
  },
];

const stats = [
  { label: 'CTFs Played', value: '47', icon: '🎮' },
  { label: 'Flags Captured', value: '312', icon: '🏁' },
  { label: 'First Places', value: '5', icon: '🥇' },
  { label: 'HTB Rank', value: '#1,247', icon: '💀' },
];

export default function CTFWindow() {
  return (
    <div className="p-6 space-y-5 bg-gradient-to-br from-amber-50/50 to-pink-50/50 min-h-full">
      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-lg">🎯</span>
        <h2 className="font-bold text-lg">CTF Arena</h2>
        <span className="text-xs text-foreground/40 ml-auto">Competition History</span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 text-center shadow-sm"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-foreground/90 font-bold text-lg">{stat.value}</div>
            <div className="text-foreground/40 text-[10px]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTF History */}
      <div className="space-y-3">
        {ctfHistory.map((ctf) => (
          <div
            key={ctf.name}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ctf.gradient} flex items-center justify-center text-base shadow-sm`}>
                  {ctf.emoji}
                </div>
                <h3 className="text-foreground/90 font-bold text-sm">{ctf.name}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-foreground/40">{ctf.date}</span>
                <Badge className={`bg-gradient-to-r ${ctf.gradient} text-white text-[10px] border-0 shadow-sm`}>
                  🏆 {ctf.placement}
                </Badge>
              </div>
            </div>
            <div className="text-foreground/50 text-xs mb-2">Solved: {ctf.solved} challenges</div>
            <div className="flex flex-wrap gap-1.5">
              {ctf.highlights.map((h) => (
                <Badge
                  key={h}
                  variant="outline"
                  className="text-[10px] border-foreground/10 text-foreground/50 bg-white/50"
                >
                  ⚡ {h}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
