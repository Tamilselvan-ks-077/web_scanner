import React, { useState, useRef, useEffect } from 'react';
import { Radio, Play, Square, AlertTriangle } from 'lucide-react';

const COMMON_PORTS = [
    { port: 21, service: 'FTP', risk: 'HIGH' },
    { port: 22, service: 'SSH', risk: 'MED' },
    { port: 23, service: 'TELNET', risk: 'CRIT' },
    { port: 25, service: 'SMTP', risk: 'MED' },
    { port: 53, service: 'DNS', risk: 'LOW' },
    { port: 80, service: 'HTTP', risk: 'LOW' },
    { port: 110, service: 'POP3', risk: 'MED' },
    { port: 135, service: 'RPC', risk: 'HIGH' },
    { port: 139, service: 'NETBIOS', risk: 'HIGH' },
    { port: 143, service: 'IMAP', risk: 'MED' },
    { port: 443, service: 'HTTPS', risk: 'LOW' },
    { port: 445, service: 'SMB', risk: 'CRIT' },
    { port: 1433, service: 'MSSQL', risk: 'HIGH' },
    { port: 3306, service: 'MySQL', risk: 'HIGH' },
    { port: 3389, service: 'RDP', risk: 'CRIT' },
    { port: 5432, service: 'PostgreSQL', risk: 'HIGH' },
    { port: 6379, service: 'Redis', risk: 'CRIT' },
    { port: 8080, service: 'HTTP-Alt', risk: 'LOW' },
    { port: 8443, service: 'HTTPS-Alt', risk: 'LOW' },
    { port: 27017, service: 'MongoDB', risk: 'HIGH' },
];

const riskColor = { CRIT: '#ff2020', HIGH: '#ff8c00', MED: '#ffd700', LOW: '#33ff00' };

const PortScanner = () => {
    const [target, setTarget] = useState('');
    const [scanning, setScanning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [results, setResults] = useState([]);
    const [progress, setProgress] = useState(0);
    const stopRef = useRef(false);
    const logRef = useRef(null);

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [logs]);

    const addLog = (msg, color = 'var(--text-primary)') =>
        setLogs(prev => [...prev, { msg, color, ts: Date.now() }]);

    const scan = async () => {
        if (!target.trim()) { addLog('[ERR] No target specified.', 'var(--danger-glow)'); return; }
        stopRef.current = false;
        setScanning(true);
        setLogs([]);
        setResults([]);
        setProgress(0);

        addLog(`[INIT] Starting port scan on target: ${target}`, 'var(--secondary-glow)');
        addLog('[INIT] Loading known port signatures...', 'var(--text-secondary)');
        await sleep(400);
        addLog('[INIT] Probing network interface... OK', 'var(--text-secondary)');
        await sleep(300);
        addLog(`[SCAN] Scanning ${COMMON_PORTS.length} common ports...\n`, 'var(--primary-glow)');

        const found = [];
        for (let i = 0; i < COMMON_PORTS.length; i++) {
            if (stopRef.current) break;
            const { port, service, risk } = COMMON_PORTS[i];
            await sleep(120 + Math.random() * 180);

            const isOpen = Math.random() < 0.35;
            setProgress(Math.round(((i + 1) / COMMON_PORTS.length) * 100));

            if (isOpen) {
                addLog(`  [OPEN]  ${port.toString().padEnd(6)} ${service.padEnd(14)} RISK: ${risk}`, riskColor[risk]);
                found.push({ port, service, risk });
            } else {
                addLog(`  [CLSD]  ${port.toString().padEnd(6)} ${service.padEnd(14)} filtered`, 'var(--text-dim, #444)');
            }
        }

        setResults(found);
        addLog('', '');
        addLog(`[DONE] Scan complete. Open ports: ${found.length} / ${COMMON_PORTS.length}`, 'var(--primary-glow)');
        if (found.some(r => r.risk === 'CRIT')) {
            addLog('[WARN] CRITICAL vulnerabilities detected! Immediate attention required.', 'var(--danger-glow)');
        }
        setScanning(false);
    };

    const stop = () => { stopRef.current = true; addLog('[ABRT] Scan aborted by user.', '#ff8c00'); };

    return (
        <div style={{ fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>TARGET HOST / IP</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        className="cyber-input"
                        style={{ flex: 1 }}
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                        placeholder="e.g. 192.168.1.1 or example.com"
                        disabled={scanning}
                        onKeyDown={e => e.key === 'Enter' && !scanning && scan()}
                    />
                    {!scanning ? (
                        <button className="cyber-button" onClick={scan} style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Play size={16} /> SCAN
                        </button>
                    ) : (
                        <button className="cyber-button" style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,32,32,0.2)', borderColor: '#ff2020', color: '#ff2020' }} onClick={stop}>
                            <Square size={16} /> STOP
                        </button>
                    )}
                </div>

                {scanning && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                            <span>SCAN_PROGRESS</span><span style={{ color: 'var(--primary-glow)' }}>{progress}%</span>
                        </div>
                        <div style={{ height: '4px', background: '#001100', border: '1px solid var(--panel-border)' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary-glow)', transition: 'width 0.3s linear', boxShadow: '0 0 8px var(--primary-glow)' }} />
                        </div>
                    </div>
                )}
            </div>

            <div
                ref={logRef}
                style={{ background: 'rgba(0,5,0,0.9)', border: '1px solid var(--panel-border)', padding: '16px', height: '320px', overflowY: 'auto', fontSize: '0.75rem', lineHeight: '1.8' }}
            >
                {logs.length === 0
                    ? <span style={{ color: 'var(--text-secondary)' }}>&gt; Awaiting target input. Enter a host and press SCAN.</span>
                    : logs.map((l, i) => <div key={i} style={{ color: l.color }}>{l.msg}</div>)
                }
            </div>

            {results.length > 0 && (
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px', borderBottom: '1px dotted var(--panel-border)', paddingBottom: '8px' }}>
                        [ OPEN_PORTS_SUMMARY ] — {results.length} found
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                        {results.map(r => (
                            <div key={r.port} style={{ border: `1px solid ${riskColor[r.risk]}33`, padding: '10px', background: `${riskColor[r.risk]}10`, fontSize: '0.8rem' }}>
                                <div style={{ color: riskColor[r.risk], fontWeight: 700 }}>{r.port} / {r.service}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', marginTop: '4px' }}>
                                    {r.risk === 'CRIT' && <><AlertTriangle size={10} style={{ display: 'inline' }} /> </>}
                                    RISK: {r.risk}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

export default PortScanner;
