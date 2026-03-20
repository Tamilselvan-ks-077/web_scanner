import React, { useState } from 'react';
import { Hash, Save, Check } from 'lucide-react';

const HashGenerator = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [algorithm, setAlgorithm] = useState('SHA-256');
    const [copied, setCopied] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const generateHash = async () => {
        if (!input) return;
        setIsProcessing(true);
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(input);
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setOutput(hashHex);
        } catch (err) {
            setOutput('Error computing hash.');
        } finally {
            setIsProcessing(false);
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

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Algorithm</label>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map(algo => (
                    <button
                        key={algo}
                        className={`cyber-button ${algorithm === algo ? '' : 'secondary'}`}
                        style={{ flex: 1, fontSize: '0.85rem' }}
                        onClick={() => { setAlgorithm(algo); setOutput(''); }}
                    >
                        {algo}
                    </button>
                ))}
            </div>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Input Text</label>
            <textarea
                className="cyber-input"
                rows="4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                style={{ resize: 'vertical', marginBottom: '15px', fontFamily: 'var(--font-mono)' }}
            />

            <button className="cyber-button" onClick={generateHash} style={{ width: '100%', marginBottom: '20px' }} disabled={!input || isProcessing}>
                <Hash size={18} /> {isProcessing ? 'COMPUTING...' : 'COMPUTE HASH'}
            </button>

            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Output Hash ({algorithm})</label>
            <div className="cyber-input" style={{
                minHeight: '60px',
                background: 'rgba(5, 5, 15, 0.8)',
                color: 'var(--primary-glow)',
                fontFamily: 'var(--font-mono)',
                wordBreak: 'break-all',
                display: 'flex',
                alignItems: 'center'
            }}>
                {output || '...'}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                <button className="cyber-button secondary" onClick={handleCopy} disabled={!output}>
                    {copied ? <Check size={16} /> : <Save size={16} />}
                    {copied ? 'COPIED!' : 'COPY HASH'}
                </button>
            </div>
        </div>
    );
};

export default HashGenerator;
