'use client';

import { Badge } from '@/components/ui/badge';

const certifications = [
  {
    name: 'OSCP',
    fullName: 'Offensive Security Certified Professional',
    issuer: 'Offensive Security',
    date: 'Dec 2024',
    status: 'Earned',
    icon: '💀',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    name: 'CEH',
    fullName: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    date: 'Aug 2024',
    status: 'Earned',
    icon: '🔐',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    name: 'CompTIA Security+',
    fullName: 'CompTIA Security+ SY0-701',
    issuer: 'CompTIA',
    date: 'Mar 2024',
    status: 'Earned',
    icon: '🛡️',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'eWPT',
    fullName: 'eLearnSecurity Web Penetration Tester',
    issuer: 'INE Security',
    date: 'Jun 2024',
    status: 'Earned',
    icon: '🕸️',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    name: 'AWS CCP',
    fullName: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jan 2024',
    status: 'Earned',
    icon: '☁️',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    name: 'OSWE',
    fullName: 'Offensive Security Web Expert',
    issuer: 'Offensive Security',
    date: 'In Progress',
    status: 'In Progress',
    icon: '🎯',
    gradient: 'from-violet-500 to-purple-600',
  },
];

const trainings = [
  { name: 'SANS SEC560', desc: 'Network Penetration Testing', hours: 45, emoji: '🎓' },
  { name: 'SANS FOR500', desc: 'Windows Forensic Analysis', hours: 40, emoji: '🔍' },
  { name: 'PentesterLab', desc: 'Web Security Training', hours: 200, emoji: '🧪' },
  { name: 'PortSwigger Academy', desc: 'Web Security Academy', hours: 300, emoji: '🕸️' },
  { name: 'TCM Security', desc: 'Practical Ethical Hacking', hours: 80, emoji: '⚔️' },
];

export default function CertsWindow() {
  return (
    <div className="p-6 space-y-5 bg-gradient-to-br from-emerald-50/50 to-violet-50/50 min-h-full">
      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-lg">✨</span>
        <h2 className="font-bold text-lg">Achievements</h2>
        <span className="text-xs text-foreground/40 ml-auto">5 earned · 1 in progress</span>
      </div>

      {/* Certifications */}
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className={`bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-2xl shadow-md shrink-0`}>
                {cert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-foreground/90 font-bold text-sm">{cert.name}</h3>
                  {cert.status === 'In Progress' && (
                    <Badge className="bg-violet-100 text-violet-600 text-[10px] border-0">
                      In Progress 🔄
                    </Badge>
                  )}
                </div>
                <div className="text-foreground/50 text-xs">{cert.fullName}</div>
                <div className="text-foreground/40 text-[10px] mt-0.5">
                  {cert.issuer} &bull; {cert.date}
                </div>
              </div>
              {cert.status === 'Earned' && (
                <div className="text-emerald-500 text-[10px] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium shrink-0">
                  ✓ Verified
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Training */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground/80 flex items-center gap-2">
          <span>📖</span> Training & Labs
        </h3>
        {trainings.map((t) => (
          <div
            key={t.name}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 flex items-center gap-3 shadow-sm"
          >
            <span className="text-xl">{t.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-foreground/80 text-sm font-bold">{t.name}</div>
              <div className="text-foreground/45 text-xs">{t.desc}</div>
            </div>
            <Badge variant="outline" className="text-[10px] border-foreground/10 text-foreground/50 bg-white/50 shrink-0">
              {t.hours}h
            </Badge>
          </div>
        ))}
      </div>

      <div className="text-foreground/30 text-[10px] text-center pt-2">
        Total study hours: 1,200+ · Total lab hours: 800+ 📚
      </div>
    </div>
  );
}
