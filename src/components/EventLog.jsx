import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Activity, Wifi } from 'lucide-react';
import './EventLog.css';

const MOCK_EVENTS = [
    { type: 'info', msg: 'System initialization complete.' },
    { type: 'info', msg: 'Matrix connection established.' },
    { type: 'warning', msg: 'Port scan detected from 192.168.1.45' },
    { type: 'alert', msg: 'Intrusion attempt blocked on eth0.' },
    { type: 'info', msg: 'Updating threat intelligence database...' },
    { type: 'info', msg: 'Database synchronized.' },
    { type: 'warning', msg: 'Anomalous traffic on port 443.' },
    { type: 'info', msg: 'Routine diagnostic check: OK.' },
];

const EventLog = () => {
    const [events, setEvents] = useState([MOCK_EVENTS[0], MOCK_EVENTS[1]]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomEvent = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)];
            const newEvent = {
                ...randomEvent,
                id: Date.now(),
                time: new Date().toLocaleTimeString('en-US', { hour12: false })
            };

            setEvents(prev => {
                const updated = [...prev, newEvent];
                if (updated.length > 8) updated.shift();
                return updated;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-panel event-log-container">
            <div className="log-header">
                <h3><Terminal size={14} /> LIVE SYSTEM FEED</h3>
                <div className="pulse-indicator"></div>
            </div>
            <div className="log-body">
                {events.map((ev, i) => (
                    <div key={ev.id || i} className={`log-entry ${ev.type}`}>
                        <span className="log-time">[{ev.time || '12:00:00'}]</span>
                        <span className="log-msg">{ev.msg}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventLog;
