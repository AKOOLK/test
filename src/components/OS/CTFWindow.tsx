'use client';

import { Badge } from '@/components/ui/badge';

const ctfHistory = [
  {
    name: 'DEF CON 32 CTF',
    date: 'Aug 2024',
    placement: 'Top 50',
    category: 'Major',
    color: 'text-red-400 border-red-800/50',
    solved: '8/25 challenges',
    highlights: ['Pwned custom hypervisor', 'Zero-day in custom protocol'],
  },
  {
    name: 'HTB Cyber Apocalypse',
    date: 'Mar 2024',
    placement: '1st Place (University)',
    category: 'Major',
    color: 'text-yellow-400 border-yellow-800/50',
    solved: '22/30 challenges',
    highlights: ['Full chain exploitation', 'Blockchain challenge sweep'],
  },
  {
    name: 'CryptoCTF 2024',
    date: 'Jul 2024',
    placement: '3rd Place',
    category: 'Specialty',
    color: 'text-purple-400 border-purple-800/50',
    solved: '15/20 challenges',
    highlights: ['Broke custom lattice-based crypto', 'RSA multi-prime attack'],
  },
  {
    name: 'picoCTF 2024',
    date: 'Mar 2024',
    placement: 'Top 100',
    category: 'Major',
    color: 'text-green-400 border-green-800/50',
    solved: '38/45 challenges',
    highlights: ['All forensics challenges', 'Binary exploitation sweep'],
  },
  {
    name: 'Angstrom CTF',
    date: 'May 2024',
    placement: 'Top 20',
    category: 'Major',
    color: 'text-cyan-400 border-cyan-800/50',
    solved: '18/22 challenges',
    highlights: ['Kernel exploitation', 'Jail escape techniques'],
  },
  {
    name: ' imaginaryCTF',
    date: 'Jul 2023',
    placement: 'Top 30',
    category: 'Weekly',
    color: 'text-orange-400 border-orange-800/50',
    solved: '45/50 challenges',
    highlights: ['Web category king', 'Creative solution awards'],
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
    <div className="p-6 font-mono space-y-5">
      <div className="text-green-400 text-sm font-bold">&gt; cat /var/log/ctf_scoreboard.log</div>
      <div className="text-green-300/60 text-xs">Loading competition history...</div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161b22] rounded-lg p-3 border border-[#30363d] text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-green-400 font-bold text-lg">{stat.value}</div>
            <div className="text-green-500/50 text-[10px]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTF History */}
      <div className="space-y-3">
        {ctfHistory.map((ctf) => (
          <div
            key={ctf.name}
            className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-green-800/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🏆</span>
                <h3 className="text-green-400 font-bold text-sm">{ctf.name}</h3>
                <Badge variant="outline" className={`text-[10px] ${ctf.color}`}>
                  {ctf.category}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-green-500/50">{ctf.date}</span>
                <span className="text-cyan-400 font-bold">{ctf.placement}</span>
              </div>
            </div>
            <div className="text-green-300/60 text-xs mb-2">{ctf.solved}</div>
            <div className="flex flex-wrap gap-1.5">
              {ctf.highlights.map((h) => (
                <Badge
                  key={h}
                  className="bg-[#21262d] text-green-400/70 text-[10px] hover:bg-[#21262d]/80"
                >
                  ⚡ {h}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-green-500/50 text-[10px] pt-2 border-t border-[#30363d]">
        &gt; CTF profile: hackthebox.com/p/cyberwolf | TryHackMe: cyberwolf
      </div>
    </div>
  );
}
