'use client';

import { Badge } from '@/components/ui/badge';

export default function AboutWindow() {
  return (
    <div className="p-6 font-mono space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 flex items-center justify-center text-5xl shrink-0">
          👤
        </div>
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-green-400">
            Alex &quot;CyberWolf&quot; Chen
          </h1>
          <p className="text-green-300/80 text-sm">Cybersecurity Analyst &bull; Penetration Tester</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="outline" className="border-green-700 text-green-400 text-xs font-mono">
              OSCP
            </Badge>
            <Badge variant="outline" className="border-cyan-700 text-cyan-400 text-xs font-mono">
              CEH
            </Badge>
            <Badge variant="outline" className="border-yellow-700 text-yellow-400 text-xs font-mono">
              CompTIA Sec+
            </Badge>
            <Badge variant="outline" className="border-purple-700 text-purple-400 text-xs font-mono">
              AWS CCP
            </Badge>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard label="Education" value="B.S. Computer Science" icon="🎓" />
        <InfoCard label="University" value="MIT - Class of 2026" icon="🏫" />
        <InfoCard label="GPA" value="3.8 / 4.0" icon="📊" />
        <InfoCard label="Location" value="San Francisco, CA" icon="📍" />
        <InfoCard label="HTB Rank" value="#1,247 Global" icon="🏆" />
        <InfoCard label="HackTheBox" value="Pro Hacker - 12,450 pts" icon="💀" />
      </div>

      {/* Bio */}
      <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
        <h3 className="text-green-400 text-sm font-bold mb-3">&gt; cat about_me.txt</h3>
        <p className="text-green-300/70 text-sm leading-relaxed">
          Aspiring cybersecurity professional with a deep passion for offensive security, reverse
          engineering, and building robust security tools. Active CTF competitor with experience in
          web exploitation, binary exploitation, cryptography, and forensics. Currently focused on
          cloud security research and zero-day vulnerability analysis. Committed to making the
          digital world a safer place through responsible disclosure and open-source security tools.
        </p>
      </div>

      {/* Interests */}
      <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
        <h3 className="text-green-400 text-sm font-bold mb-3">&gt; cat interests.log</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Penetration Testing',
            'Reverse Engineering',
            'Malware Analysis',
            'CTF Competitions',
            'Bug Bounty',
            'Cloud Security',
            'Network Forensics',
            'Binary Exploitation',
            'Cryptography',
            'Red Teaming',
          ].map((interest) => (
            <Badge
              key={interest}
              className="bg-green-900/30 text-green-400 border-green-800/50 hover:bg-green-900/50 text-xs"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-[#161b22] rounded-lg p-3 border border-[#30363d] flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-green-500/60 text-[10px] uppercase tracking-wider">{label}</div>
        <div className="text-green-300 text-sm">{value}</div>
      </div>
    </div>
  );
}
