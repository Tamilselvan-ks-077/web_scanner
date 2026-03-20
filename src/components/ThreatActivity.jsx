import React, { useState, useEffect } from 'react';

const ThreatActivity = () => {
    const [events, setEvents] = useState([
        { id: 1, type: 'WARN', msg: 'Port scan detected from 192.168.1.45', time: new Date().toLocaleTimeString() },
        { id: 2, type: 'INFO', msg: 'Firewall rules updated', time: new Date().toLocaleTimeString() },
        { id: 3, type: 'CRIT', msg: 'Failed SSH login attempt (root)', time: new Date().toLocaleTimeString() }
    ]);

    useEffect(() => {
        const potentialEvents = [
            { type: 'INFO', msg: 'System integrity check passed' },
            { type: 'WARN', msg: 'Unexpected outbound traffic on port 4444' },
            { type: 'INFO', msg: 'New VPN connection established' },
            { type: 'CRIT', msg: 'Malware signature matched in memory' },
            { type: 'INFO', msg: 'Admin session closed' },
            { type: 'WARN', msg: 'Multiple failed auth attempts on service X' }
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const newEvent = {
                    id: Date.now(),
                    ...potentialEvents[Math.floor(Math.random() * potentialEvents.length)],
                    time: new Date().toLocaleTimeString()
                };
                setEvents(prev => [newEvent, ...prev].slice(0, 5)); // Keep last 5
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="threat-activity terminal-panel" style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px dotted var(--panel-border)', paddingBottom: '10px', marginBottom: '10px' }}>
                [ THREAT_INTEL_FEED ]
            </h3>

            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {events.map((ev) => (
                    <div key={ev.id} style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', borderLeft: `2px solid ${ev.type === 'CRIT' ? 'var(--danger-glow)' : ev.type === 'WARN' ? 'var(--secondary-glow)' : 'var(--primary-glow)'}`, paddingLeft: '8px', animation: 'fadeIn 0.3s' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>[{ev.time}]</span>{' '}
                        <span style={{ color: ev.type === 'CRIT' ? 'var(--danger-glow)' : ev.type === 'WARN' ? 'var(--secondary-glow)' : 'var(--primary-glow)', fontWeight: 'bold' }}>
                            {ev.type}
                        </span>{' '}
                        <span style={{ color: 'var(--text-primary)' }}>{ev.msg}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreatActivity;
