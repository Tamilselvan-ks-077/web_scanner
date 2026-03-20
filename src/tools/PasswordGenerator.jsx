import React, { useState } from 'react';
import { RefreshCw, Save, Check } from 'lucide-react';

const PasswordGenerator = () => {
    const [length, setLength] = useState(16);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);

    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        const upperStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerStr = 'abcdefghijklmnopqrstuvwxyz';
        const numStr = '0123456789';
        const symStr = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let chars = '';
        if (useUpper) chars += upperStr;
        if (useLower) chars += lowerStr;
        if (useNumbers) chars += numStr;
        if (useSymbols) chars += symStr;

        if (chars === '') {
            setPassword('Select at least one character type!');
            return;
        }

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(result);
        setCopied(false);
    };

    const handleCopy = () => {
        if (!password || password.startsWith('Select')) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                    Password Length: <span style={{ color: 'var(--primary-glow)' }}>{length}</span>
                </label>
                <input
                    type="range"
                    min="8" max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-glow)' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
                    Uppercase (A-Z)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
                    Lowercase (a-z)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
                    Numbers (0-9)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
                    Symbols (!@#$)
                </label>
            </div>

            <button className="cyber-button" onClick={generatePassword} style={{ marginBottom: '30px' }}>
                <RefreshCw size={18} /> GENERATE PASSWORD
            </button>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Generated Password:</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="cyber-input" style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--primary-glow)', wordBreak: 'break-all' }}>
                        {password || 'Press Generate...'}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                    <button className="cyber-button secondary" onClick={handleCopy} disabled={!password}>
                        {copied ? <Check size={16} /> : <Save size={16} />}
                        {copied ? 'COPIED!' : 'COPY RESULT'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
