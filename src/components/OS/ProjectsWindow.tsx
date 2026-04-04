'use client';

import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const projects = [
  {
    name: 'NetRecon Pro',
    emoji: '🔍',
    description: 'Automated reconnaissance toolkit for bug bounty hunters. Integrates Shodan, Censys, and ASN lookup.',
    tech: ['Python', 'Shodan API', 'Nmap', 'SQLite'],
    stars: 234,
    status: 'Active',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'VulnScanner',
    emoji: '🛡️',
    description: 'High-performance vulnerability assessment tool in Go. Scans for CVEs and misconfigurations.',
    tech: ['Go', 'REST API', 'PostgreSQL', 'Docker'],
    stars: 189,
    status: 'Active',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'CryptoGuard',
    emoji: '🔐',
    description: 'Zero-knowledge file encryption utility built in Rust with AES-256-GCM.',
    tech: ['Rust', 'AES-256-GCM', 'Argon2', 'CLI'],
    stars: 156,
    status: 'Stable',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'PhishDetect AI',
    emoji: '🤖',
    description: 'ML-powered phishing URL detector with 98.5% accuracy using NLP.',
    tech: ['Python', 'TensorFlow', 'scikit-learn', 'Flask'],
    stars: 312,
    status: 'Active',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'SysMon Agent',
    emoji: '📡',
    description: 'Endpoint monitoring agent for process tracking, network connections, and file modifications.',
    tech: ['C++', 'Windows API', 'Elasticsearch', 'Kibana'],
    stars: 98,
    status: 'Beta',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function ProjectsWindow() {
  return (
    <div className="p-6 space-y-5 bg-gradient-to-br from-blue-50/50 to-violet-50/50 min-h-full">
      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-lg">📚</span>
        <h2 className="font-bold text-lg">Mission Files</h2>
        <span className="text-xs text-foreground/40 ml-auto">{projects.length} projects · 1,247 ⭐</span>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl shadow-md shrink-0`}>
                {project.emoji}
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-foreground/30 text-xs">#{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-foreground/90 font-bold group-hover:text-foreground transition-colors">
                    {project.name}
                  </h3>
                  <Badge className={`bg-gradient-to-r ${project.gradient} text-white text-[10px] border-0 shadow-sm`}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-foreground/55 text-xs leading-relaxed">{project.description}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-[10px] border-foreground/10 text-foreground/50 bg-white/50 hover:bg-white/80"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-xs shrink-0 pt-1">
                <Star size={14} fill="currentColor" />
                <span className="font-bold">{project.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
