'use client';

import { Progress } from '@/components/ui/progress';

const skillCategories = [
  {
    name: 'Offensive Security',
    icon: '⚔️',
    color: 'text-red-400',
    barColor: 'bg-red-500',
    skills: [
      { name: 'Penetration Testing', level: 92 },
      { name: 'Web App Exploitation', level: 88 },
      { name: 'Network Attacks', level: 85 },
      { name: 'Binary Exploitation', level: 72 },
      { name: 'Privilege Escalation', level: 80 },
    ],
  },
  {
    name: 'Defensive Security',
    icon: '🛡️',
    color: 'text-blue-400',
    barColor: 'bg-blue-500',
    skills: [
      { name: 'SIEM & Log Analysis', level: 78 },
      { name: 'Incident Response', level: 75 },
      { name: 'Network Forensics', level: 70 },
      { name: 'Threat Intelligence', level: 65 },
      { name: 'IDS/IPS Configuration', level: 82 },
    ],
  },
  {
    name: 'Programming',
    icon: '💻',
    color: 'text-green-400',
    barColor: 'bg-green-500',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'Bash Scripting', level: 88 },
      { name: 'C / C++', level: 72 },
      { name: 'JavaScript', level: 78 },
      { name: 'Rust', level: 60 },
      { name: 'Go', level: 55 },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: '🔧',
    color: 'text-yellow-400',
    barColor: 'bg-yellow-500',
    skills: [
      { name: 'Burp Suite Pro', level: 90 },
      { name: 'Metasploit Framework', level: 88 },
      { name: 'Wireshark', level: 85 },
      { name: 'Ghidra / IDA Pro', level: 70 },
      { name: 'Nmap / Masscan', level: 92 },
      { name: 'Docker / Kubernetes', level: 68 },
    ],
  },
];

export default function SkillsWindow() {
  return (
    <div className="p-6 font-mono space-y-6">
      <div className="text-green-400 text-sm font-bold">&gt; skill_scan --all --verbose</div>
      <div className="text-green-300/60 text-xs">Scanning skill database... 26 skills found</div>

      {skillCategories.map((category) => (
        <div key={category.name} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{category.icon}</span>
            <h3 className={`${category.color} font-bold text-sm`}>{category.name}</h3>
          </div>
          <div className="space-y-2.5 pl-8">
            {category.skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-green-300/80">{skill.name}</span>
                  <span className={category.color}>{skill.level}%</span>
                </div>
                <div className="h-2 bg-[#21262d] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${category.barColor}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-green-500/50 text-[10px] pt-2 border-t border-[#30363d]">
        &gt; Scan complete. Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
