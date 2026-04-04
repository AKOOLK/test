'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useOSStore } from '@/lib/store';

const HELP_TEXT = `Available commands:
  help          - Show this help message
  about         - About the security analyst
  skills        - List technical skills
  projects      - Show project portfolio
  ctf           - CTF competition history
  whoami        - Display current user info
  uname -a      - System information
  nmap          - Simulated port scan
  whois         - Domain lookup
  hashcat       - Hash cracking simulation
  clear         - Clear terminal
  ls            - List directory contents
  cat           - Read file contents
  exit          - Close terminal`;

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

      addTerminalLine(`<span class="text-green-400">agent@cyberos:~$</span> ${cmd}`);

      switch (command) {
        case 'help':
          addTerminalLine(HELP_TEXT);
          break;
        case 'about':
          addTerminalLine(`<span class="text-cyan-400">╔══════════════════════════════════════╗</span>`);
          addTerminalLine(`<span class="text-cyan-400">║</span>  <span class="text-green-400 font-bold">Alex "CyberWolf" Chen</span>          <span class="text-cyan-400">║</span>`);
          addTerminalLine(`<span class="text-cyan-400">║</span>  Cybersecurity Student             <span class="text-cyan-400">║</span>`);
          addTerminalLine(`<span class="text-cyan-400">║</span>  B.S. Computer Science             <span class="text-cyan-400">║</span>`);
          addTerminalLine(`<span class="text-cyan-400">║</span>  GPA: 3.8/4.0                      <span class="text-cyan-400">║</span>`);
          addTerminalLine(`<span class="text-cyan-400">║</span>  Graduation: May 2026              <span class="text-cyan-400">║</span>`);
          addTerminalLine(`<span class="text-cyan-400">╚══════════════════════════════════════╝</span>`);
          addTerminalLine(`Passionate about offensive security, reverse engineering,`);
          addTerminalLine(`and building secure systems. Active CTF player & bug bounty hunter.`);
          break;
        case 'skills':
          addTerminalLine(`<span class="text-yellow-400">[+] Network Security</span>       ████████████░░ 85%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Penetration Testing</span>     █████████████░ 92%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Reverse Engineering</span>     ██████████░░░░ 70%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Python / scripting</span>      █████████████░ 90%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Web App Security</span>        ████████████░░ 88%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Malware Analysis</span>        ████████░░░░░░ 60%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Digital Forensics</span>       █████████░░░░░ 75%`);
          addTerminalLine(`<span class="text-yellow-400">[+] Cloud Security (AWS)</span>    ████████░░░░░░ 65%`);
          addTerminalLine(`<span class="text-yellow-400">[+] C / C++ Exploit Dev</span>     █████████░░░░░ 72%`);
          break;
        case 'projects':
          addTerminalLine(`<span class="text-green-400">[PROJECTS]</span>`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-cyan-400">01.</span> <span class="text-white font-bold">NetRecon Pro</span> - Automated recon toolkit`);
          addTerminalLine(`    Python | Shodan API | Nmap | ASN lookup`);
          addTerminalLine(`    ⭐ 234 stars on GitHub`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-cyan-400">02.</span> <span class="text-white font-bold">VulnScanner</span> - Vulnerability assessment tool`);
          addTerminalLine(`    Go | CVE database | REST API`);
          addTerminalLine(`    Used by 500+ security researchers`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-cyan-400">03.</span> <span class="text-white font-bold">CryptoGuard</span> - File encryption utility`);
          addTerminalLine(`    Rust | AES-256-GCM | Zero-knowledge`);
          addTerminalLine(`    Featured on Rust subreddit`);
          break;
        case 'ctf':
          addTerminalLine(`<span class="text-red-400">╔══════════════════════════════════════════════╗</span>`);
          addTerminalLine(`<span class="text-red-400">║</span>  <span class="text-green-400 font-bold">CTF COMPETITION HISTORY</span>                <span class="text-red-400">║</span>`);
          addTerminalLine(`<span class="text-red-400">╚══════════════════════════════════════════════╝</span>`);
          addTerminalLine(``);
          addTerminalLine(`<span class="text-yellow-400">🏆</span> <span class="font-bold">DEF CON 32 CTF</span> - Top 50 Global`);
          addTerminalLine(`<span class="text-yellow-400">🏆</span> <span class="font-bold">HTB Cyber Apocalypse</span> - 1st Place Uni`);
          addTerminalLine(`<span class="text-yellow-400">🏆</span> <span class="font-bold">picoCTF 2024</span> - Top 100`);
          addTerminalLine(`<span class="text-yellow-400">🏆</span> <span class="font-bold">CryptoCTF 2024</span> - 3rd Place`);
          addTerminalLine(`<span class="text-yellow-400">🏆</span> <span class="font-bold">Angstrom CTF</span> - Top 20`);
          addTerminalLine(``);
          addTerminalLine(`Total CTFs participated: <span class="text-green-400">47</span>`);
          addTerminalLine(`Total flags captured: <span class="text-green-400">312</span>`);
          addTerminalLine(`Global HTB Rank: <span class="text-green-400">#1,247</span>`);
          break;
        case 'whoami':
          addTerminalLine(`agent=cyberwolf`);
          addTerminalLine(`role=offensive_security_student`);
          addTerminalLine(`org=university_cyber_team`);
          addTerminalLine(`clearance=secret`);
          break;
        case 'uname':
          addTerminalLine(`CyberOS 3.7.1 SMP PREEMPT_DYNAMIC x86_64 GNU/CyberLinux`);
          break;
        case 'nmap':
          addTerminalLine(`Starting Nmap 7.94 ( https://nmap.org ) at $(date)`);
          addTerminalLine(`Scanning target...`);
          addTerminalLine(``);
          addTerminalLine(`PORT      STATE  SERVICE       VERSION`);
          addTerminalLine(`<span class="text-green-400">22/tcp</span>   open   ssh           OpenSSH 9.6`);
          addTerminalLine(`<span class="text-green-400">80/tcp</span>   open   http          nginx 1.25`);
          addTerminalLine(`<span class="text-yellow-400">443/tcp</span>  open   https         nginx 1.25`);
          addTerminalLine(`<span class="text-red-400">3306/tcp</span> closed mysql`);
          addTerminalLine(`<span class="text-red-400">8080/tcp</span> filtered http-proxy`);
          addTerminalLine(``);
          addTerminalLine(`Nmap done: 1 IP address (1 host up) scanned in 4.23 seconds`);
          break;
        case 'whois':
          addTerminalLine(`Domain Name: ${args || 'cyberwolf.dev'}`);
          addTerminalLine(`Registrar: Cloudflare, Inc.`);
          addTerminalLine(`Creation Date: 2023-01-15T00:00:00Z`);
          addTerminalLine(`Expiry Date: 2026-01-15T23:59:59Z`);
          addTerminalLine(`Name Server: ns1.cloudflare.com`);
          addTerminalLine(`DNSSEC: signedDelegation`);
          addTerminalLine(`Status: clientTransferProhibited`);
          break;
        case 'hashcat':
          addTerminalLine(`hashcat (v6.2.6) starting...`);
          addTerminalLine(``);
          if (args) {
            addTerminalLine(`Hash.Mode: 0 (MD5)`);
            addTerminalLine(`Hash.Target: ${args}`);
            addTerminalLine(`<span class="text-green-400">[STATUS]</span> Cracking... 45%`);
            addTerminalLine(`<span class="text-green-400">[CRACKED]</span> ${args}:password123`);
          } else {
            addTerminalLine(`Usage: hashcat <hash>`);
            addTerminalLine(`Example: hashcat 5f4dcc3b5aa765d61d8327deb882cf99`);
          }
          break;
        case 'ls':
          addTerminalLine(`<span class="text-blue-400">drwxr-xr-x</span>  Desktop/`);
          addTerminalLine(`<span class="text-blue-400">drwxr-xr-x</span>  Documents/`);
          addTerminalLine(`<span class="text-blue-400">drwxr-xr-x</span>  Projects/`);
          addTerminalLine(`<span class="text-blue-400">drwxr-xr-x</span>  CTF_Writeups/`);
          addTerminalLine(`<span class="text-green-400">-rwx------</span>  .ssh/`);
          addTerminalLine(`<span class="text-green-400">-rwx------</span>  .gnupg/`);
          addTerminalLine(`<span class="text-yellow-400">-rw-r--r--</span>  resume.pdf`);
          addTerminalLine(`<span class="text-yellow-400">-rw-r--r--</span>  portfolio.key`);
          break;
        case 'cat':
          if (args.includes('resume')) {
            addTerminalLine(`[Binary file - Use GUI viewer to open resume.pdf]`);
          } else if (args) {
            addTerminalLine(`cat: ${args}: Permission denied`);
          } else {
            addTerminalLine(`Usage: cat <filename>`);
          }
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
          addTerminalLine(`<span class="text-red-400">bash: ${command}: command not found</span>`);
          addTerminalLine(`Type <span class="text-green-400">help</span> for available commands.`);
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
      className="h-full bg-black/95 font-mono text-sm flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="bg-[#1a1a2e] border-b border-green-900/50 px-4 py-2 flex items-center gap-2 text-xs">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-green-400 ml-2">agent@cyberos: ~</span>
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        <div className="text-green-400">
          ╔════════════════════════════════════════════╗
        </div>
        <div className="text-green-400">
          ║ <span className="text-cyan-400 font-bold">CyberOS Terminal v3.7</span> - Security Analyst Shell ║
        </div>
        <div className="text-green-400">
          ║ Type <span className="text-yellow-400">&apos;help&apos;</span> for available commands              ║
        </div>
        <div className="text-green-400">
          ╚════════════════════════════════════════════╝
        </div>
        <div className="text-muted-foreground mt-2">
          Last login: {new Date().toLocaleString()} from 10.0.0.1
        </div>

        {terminalHistory.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {/* Terminal input */}
      <form onSubmit={handleSubmit} className="border-t border-green-900/50 px-4 py-3 flex items-center">
        <span className="text-green-400 mr-2 whitespace-nowrap">agent@cyberos:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
