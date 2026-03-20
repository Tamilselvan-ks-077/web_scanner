import React from 'react';
import { User, Lock, Terminal } from 'lucide-react';

const Login = () => {
    return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <Terminal size={48} style={{ color: 'var(--primary-glow)', marginBottom: '16px' }} />
                    <h2>SYSTEM ACCESS</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Authenticate to access premium tools</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-secondary)' }} />
                        <input type="text" className="cyber-input" placeholder="Operator ID" style={{ paddingLeft: '40px' }} />
                    </div>

                    <div style={{ marginBottom: '30px', position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-secondary)' }} />
                        <input type="password" className="cyber-input" placeholder="Access Code" style={{ paddingLeft: '40px' }} />
                    </div>

                    <button type="submit" className="cyber-button" style={{ width: '100%', marginBottom: '16px' }}>
                        Initiate Link
                    </button>

                    <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>No access codes? </span>
                        <a href="#" style={{ color: 'var(--secondary-glow)' }}>Request clearance</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
