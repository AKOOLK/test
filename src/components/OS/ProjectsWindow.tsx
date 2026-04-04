'use client';

import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star } from 'lucide-react';

const projects = [
  {
    name: 'NetRecon Pro',
    description:
      'Automated reconnaissance toolkit for bug bounty hunters. Integrates Shodan, Censys, and ASN lookup for comprehensive target profiling.',
    tech: ['Python', 'Shodan API', 'Nmap', 'SQLite'],
    stars: 234,
    status: 'Active',
    statusColor: 'text-green-400',
    link: '#',
  },
  {
    name: 'VulnScanner',
    description:
      'High-performance vulnerability assessment tool written in Go. Scans for CVEs, misconfigurations, and exposed services across large networks.',
    tech: ['Go', 'REST API', 'PostgreSQL', 'Docker'],
    stars: 189,
    status: 'Active',
    statusColor: 'text-green-400',
    link: '#',
  },
  {
    name: 'CryptoGuard',
    description:
      'Zero-knowledge file encryption utility built in Rust. Features AES-256-GCM encryption, secure key derivation, and tamper detection.',
    tech: ['Rust', 'AES-256-GCM', 'Argon2', 'CLI'],
    stars: 156,
    status: 'Stable',
    statusColor: 'text-cyan-400',
    link: '#',
  },
  {
    name: 'PhishDetect AI',
    description:
      'Machine learning-powered phishing URL detector. Uses NLP and URL feature analysis to identify malicious links with 98.5% accuracy.',
    tech: ['Python', 'TensorFlow', 'scikit-learn', 'Flask'],
    stars: 312,
    status: 'Active',
    statusColor: 'text-green-400',
    link: '#',
  },
  {
    name: 'SysMon Agent',
    description:
      'Endpoint monitoring agent that tracks process creation, network connections, and file modifications for threat hunting.',
    tech: ['C++', 'Windows API', 'Elasticsearch', 'Kibana'],
    stars: 98,
    status: 'Beta',
    statusColor: 'text-yellow-400',
    link: '#',
  },
];

export default function ProjectsWindow() {
  return (
    <div className="p-6 font-mono space-y-5">
      <div className="text-green-400 text-sm font-bold">&gt; SELECT * FROM projects ORDER BY stars DESC;</div>
      <div className="text-green-300/60 text-xs">Query returned {projects.length} results</div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-green-800/50 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-green-500/50 text-xs">#{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-green-400 font-bold group-hover:text-green-300 transition-colors">
                    {project.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`border-current/30 text-current text-[10px] ${project.statusColor}`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <p className="text-green-300/60 text-xs leading-relaxed pl-7">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pl-7">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      className="bg-[#21262d] text-green-400/70 text-[10px] hover:bg-[#21262d]/80"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 pl-7 sm:pl-0 shrink-0">
                <div className="flex items-center gap-1 text-green-400/50 text-xs">
                  <Star size={12} />
                  <span>{project.stars}</span>
                </div>
                <a
                  href={project.link}
                  className="flex items-center gap-1 text-cyan-400/60 hover:text-cyan-400 text-xs transition-colors"
                >
                  <Github size={12} />
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-green-500/50 text-[10px] pt-2 border-t border-[#30363d]">
        &gt; Total repositories: 23 | Total stars: 1,247 | Total forks: 412
      </div>
    </div>
  );
}
