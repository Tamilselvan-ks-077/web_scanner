import React, { useState } from 'react';
import { ArrowRightLeft, Save, Check } from 'lucide-react';

const TextBinaryTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('text-to-bin'); // 'text-to-bin' or 'bin-to-text'
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const textToBinary = (text) => {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    };

    const binaryToText = (binary) => {
        return binary.split(' ').map(bin => {
            if (!bin) return '';
            const code = parseInt(bin, 2);
            if (isNaN(code)) throw new Error('Invalid binary string');
            return String.fromCharCode(code);
        }).join('');
    };

    const handleProcess = () => {
        setError('');
        try {
            if (mode === 'text-to-bin') {
                setOutput(textToBinary(input));
            } else {
                const cleanedInput = input.trim().replace(/\s+/g, ' '); // Normalize spaces
                setOutput(binaryToText(cleanedInput));
            }
        } catch (err) {
            setError(mode === 'text-to-bin' ? 'Failed to encode text to binary.' : 'Invalid binary format. Use space-separated 8-bit strings.');
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
                    className={`cyber-button ${mode === 'text-to-bin' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('text-to-bin'); setOutput(''); setError(''); }}
                >
                    TEXT TO BINARY
                </button>
                <button
                    className={`cyber-button ${mode === 'bin-to-text' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('bin-to-text'); setOutput(''); setError(''); }}
                >
                    BINARY TO TEXT
                </button>
            </div>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                {mode === 'text-to-bin' ? 'Raw Text Input' : 'Binary Input (Space Separated)'}
            </label>
            <textarea
                className="cyber-input"
                rows="5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'text-to-bin' ? 'Enter text to convert...' : 'Example: 01101000 01100101 01101100 01101100 01101111'}
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

export default TextBinaryTool;
