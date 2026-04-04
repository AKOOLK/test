'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useOSStore } from '@/lib/store';

const HELP_TEXT = `✨ Available Commands:
  help       - Show this help message
  about      - About the security analyst
  skills     - List technical skills
  projects   - Show project portfolio
  ctf        - CTF competition history
  whoami     - Display user info
  neofetch   - System information
  nmap       - Simulated port scan
  whois      - Domain lookup
  hashcat    - Hash cracking sim
  clear      - Clear terminal
  ls         - List directory
  exit       - Close terminal`;

export default function Terminal() {
  const { addTerminalLine, terminalHistory } = useOSStore();
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const parts = trimmed.split(' ');
      const command = parts[0];
      const args = parts.slice(1).join(' ');

      addTerminalLine(`<span class="text-pink-500 font-bold">🐱 neko</span><span class="text-purple-400">@cyber</span> ~ $ ${cmd}`);

      switch (command) {
        case 'help':
          addTerminalLine(HELP_TEXT);
          break;
        case 'about':
          addTerminalLine(`🌸 <span class="text-pink-600 font-bold">Alex "CyberWolf" Chen</span>`);
          addTerminalLine(`━ <span class="text-purple-500">Cybersecurity Student &bull; B.S. Computer Science</span>`);
          addTerminalLine(`━ <span class="text-purple-500">GPA: 3.8/4.0 &bull; Graduation: May 2026</span>`);
          addTerminalLine(``);
          addTerminalLine(`Passionate about offensive security, CTF, and building`);
          addTerminalLine(`secure systems with a touch of kawaii energy! ✨`);
          break;
        case 'skills':
          addTerminalLine(`<span class="text-pink-500">✿</span> Network Security     <span class="inline-block w-32 h-2 bg-pink-100 rounded-full overflow-hidden"><span class="block h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" style="width:85%"></span></span> 85%`);
          addTerminalLine(`<span class="text-violet-500">✿</span> Pen Testing         <span class="inline-block w-32 h-2 bg-violet-100 rounded-full overflow-hidden"><span class="block h-full bg-gradient-to-r from-violet-400 to-purple-400 rounded-full" style="width:92%"></span></span> 92%`);
          addTerminalLine(`<span class="text-blue-500">✿</span> Reverse Engineering <span class="inline-block w-32 h-2 bg-blue-100 rounded-full overflow-hidden"><span class="block h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" style="width:70%"></span></span> 70%`);
          addTerminalLine(`<span class="text-emerald-500">✿</span> Python scripting    <span class="inline-block w-32 h-2 bg-emerald-100 rounded-full overflow-hidden"><span class="block h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style="width:90%"></span></span> 90%`);
          addTerminalLine(`<span class="text-amber-500">✿</span> Web App Security    <span class="inline-block w-32 h-2 bg-amber-100 rounded-full overflow-hidden"><span class="block h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style="width:88%"></span></span> 88%`);
          addTerminalLine(`<span class="text-red-500">✿</span> Malware Analysis     <span class="inline-block w-32 h-2 bg-red-100 rounded-full overflow-hidden"><span class="block h-full bg-gradient-to-r from-red-400 to-rose-400 rounded-full" style="width:60%"></span></span> 60%`);
          break;
        case 'projects':
          addTerminalLine(`<span class="text-pink-500 font-bold">📚 Project Portfolio</span>`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-pink-400">01.</span> <span class="font-bold text-foreground/80">NetRecon Pro</span> - Automated recon toolkit ⭐ 234`);
          addTerminalLine(`<span class="text-violet-400">02.</span> <span class="font-bold text-foreground/80">VulnScanner</span> - Vulnerability assessment tool ⭐ 189`);
          addTerminalLine(`<span class="text-blue-400">03.</span> <span class="font-bold text-foreground/80">CryptoGuard</span> - File encryption in Rust ⭐ 156`);
          addTerminalLine(`<span class="text-emerald-400">04.</span> <span class="font-bold text-foreground/80">PhishDetect AI</span> - ML phishing detector ⭐ 312`);
          addTerminalLine(`<span class="text-amber-400">05.</span> <span class="font-bold text-foreground/80">SysMon Agent</span> - Endpoint monitoring ⭐ 98`);
          break;
        case 'ctf':
          addTerminalLine(`<span class="text-pink-500 font-bold">🏆 CTF Competition History</span>`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-yellow-400">🥇</span> DEF CON 32 CTF - Top 50 Global`);
          addTerminalLine(`<span class="text-yellow-400">🥇</span> HTB Cyber Apocalypse - 1st Place Uni`);
          addTerminalLine(`<span class="text-yellow-400">🥉</span> CryptoCTF 2024 - 3rd Place`);
          addTerminalLine(`<span class="text-yellow-400">🏅</span> picoCTF 2024 - Top 100`);
          addTerminalLine(`<span class="text-yellow-400">🏅</span> Angstrom CTF - Top 20`);
          addTerminalLine(``);
          addTerminalLine(`Total flags captured: <span class="text-pink-500 font-bold">312</span> ✨`);
          break;
        case 'whoami':
          addTerminalLine(`<span class="text-pink-500">name:</span> CyberWolf`);
          addTerminalLine(`<span class="text-pink-500">role:</span> offensive security student`);
          addTerminalLine(`<span class="text-pink-500">org:</span> university cyber team`);
          addTerminalLine(`<span class="text-pink-500">spirit animal:</span> 🐱`);
          break;
        case 'neofetch':
          addTerminalLine(`<span class="text-pink-500">       ╭──────────────╮</span>`);
          addTerminalLine(`<span class="text-pink-500">  🌸  │ CyberSakura  │  ✿</span>`);
          addTerminalLine(`<span class="text-pink-500">       ╰──────────────╯</span>`);
          addTerminalLine(`<span class="text-pink-400">  OS:</span> CyberSakura OS 1.0`);
          addTerminalLine(`<span class="text-pink-400">  Host:</span> CyberWolf`);
          addTerminalLine(`<span class="text-pink-400">  Kernel:</span> 5.15-anime`);
          addTerminalLine(`<span class="text-pink-400">  Shell:</span> neko-sh 2.0`);
          addTerminalLine(`<span class="text-pink-400">  Theme:</span> [Sakura Pink]`);
          addTerminalLine(`<span class="text-pink-400">  Terminal:</span> CyberTerm`);
          addTerminalLine(`<span class="text-pink-400">  CPU:</span> Brain @ 3.8GHz`);
          addTerminalLine(`<span class="text-pink-400">  Memory:</span> Lots of RAM (with snacks)`);
          break;
        case 'nmap':
          addTerminalLine(`Starting Nmap 7.94 ( https://nmap.org )`);
          addTerminalLine(`Scanning target...`);
          addTerminalLine(``);
          addTerminalLine(`PORT     STATE  SERVICE`);
          addTerminalLine(`<span class="text-emerald-500">22/tcp</span>   open   ssh`);
          addTerminalLine(`<span class="text-emerald-500">80/tcp</span>   open   http`);
          addTerminalLine(`<span class="text-emerald-500">443/tcp</span>  open   https`);
          addTerminalLine(`<span class="text-rose-400">3306/tcp</span> closed mysql`);
          addTerminalLine(`<span class="text-amber-400">8080/tcp</span> filtered proxy`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-purple-400">✨ Scan complete! All systems look secure~</span>`);
          break;
        case 'whois':
          addTerminalLine(`Domain: <span class="text-pink-500">${args || 'cyberwolf.dev'}</span>`);
          addTerminalLine(`Registrar: Cloudflare`);
          addTerminalLine(`Created: 2023-01-15`);
          addTerminalLine(`Expires: 2026-01-15`);
          addTerminalLine(`DNSSEC: signedDelegation ✅`);
          break;
        case 'hashcat':
          if (args) {
            addTerminalLine(`<span class="text-pink-400">💻</span> Cracking: <span class="text-purple-500">${args}</span>`);
            addTerminalLine(`<span class="text-amber-400">⏳</span> Progress: ████████████████ 100%`);
            addTerminalLine(`<span class="text-emerald-400">✅</span> Cracked! Password: <span class="text-pink-500">s4kura_p@ss</span>`);
          } else {
            addTerminalLine(`Usage: hashcat <hash>`);
          }
          break;
        case 'ls':
          addTerminalLine(`<span class="text-pink-400">📁</span> Desktop/  <span class="text-pink-400">📁</span> Projects/  <span class="text-pink-400">📁</span> CTF_Writeups/`);
          addTerminalLine(`<span class="text-violet-400">📄</span> resume.pdf  <span class="text-violet-400">🔒</span> .ssh/  <span class="text-violet-400">🔐</span> .gnupg/`);
          break;
        case 'clear':
          useOSStore.getState().clearTerminal();
          break;
        case 'exit':
          useOSStore.getState().closeWindow('terminal');
          break;
        case '':
          break;
        default:
          addTerminalLine(`<span class="text-rose-400">🐱 Nya~! Command not found: ${command}</span>`);
          addTerminalLine(`Type <span class="text-pink-500">help</span> for available commands~ ✨`);
          break;
      }
    },
    [addTerminalLine]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      processCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="h-full font-mono text-[13px] flex flex-col bg-[#1e1b2e] rounded-b-xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="px-4 py-2 flex items-center gap-2 text-xs text-purple-300/60 border-b border-white/5">
        <span>🐱 neko@cyber</span>
        <span>~</span>
        <span className="ml-auto">bash</span>
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        <div className="text-purple-300/70 text-xs mb-3">
          ╭─ <span className="text-pink-400">Welcome to CyberSakura Terminal</span> ✿ ─╮
        </div>
        <div className="text-purple-300/50 text-xs mb-1">
          │ Type <span className="text-pink-400 font-bold">help</span> for commands · Built with 🐱│
        </div>
        <div className="text-purple-300/70 text-xs mb-3">
          ╰──────────────────────────────╯
        </div>

        {terminalHistory.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap leading-relaxed text-purple-200/90"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {/* Terminal input */}
      <form onSubmit={handleSubmit} className="border-t border-white/5 px-4 py-3 flex items-center bg-[#1a1728]">
        <span className="text-pink-500 font-bold mr-1.5 whitespace-nowrap">🐱 neko</span>
        <span className="text-purple-400 mr-1.5">@cyber</span>
        <span className="text-purple-500/60 mr-2">~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-purple-200 outline-none caret-pink-400 placeholder:text-purple-500/30"
          placeholder="type a command..."
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
