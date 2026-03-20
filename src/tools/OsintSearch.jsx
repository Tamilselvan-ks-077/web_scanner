import React, { useState, useRef, useEffect } from 'react';
import { Search, Play, Globe, Mail, User } from 'lucide-react';

const RECON_MODES = [
    { id: 'domain', label: 'DOMAIN RECON', icon: Globe, placeholder: 'e.g. example.com' },
    { id: 'email', label: 'EMAIL RECON', icon: Mail, placeholder: 'e.g. user@example.com' },
    { id: 'username', label: 'USERNAME HUNT', icon: User, placeholder: 'e.g. hacker_handle' },
];

const domainRecon = (target) => [
    { delay: 200, msg: `[WHOIS] Querying WHOIS database for ${target}...`, color: 'var(--secondary-glow)' },
    { delay: 400, msg: `[WHOIS] Registrar: GoDaddy LLC`, color: 'var(--text-primary)' },
    { delay: 200, msg: `[WHOIS] Created:  2018-04-12 | Expires: 2026-04-12`, color: 'var(--text-primary)' },
    { delay: 300, msg: `[DNS]   Resolving A records...`, color: 'var(--secondary-glow)' },
    { delay: 350, msg: `[DNS]   A:     104.21.${rnd(10, 250)}.${rnd(10, 250)} (Cloudflare CDN)`, color: 'var(--primary-glow)' },
    { delay: 200, msg: `[DNS]   MX:    mail.${target} (Priority 10)`, color: 'var(--text-primary)' },
    { delay: 200, msg: `[DNS]   TXT:   v=spf1 include:_spf.google.com ~all`, color: 'var(--text-primary)' },
    { delay: 400, msg: `[SSL]   Checking TLS certificate...`, color: 'var(--secondary-glow)' },
    { delay: 300, msg: `[SSL]   Valid: YES | Issuer: Let's Encrypt | Expiry: 2025-09-18`, color: 'var(--primary-glow)' },
    { delay: 400, msg: `[SUBS]  Enumerating subdomains via passive recon...`, color: 'var(--secondary-glow)' },
    { delay: 500, msg: `[SUBS]  Found: mail.${target}`, color: 'var(--primary-glow)' },
    { delay: 250, msg: `[SUBS]  Found: api.${target}`, color: 'var(--primary-glow)' },
    { delay: 300, msg: `[SUBS]  Found: admin.${target} ⚠ SENSITIVE`, color: '#ff8c00' },
    { delay: 250, msg: `[SUBS]  Found: dev.${target} ⚠ SENSITIVE`, color: '#ff8c00' },
    { delay: 400, msg: `[SHODAN] Fetching exposed services...`, color: 'var(--secondary-glow)' },
    { delay: 500, msg: `[SHODAN] Open ports detected: 80, 443, 22`, color: 'var(--text-primary)' },
    { delay: 200, msg: `[SHODAN] Server: nginx/1.24.0`, color: 'var(--text-primary)' },
    { delay: 400, msg: `\n[DONE]  Recon complete. Review findings above.`, color: 'var(--primary-glow)' },
];

const emailRecon = (target) => [
    { delay: 200, msg: `[INIT]  Starting email recon for ${target}`, color: 'var(--secondary-glow)' },
    { delay: 300, msg: `[PARSE] Username: ${target.split('@')[0]}  |  Domain: ${target.split('@')[1]}`, color: 'var(--text-primary)' },
    { delay: 400, msg: `[MX]    Checking mail server configuration...`, color: 'var(--secondary-glow)' },
    { delay: 350, msg: `[MX]    Primary MX: aspmx.l.google.com (Google Workspace)`, color: 'var(--primary-glow)' },
    { delay: 400, msg: `[VALID] Running SMTP existence check...`, color: 'var(--secondary-glow)' },
    { delay: 600, msg: `[VALID] Deliverable: LIKELY (250 OK response)`, color: 'var(--primary-glow)' },
    { delay: 400, msg: `[BREACH] Checking HaveIBeenPwned feeds...`, color: 'var(--secondary-glow)' },
    { delay: 700, msg: `[BREACH] ⚠ Found in ${rnd(1, 4)} data breach(es):`, color: '#ff8c00' },
    { delay: 200, msg: `[BREACH]   - Collection #1 (2019) — Passwords exposed`, color: '#ff2020' },
    { delay: 200, msg: `[BREACH]   - LinkedIn (2021) — Email + hashed passwords`, color: '#ff2020' },
    { delay: 400, msg: `[DORK]  Running Google dork queries...`, color: 'var(--secondary-glow)' },
    { delay: 400, msg: `[DORK]  Pattern found in: GitHub, LinkedIn, Pastebin`, color: 'var(--text-primary)' },
    { delay: 300, msg: `\n[DONE]  Email recon complete. ${rnd(3, 8)} artifacts collected.`, color: 'var(--primary-glow)' },
];

