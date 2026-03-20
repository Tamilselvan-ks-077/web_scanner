import React, { useState } from 'react';
import { ArrowRightLeft, Save, Check } from 'lucide-react';

const Base64Tool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleProcess = () => {
        setError('');
        try {
            if (mode === 'encode') {
                // btoa expects a string and can throw on unicode, but we'll try standard first
                setOutput(btoa(unescape(encodeURIComponent(input))));
            } else {
                setOutput(decodeURIComponent(escape(atob(input))));
            }
        } catch (err) {
            setError(mode === 'encode' ? 'Failed to encode input.' : 'Invalid Base64 string for decoding.');
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
                    ENCODE TO BASE64
                </button>
                <button
                    className={`cyber-button ${mode === 'decode' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
                >
                    DECODE FROM BASE64
                </button>
            </div>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                {mode === 'encode' ? 'Raw Text Input' : 'Base64 Encoded Input'}
            </label>
            <textarea
                className="cyber-input"
                rows="5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 string to decode...'}
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

export default Base64Tool;
