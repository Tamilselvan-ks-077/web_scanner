import React, { useState } from 'react';
import { ArrowRightLeft, Save, Check } from 'lucide-react';

const UrlEncoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleProcess = () => {
        setError('');
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (err) {
            setError(mode === 'encode' ? 'Failed to encode URL.' : 'Malformed URL encoding string.');
            setOutput('');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <button
                    className={`cyber-button ${mode === 'encode' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
                >
                    ENCODE URL
                </button>
                <button
                    className={`cyber-button ${mode === 'decode' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
                >
                    DECODE URL
                </button>
            </div>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                {mode === 'encode' ? 'Raw URL Input' : 'Encoded URL Input'}
            </label>
            <textarea
                className="cyber-input"
                rows="5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter string to URL encode...' : 'Enter URL encoded string to decode...'}
                style={{ resize: 'vertical', marginBottom: '15px', fontFamily: 'var(--font-mono)' }}
            />

            <button className="cyber-button" onClick={handleProcess} style={{ width: '100%', marginBottom: '20px' }} disabled={!input}>
                <ArrowRightLeft size={18} /> PROCESS
            </button>

            {error && <div style={{ color: 'var(--danger-color)', marginBottom: '15px', fontFamily: 'var(--font-mono)' }}>{error}</div>}

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Output Result</label>
            <textarea
                className="cyber-input"
                rows="5"
                readOnly
                value={output}
                style={{ resize: 'vertical', background: 'rgba(5, 5, 15, 0.8)', color: 'var(--primary-glow)', fontFamily: 'var(--font-mono)' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                <button className="cyber-button secondary" onClick={handleCopy} disabled={!output}>
                    {copied ? <Check size={16} /> : <Save size={16} />}
                    {copied ? 'COPIED!' : 'COPY RESULT'}
                </button>
            </div>
        </div>
    );
};

export default UrlEncoder;
