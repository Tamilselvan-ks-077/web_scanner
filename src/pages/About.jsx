import React from 'react';
import { Info, Shield, Users, Server } from 'lucide-react';

const About = () => {
    return (
        <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Info size={48} style={{ color: 'var(--primary-glow)', marginBottom: '16px' }} />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>ABOUT SYSTEM</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Cyber Toolkit Hub v1.0.0</p>
                </div>

                <div className="about-content" style={{ lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '20px' }}>
                        The <strong>Cyber Toolkit Hub</strong> is an advanced utility suite designed for security analysts, penetration testers, and system administrators. It consolidates multiple disparate tools into a single, unified interface for rapid security assessment and cryptographic operations.
                    </p>

                    <h3 style={{ color: 'var(--secondary-glow)', marginTop: '30px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={20} /> Project Objectives
                    </h3>
                    <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                        <li style={{ marginBottom: '10px', position: 'relative', paddingLeft: '20px' }}>
                            <span style={{ position: 'absolute', left: '0', color: 'var(--primary-glow)' }}>&gt;</span>
                            Provide a centralized dashboard for common security tasks.
                        </li>
                        <li style={{ marginBottom: '10px', position: 'relative', paddingLeft: '20px' }}>
                            <span style={{ position: 'absolute', left: '0', color: 'var(--primary-glow)' }}>&gt;</span>
                            Ensure zero-latency client-side operations where applicable.
                        </li>
                        <li style={{ marginBottom: '10px', position: 'relative', paddingLeft: '20px' }}>
                            <span style={{ position: 'absolute', left: '0', color: 'var(--primary-glow)' }}>&gt;</span>
                            Maintain a stealthy, dark-mode operator UI.
                        </li>
                    </ul>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                        <div className="glass-panel" style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                            <Users size={32} style={{ color: 'var(--primary-glow)', margin: '0 auto 10px' }} />
                            <h4>Designed for Teams</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Collaborative toolsets for red and blue teams.</p>
                        </div>
                        <div className="glass-panel" style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                            <Server size={32} style={{ color: 'var(--primary-glow)', margin: '0 auto 10px' }} />
                            <h4>Local Computation</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Most hashing and encoding tools run directly in your browser.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
