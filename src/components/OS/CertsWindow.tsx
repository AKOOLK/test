'use client';

import { Badge } from '@/components/ui/badge';

const certifications = [
  {
    name: 'OSCP',
    fullName: 'Offensive Security Certified Professional',
    issuer: 'Offensive Security',
    date: 'Dec 2024',
    status: 'Earned',
    color: 'border-red-500/50 bg-red-500/10',
    icon: '💀',
  },
  {
    name: 'CEH',
    fullName: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    date: 'Aug 2024',
    status: 'Earned',
    color: 'border-green-500/50 bg-green-500/10',
    icon: '🔐',
  },
  {
    name: 'CompTIA Security+',
    fullName: 'CompTIA Security+ SY0-701',
    issuer: 'CompTIA',
    date: 'Mar 2024',
    status: 'Earned',
    color: 'border-cyan-500/50 bg-cyan-500/10',
    icon: '🛡️',
  },
  {
    name: 'eWPT',
    fullName: 'eLearnSecurity Web Penetration Tester',
    issuer: 'INE Security',
    date: 'Jun 2024',
    status: 'Earned',
    color: 'border-yellow-500/50 bg-yellow-500/10',
    icon: '🕸️',
  },
  {
    name: 'AWS CCP',
    fullName: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jan 2024',
    status: 'Earned',
    color: 'border-orange-500/50 bg-orange-500/10',
    icon: '☁️',
  },
  {
    name: 'OSWE',
    fullName: 'Offensive Security Web Expert',
    issuer: 'Offensive Security',
    date: 'In Progress',
    status: 'In Progress',
    color: 'border-purple-500/50 bg-purple-500/10',
    icon: '🎯',
  },
];

const trainings = [
  { name: 'SANS SEC560', desc: 'Network Penetration Testing & Ethical Hacking', hours: 45 },
  { name: 'SANS FOR500', desc: 'Windows Forensic Analysis', hours: 40 },
  { name: 'PentesterLab', desc: 'Web Security Training', hours: 200 },
  { name: 'PortSwigger Academy', desc: 'Web Security Academy', hours: 300 },
  { name: 'TCM Security', desc: 'Practical Ethical Hacking', hours: 80 },
];

export default function CertsWindow() {
  return (
    <div className="p-6 font-mono space-y-5">
      <div className="text-green-400 text-sm font-bold">
        &gt; gpg --verify certificates.crt
      </div>
      <div className="text-green-300/60 text-xs">
        Good signature from &quot;cyberwolf@verified&quot;
      </div>

      {/* Certifications */}
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className={`bg-[#161b22] rounded-lg p-4 border ${cert.color} transition-all`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-green-400 font-bold text-sm">{cert.name}</h3>
                    {cert.status === 'In Progress' && (
                      <Badge className="bg-purple-900/40 text-purple-400 text-[10px]">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <div className="text-green-300/60 text-xs">{cert.fullName}</div>
                  <div className="text-green-500/50 text-[10px] mt-0.5">
                    {cert.issuer} &bull; {cert.date}
                  </div>
                </div>
              </div>
              {cert.status === 'Earned' && (
                <div className="text-green-400 text-[10px] bg-green-900/30 px-3 py-1 rounded border border-green-800/30">
                  ✓ VERIFIED
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Training */}
      <div className="space-y-2">
        <h3 className="text-cyan-400 text-sm font-bold">&gt; Training & Labs</h3>
        {trainings.map((t) => (
          <div
            key={t.name}
            className="bg-[#161b22] rounded-lg p-3 border border-[#30363d] flex items-center justify-between"
          >
            <div>
              <div className="text-green-300 text-xs font-bold">{t.name}</div>
              <div className="text-green-500/50 text-[10px]">{t.desc}</div>
            </div>
            <div className="text-cyan-400 text-xs shrink-0">{t.hours}h</div>
          </div>
        ))}
      </div>

      <div className="text-green-500/50 text-[10px] pt-2 border-t border-[#30363d]">
        &gt; Total certification study hours: 1,200+ | Total lab hours: 800+
      </div>
    </div>
  );
}
