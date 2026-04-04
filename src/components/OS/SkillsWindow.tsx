'use client';

const skillCategories = [
  {
    name: 'Offensive Security',
    icon: '⚔️',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
    textColor: 'text-pink-600',
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
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    textColor: 'text-violet-600',
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
    gradient: 'from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
    textColor: 'text-blue-600',
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
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    textColor: 'text-emerald-600',
    skills: [
      { name: 'Burp Suite Pro', level: 90 },
      { name: 'Metasploit', level: 88 },
      { name: 'Wireshark', level: 85 },
      { name: 'Ghidra / IDA Pro', level: 70 },
      { name: 'Nmap / Masscan', level: 92 },
      { name: 'Docker / K8s', level: 68 },
    ],
  },
];

export default function SkillsWindow() {
  return (
    <div className="p-6 space-y-5 bg-gradient-to-br from-violet-50/50 to-pink-50/50 min-h-full">
      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-lg">⚔️</span>
        <h2 className="font-bold text-lg">Skill Arsenal</h2>
        <span className="text-xs text-foreground/40 ml-auto">26 skills across 4 categories</span>
      </div>

      {skillCategories.map((category) => (
        <div key={category.name} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{category.icon}</span>
            <h3 className={`${category.textColor} font-bold text-sm`}>{category.name}</h3>
          </div>
          <div className={`bg-gradient-to-br ${category.bgGradient} rounded-xl p-4 space-y-3 border border-white/60`}>
            {category.skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground/70 font-medium">{skill.name}</span>
                  <span className={`${category.textColor} font-bold`}>{skill.level}%</span>
                </div>
                <div className="h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${category.gradient} transition-all duration-1000 shadow-sm`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
