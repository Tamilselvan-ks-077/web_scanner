import React, { useState, useEffect } from 'react';

const SystemMonitor = () => {
    const [cpu, setCpu] = useState(34);
    const [mem, setMem] = useState(62);
    const [net, setNet] = useState(142);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10))));
            setMem(prev => Math.min(100, Math.max(0, prev + (Math.random() * 5 - 2))));
            setNet(prev => Math.max(10, prev + (Math.random() * 40 - 20)));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getColor = (val) => {
        if (val > 85) return 'var(--danger-glow)';
        if (val > 60) return 'var(--secondary-glow)';
        return 'var(--primary-glow)';
    };

    return (
        <div className="system-monitor terminal-panel" style={{ padding: '15px' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px dotted var(--panel-border)', paddingBottom: '10px', marginBottom: '15px' }}>
                [ SYSTEM_RESOURCES ]
            </h3>

            <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                    <span>CPU_LOAD</span>
                    <span style={{ color: getColor(cpu) }}>{cpu.toFixed(1)}%</span>
                </div>
                <div style={{ height: '6px', background: '#002200', border: '1px solid var(--panel-border)' }}>
                    <div style={{ width: `${cpu}%`, height: '100%', background: getColor(cpu), transition: 'width 0.5s linear, background 0.5s' }}></div>
                </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                    <span>MEM_ALLOC</span>
                    <span style={{ color: getColor(mem) }}>{mem.toFixed(1)}%</span>
                </div>
                <div style={{ height: '6px', background: '#002200', border: '1px solid var(--panel-border)' }}>
                    <div style={{ width: `${mem}%`, height: '100%', background: getColor(mem), transition: 'width 0.5s linear, background 0.5s' }}></div>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                    <span>NET_TX_RX</span>
                    <span style={{ color: 'var(--text-primary)' }}>{net.toFixed(0)} MB/s</span>
                </div>
                <div style={{ height: '6px', background: '#002200', border: '1px solid var(--panel-border)' }}>
                    <div style={{ width: `${Math.min(100, (net / 300) * 100)}%`, height: '100%', background: 'var(--primary-glow)', transition: 'width 0.5s linear' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SystemMonitor;
