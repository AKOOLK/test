'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Github, Linkedin, Mail, Globe, Lock } from 'lucide-react';

const socials = [
  { name: 'GitHub', handle: '@cyberwolf-dev', icon: <Github size={16} />, gradient: 'from-gray-600 to-gray-800' },
  { name: 'LinkedIn', handle: 'Alex Chen', icon: <Linkedin size={16} />, gradient: 'from-blue-500 to-blue-700' },
  { name: 'Twitter/X', handle: '@cyberwolf_sec', icon: <Globe size={16} />, gradient: 'from-sky-500 to-sky-700' },
  { name: 'Email', handle: 'alex@cyberwolf.dev', icon: <Mail size={16} />, gradient: 'from-pink-500 to-rose-600' },
];

const pgpFingerprint = '4A2B 8C3D 9E1F 5A67 B4C2  D8E3 F1A2 3B4C 5D6E 7F8A';

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
    <div className="p-6 space-y-5 bg-gradient-to-br from-rose-50/50 to-pink-50/50 min-h-full">
      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-lg">💌</span>
        <h2 className="font-bold text-lg">Secret Comms</h2>
      </div>

      {/* PGP Key */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lock size={14} className="text-amber-500" />
          <h3 className="text-xs font-bold text-foreground/70">PGP Public Key</h3>
        </div>
        <div className="bg-foreground/5 rounded-lg p-2.5 font-mono text-[11px] text-foreground/50 break-all">
          {pgpFingerprint}
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground/80 flex items-center gap-2">
          <span>🌐</span> Connect
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {socials.map((s) => (
            <button
              key={s.name}
              className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${s.gradient} text-white hover:opacity-90 transition-all shadow-sm hover:shadow-md`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                {s.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{s.name}</div>
                <div className="text-white/70 text-[10px]">{s.handle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground/80 flex items-center gap-2">
            <span>✉️</span> Send Message
          </h3>
          <button
            onClick={() => setEncrypt(!encrypt)}
            className="flex items-center gap-1.5 text-[10px] text-amber-600 hover:text-amber-700 transition-colors"
          >
            <Lock size={10} />
            <span>Encrypt: {encrypt ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🌸</div>
            <div className="text-foreground/80 font-bold">Message Sent!</div>
            <div className="text-foreground/40 text-xs mt-1">Arigatou gozaimasu~ ✨</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-foreground/40 text-[10px] block mb-1 font-medium">NAME</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-white/80 border-foreground/10 text-foreground/80 placeholder:text-foreground/25 text-sm h-9 focus:border-pink-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-foreground/40 text-[10px] block mb-1 font-medium">EMAIL</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  className="bg-white/80 border-foreground/10 text-foreground/80 placeholder:text-foreground/25 text-sm h-9 focus:border-pink-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-foreground/40 text-[10px] block mb-1 font-medium">MESSAGE</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={4}
                className="w-full bg-white/80 border border-foreground/10 text-foreground/80 placeholder:text-foreground/25 text-sm rounded-lg p-3 resize-none focus:border-pink-300 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              {encrypt && (
                <Badge className="bg-amber-50 text-amber-600 text-[10px] border-amber-200 border">
                  🔒 AES-256 Encrypted
                </Badge>
              )}
              <Button
                type="submit"
                className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs h-9 rounded-lg shadow-sm hover:shadow-md transition-all border-0"
              >
                <Send size={12} className="mr-1.5" />
                Send ✨
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
