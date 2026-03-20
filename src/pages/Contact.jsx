import React from 'react';
import { Mail, MessageSquare, Terminal, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>SECURE TRANSMISSION</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Establish an encrypted communication channel</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px' }}>
                {/* Contact info sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px', color: 'var(--primary-glow)' }}>Direct Channels</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ background: 'rgba(0,255,128,0.1)', padding: '10px', borderRadius: '50%' }}>
                                <Mail size={18} style={{ color: 'var(--primary-glow)' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email (PGP key available)</div>
                                <div style={{ fontFamily: 'var(--font-mono)' }}>secure@cybertoolkit.dev</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ background: 'rgba(0,191,255,0.1)', padding: '10px', borderRadius: '50%' }}>
                                <MessageSquare size={18} style={{ color: 'var(--secondary-glow)' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>IRC Server</div>
                                <div style={{ fontFamily: 'var(--font-mono)' }}>irc.cybertoolkit.dev:6697</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: 'rgba(255,51,51,0.1)', padding: '10px', borderRadius: '50%' }}>
                                <Terminal size={18} style={{ color: 'var(--danger-color)' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Bug Bounty</div>
                                <div style={{ fontFamily: 'var(--font-mono)' }}>submit@cybertoolkit.dev</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact form */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Send size={20} className="tool-icon" /> Compile Message
                    </h3>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Callsign / Name</label>
                                <input type="text" className="cyber-input" placeholder="Operator Name" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Return Address</label>
                                <input type="email" className="cyber-input" placeholder="email@domain.com" />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Subject Line</label>
                            <input type="text" className="cyber-input" placeholder="Transmission Subject" />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Encrypted Payload</label>
                            <textarea className="cyber-input" rows="6" placeholder="Enter message parameters..." style={{ resize: 'vertical' }}></textarea>
                        </div>

                        <button className="cyber-button" type="submit">
                            <Send size={18} /> Send Transmission
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