const usernameRecon = (target) => [
    { delay: 200, msg: `[INIT]  Hunting username "${target}" across ${rnd(30, 50)} platforms...`, color: 'var(--secondary-glow)' },
    { delay: 400, msg: `[CHECK] Platform scan initiated...`, color: 'var(--text-secondary)' },
    ...PLATFORMS.map((p, i) => ({ delay: 150 + i * 30, msg: `[${p.found ? 'FOUND' : 'MISS '}]  ${p.name.padEnd(16)} ${p.found ? `https://${p.url}/${target}` : '— not found'}`, color: p.found ? 'var(--primary-glow)' : 'var(--text-dim, #444)' })),
    { delay: 400, msg: `\n[DONE]  Username found on ${PLATFORMS.filter(p => p.found).length} platforms. Collect and cross-correlate.`, color: 'var(--primary-glow)' },
];

const PLATFORMS = [
    { name: 'GitHub', url: 'github.com', found: true },
    { name: 'Twitter/X', url: 'x.com', found: Math.random() > 0.4 },
    { name: 'LinkedIn', url: 'linkedin.com', found: Math.random() > 0.5 },
    { name: 'Instagram', url: 'instagram.com', found: Math.random() > 0.5 },
    { name: 'Reddit', url: 'reddit.com', found: Math.random() > 0.4 },
    { name: 'HackerNews', url: 'news.ycombinator.com', found: Math.random() > 0.6 },
    { name: 'Pastebin', url: 'pastebin.com', found: Math.random() > 0.7 },
    { name: 'Docker Hub', url: 'hub.docker.com', found: Math.random() > 0.7 },
    { name: 'GitLab', url: 'gitlab.com', found: Math.random() > 0.6 },
    { name: 'TikTok', url: 'tiktok.com', found: Math.random() > 0.5 },
];

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const OsintSearch = () => {
    const [mode, setMode] = useState('domain');
    const [target, setTarget] = useState('');
    const [running, setRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const logRef = useRef(null);

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [logs]);

    const runRecon = async () => {
        if (!target.trim()) return;
        setRunning(true);
        setLogs([]);
        const steps = mode === 'domain' ? domainRecon(target) : mode === 'email' ? emailRecon(target) : usernameRecon(target);
        for (const step of steps) {
            await sleep(step.delay);
            setLogs(prev => [...prev, { msg: step.msg, color: step.color }]);
        }
        setRunning(false);
    };

    const modeInfo = RECON_MODES.find(m => m.id === mode);
    const Icon = modeInfo.icon;

    return (
        <div style={{ fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Mode selector */}
            <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--panel-border)' }}>
                {RECON_MODES.map(({ id, label, icon: MIcon }) => (
                    <button key={id} onClick={() => { setMode(id); setLogs([]); setTarget(''); }}
                        disabled={running}
                        style={{ padding: '10px 20px', fontSize: '0.72rem', background: mode === id ? 'rgba(51,255,0,0.1)' : 'transparent', color: mode === id ? 'var(--primary-glow)' : 'var(--text-secondary)', border: 'none', borderBottom: mode === id ? '2px solid var(--primary-glow)' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                        <MIcon size={13} />{label}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Icon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        className="cyber-input"
                        style={{ width: '100%', paddingLeft: '36px', boxSizing: 'border-box' }}
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                        placeholder={modeInfo.placeholder}
                        disabled={running}
                        onKeyDown={e => e.key === 'Enter' && !running && runRecon()}
                    />
                </div>
                <button className="cyber-button" onClick={runRecon} disabled={running || !target.trim()}
                    style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    {running
                        ? <><span className="scan-blink" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'inline-block', animation: 'pulse-scan 0.8s infinite' }} /> RECON...</>
                        : <><Search size={15} /> RUN RECON</>
                    }
                </button>
            </div>

            {/* Terminal output */}
            <div
                ref={logRef}
                style={{ background: 'rgba(0,5,0,0.9)', border: '1px solid var(--panel-border)', padding: '16px', height: '380px', overflowY: 'auto', fontSize: '0.73rem', lineHeight: '1.9' }}
            >
                {logs.length === 0
                    ? <div style={{ color: 'var(--text-secondary)' }}>
                        <div>&gt; OSINT Reconnaissance Module v2.1</div>
                        <div>&gt; Select a recon mode, enter a target, and press RUN RECON.</div>
                        <div style={{ marginTop: '8px', color: '#444' }}>&gt; All data is simulated for educational purposes only.</div>
                    </div>
                    : logs.map((l, i) => <div key={i} style={{ color: l.color, whiteSpace: 'pre-wrap' }}>{l.msg}</div>)
                }
                {running && <span style={{ animation: 'blink 0.8s step-end infinite', color: 'var(--primary-glow)' }}>█</span>}
            </div>
        </div>
    );
};

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

export default OsintSearch;
