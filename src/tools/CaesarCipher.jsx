import React, { useState } from 'react';
import { ArrowRightLeft, Save, Check } from 'lucide-react';

const CaesarCipher = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [shift, setShift] = useState(3);
    const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
    const [copied, setCopied] = useState(false);

    const processCipher = () => {
        if (!input) return;

        let result = '';
        const s = mode === 'encrypt' ? shift : (26 - shift) % 26;

        for (let i = 0; i < input.length; i++) {
            let charCode = input.charCodeAt(i);

            // Uppercase
            if (charCode >= 65 && charCode <= 90) {
                result += String.fromCharCode(((charCode - 65 + s) % 26) + 65);
            }
            // Lowercase
            else if (charCode >= 97 && charCode <= 122) {
                result += String.fromCharCode(((charCode - 97 + s) % 26) + 97);
            }
            // Non-alphabetic
            else {
                result += input.charAt(i);
            }
        }

        setOutput(result);
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
                    className={`cyber-button ${mode === 'encrypt' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('encrypt'); setOutput(''); }}
                >
                    ENCRYPT
                </button>
                <button
                    className={`cyber-button ${mode === 'decrypt' ? '' : 'secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setMode('decrypt'); setOutput(''); }}
                >
                    DECRYPT
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                    Shift Key / Rotation: <span style={{ color: 'var(--primary-glow)' }}>{shift}</span> (ROT{shift})
                </label>
                <input
                    type="range"
                    min="1" max="25"
                    value={shift}
                    onChange={(e) => setShift(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-glow)' }}
                />
            </div>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Input Text</label>
            <textarea
                className="cyber-input"
                rows="4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to encrypt/decrypt..."
                style={{ resize: 'vertical', marginBottom: '15px', fontFamily: 'var(--font-mono)' }}
            />

            <button className="cyber-button" onClick={processCipher} style={{ width: '100%', marginBottom: '20px' }} disabled={!input}>
                <ArrowRightLeft size={18} /> PROCESS CIPHER
            </button>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Output Result</label>
            <textarea
                className="cyber-input"
                rows="4"
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

export default CaesarCipher;
