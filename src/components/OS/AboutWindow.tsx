'use client';

import { Badge } from '@/components/ui/badge';

export default function AboutWindow() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/50 to-purple-50/50 min-h-full">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-4xl shadow-lg shadow-pink-200/50 shrink-0">
          🐱
        </div>
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-xl font-bold text-foreground/90">
            Alex &quot;CyberWolf&quot; Chen
          </h1>
          <p className="text-foreground/60 text-sm">
            Cybersecurity Analyst &bull; Penetration Tester
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
            <Badge className="bg-pink-100 text-pink-700 text-xs hover:bg-pink-100 border-0">OSCP</Badge>
            <Badge className="bg-violet-100 text-violet-700 text-xs hover:bg-violet-100 border-0">CEH</Badge>
            <Badge className="bg-blue-100 text-blue-700 text-xs hover:bg-blue-100 border-0">CompTIA Sec+</Badge>
            <Badge className="bg-amber-100 text-amber-700 text-xs hover:bg-amber-100 border-0">AWS CCP</Badge>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <InfoCard emoji="🎓" label="Education" value="B.S. Computer Science" />
        <InfoCard emoji="🏫" label="University" value="MIT - Class of 2026" />
        <InfoCard emoji="📊" label="GPA" value="3.8 / 4.0" />
        <InfoCard emoji="📍" label="Location" value="San Francisco, CA" />
        <InfoCard emoji="🏆" label="HTB Rank" value="#1,247 Global" />
        <InfoCard emoji="💀" label="HackTheBox" value="Pro Hacker" />
      </div>

      {/* Bio */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-sm">
        <h3 className="text-sm font-bold text-foreground/80 mb-3 flex items-center gap-2">
          <span>🌸</span> About Me
        </h3>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Aspiring cybersecurity professional with a passion for offensive security, reverse
          engineering, and building robust security tools. Active CTF competitor with experience in
          web exploitation, binary exploitation, cryptography, and forensics. Currently focused on
          cloud security and zero-day research. Making the digital world safer, one exploit at a time! ✨
        </p>
      </div>

      {/* Interests */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-sm">
        <h3 className="text-sm font-bold text-foreground/80 mb-3 flex items-center gap-2">
          <span>🎯</span> Interests
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Penetration Testing', 'Reverse Engineering', 'Malware Analysis', 'CTF',
            'Bug Bounty', 'Cloud Security', 'Forensics', 'Cryptography', 'Red Teaming', 'Anime 🌸',
          ].map((interest) => (
            <Badge
              key={interest}
              variant="outline"
              className="text-xs border-pink-200 text-pink-600 bg-pink-50/50 hover:bg-pink-50"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/40 shadow-sm text-center">
      <div className="text-xl mb-1">{emoji}</div>
      <div className="text-[10px] text-foreground/40 uppercase tracking-wider">{label}</div>
      <div className="text-foreground/80 text-sm font-medium mt-0.5">{value}</div>
    </div>
  );
}
