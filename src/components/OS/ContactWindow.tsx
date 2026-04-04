'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Github, Linkedin, Mail, Globe, Lock } from 'lucide-react';

const socials = [
  {
    name: 'GitHub',
    handle: '@cyberwolf-dev',
    icon: <Github size={16} />,
    url: '#',
    color: 'text-white hover:text-white',
    bg: 'bg-[#21262d] hover:bg-white/20',
  },
  {
    name: 'LinkedIn',
    handle: 'Alex Chen',
    icon: <Linkedin size={16} />,
    url: '#',
    color: 'text-blue-400 hover:text-blue-300',
    bg: 'bg-[#21262d] hover:bg-blue-900/30',
  },
  {
    name: 'Twitter/X',
    handle: '@cyberwolf_sec',
    icon: <Globe size={16} />,
    url: '#',
    color: 'text-white hover:text-white',
    bg: 'bg-[#21262d] hover:bg-white/20',
  },
  {
    name: 'Email',
    handle: 'alex@cyberwolf.dev',
    icon: <Mail size={16} />,
    url: 'mailto:alex@cyberwolf.dev',
    color: 'text-green-400 hover:text-green-300',
    bg: 'bg-[#21262d] hover:bg-green-900/30',
  },
];

const pgpFingerprint =
  '4A2B 8C3D 9E1F 5A67 B4C2  D8E3 F1A2 3B4C 5D6E 7F8A';

export default function ContactWindow() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [encrypt, setEncrypt] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="p-6 font-mono space-y-5">
      <div className="text-green-400 text-sm font-bold">&gt; secure_comms.sh --start</div>
      <div className="text-green-300/60 text-xs">Establishing encrypted channel... OK</div>

      {/* PGP Key */}
      <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
        <div className="flex items-center gap-2 mb-2">
          <Lock size={14} className="text-yellow-400" />
          <h3 className="text-yellow-400 text-xs font-bold">PGP Public Key Fingerprint</h3>
        </div>
        <div className="text-green-400 text-xs bg-black/40 rounded p-2 font-mono break-all">
          {pgpFingerprint}
        </div>
        <div className="text-green-500/50 text-[10px] mt-2">
          Encrypt sensitive messages using this key for end-to-end security
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        <h3 className="text-cyan-400 text-xs font-bold">&gt; cat /etc/social_links.conf</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              className={`flex items-center gap-3 p-3 rounded-lg border border-[#30363d] ${s.bg} transition-all group`}
            >
              <span className={s.color}>{s.icon}</span>
              <div>
                <div className="text-green-300 text-xs font-bold">{s.name}</div>
                <div className="text-green-500/50 text-[10px]">{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-green-400 text-xs font-bold">&gt; Send Secure Message</h3>
          <button
            onClick={() => setEncrypt(!encrypt)}
            className="flex items-center gap-1.5 text-[10px] text-yellow-400 hover:text-yellow-300"
          >
            <Lock size={10} />
            <span>Encrypt: {encrypt ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-2xl mb-2">✓</div>
            <div className="text-green-400 text-sm font-bold">Message Sent!</div>
            <div className="text-green-500/50 text-xs mt-1">Encrypted transmission complete</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-green-500/50 text-[10px] block mb-1">IDENTITY</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-[#0d1117] border-[#30363d] text-green-400 placeholder:text-green-800 font-mono text-xs h-9 focus:border-green-700"
                  required
                />
              </div>
              <div>
                <label className="text-green-500/50 text-[10px] block mb-1">COMM_FREQ</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  className="bg-[#0d1117] border-[#30363d] text-green-400 placeholder:text-green-800 font-mono text-xs h-9 focus:border-green-700"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-green-500/50 text-[10px] block mb-1">TRANSMISSION</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="w-full bg-[#0d1117] border border-[#30363d] text-green-400 placeholder:text-green-800 font-mono text-xs rounded-md p-3 resize-none focus:border-green-700 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              {encrypt && (
                <Badge className="bg-yellow-900/30 text-yellow-400 text-[10px] border-yellow-800/30">
                  🔒 AES-256 Encrypted
                </Badge>
              )}
              <Button
                type="submit"
                className="ml-auto bg-green-900/40 hover:bg-green-900/60 text-green-400 border border-green-800/50 text-xs font-mono h-8"
              >
                <Send size={12} className="mr-1" />
                Transmit
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
