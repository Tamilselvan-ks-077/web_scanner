import React, { useState } from 'react';
import { AlignLeft, Activity } from 'lucide-react';

const LogAnalyzer = () => {
    const [logText, setLogText] = useState('');
    const [parsedData, setParsedData] = useState([]);

    // Rudimentary common log format parser
    const parseLogs = () => {
        if (!logText.trim()) return;

        const lines = logText.split('\n').filter(l => l.trim() !== '');

        // Basic regex for common Apache/Nginx combined log format
        const regex = /^(\S+) \S+ \S+ \[([^\]]+)\] "([A-Z]+ \S+ \S+)" (\d{3}) (\d+|-) "([^"]*)" "([^"]*)"/;

        const data = lines.map((line, idx) => {
            const match = line.match(regex);
            if (match) {
                return {
                    id: idx,
                    ip: match[1],
                    time: match[2].split(' ')[0], // simplified time
                    request: match[3],
                    status: match[4],
                    raw: line
                };
            }
            // Fallback for unparsed lines
            return {
                id: idx,
                ip: 'Unknown',
                time: 'Unknown',
                request: line.substring(0, 30) + '...',
                status: '---',
                raw: line
            };
        });

        setParsedData(data);
    };

    const getStatusColor = (status) => {
        if (status.startsWith('2')) return 'var(--primary-glow)';
        if (status.startsWith('3')) return 'var(--secondary-glow)';
        if (status.startsWith('4')) return '#ffbf00'; // warning
        if (status.startsWith('5')) return 'var(--danger-color)';
        return 'var(--text-secondary)';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                    Paste Raw Server Logs (Apache Custom / Nginx Combined format)
                </label>
                <textarea
                    className="cyber-input"
                    value={logText}
                    onChange={(e) => setLogText(e.target.value)}
                    placeholder='127.0.0.1 - - [10/Oct/2023:13:55:36 -0700] "GET /index.html HTTP/1.1" 200 2326'
                    style={{ flex: 1, resize: 'none', fontFamily: 'var(--font-mono)' }}
                />
            </div>

            <button className="cyber-button" onClick={parseLogs} disabled={!logText}>
                <Activity size={18} /> INGEST & PARSE LOGS
            </button>

            <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '15px', borderBottom: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)' }}>
                    <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--primary-glow)' }}><AlignLeft size={16} /> EXTRACTED DATA TABLE</h3>
                </div>

                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {parsedData.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                            <thead style={{ position: 'sticky', top: 0, background: 'rgba(5,5,15,0.9)' }}>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '10px 15px', borderBottom: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>IP Address</th>
                                    <th style={{ textAlign: 'left', padding: '10px 15px', borderBottom: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>Timestamp</th>
                                    <th style={{ textAlign: 'left', padding: '10px 15px', borderBottom: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>Request</th>
                                    <th style={{ textAlign: 'center', padding: '10px 15px', borderBottom: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parsedData.map(row => (
                                    <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '8px 15px', color: 'var(--text-primary)' }}>{row.ip}</td>
                                        <td style={{ padding: '8px 15px', color: 'var(--text-secondary)' }}>{row.time}</td>
                                        <td style={{ padding: '8px 15px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.request}</td>
                                        <td style={{ padding: '8px 15px', textAlign: 'center', fontWeight: 'bold', color: getStatusColor(row.status) }}>{row.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No data parsed yet. Paste logs and click INGEST.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogAnalyzer;
