import React, { useState } from 'react';
import { Key, Lock, Unlock, RefreshCw, Copy, CheckCircle } from 'lucide-react';

const RsaTool = () => {
    const [mode, setMode] = useState('generate'); // 'generate' | 'encrypt' | 'decrypt'
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState('');
    const [log, setLog] = useState([]);

    const addLog = (msg, color = 'var(--text-primary)') =>
        setLog(prev => [...prev.slice(-20), { msg, color }]);

    const generateKeys = async () => {
        setLoading(true);
        setLog([]);
        addLog('[INIT] Generating RSA-2048 key pair...', 'var(--secondary-glow)');
        try {
            const keyPair = await window.crypto.subtle.generateKey(
                { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
                true, ['encrypt', 'decrypt']
            );
            const pub = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
            const priv = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
            const pubPem = toPem(pub, 'PUBLIC KEY');
            const privPem = toPem(priv, 'PRIVATE KEY');
            setPublicKey(pubPem);
            setPrivateKey(privPem);
            addLog('[OK] RSA-2048 key pair generated successfully.', 'var(--primary-glow)');
            addLog('[OK] Hash algorithm: SHA-256 / OAEP padding', 'var(--text-secondary)');
        } catch (e) {
            addLog(`[ERR] ${e.message}`, 'var(--danger-glow)');
        }
        setLoading(false);
    };

    const encryptText = async () => {
        if (!publicKey || !inputText) { addLog('[ERR] Public key and plaintext required.', 'var(--danger-glow)'); return; }
        setLoading(true);
        addLog('[INIT] Importing public key...', 'var(--text-secondary)');
        try {
            const rawPub = fromPem(publicKey);
            const cryptoKey = await window.crypto.subtle.importKey(
                'spki', rawPub, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']
            );
            const enc = new TextEncoder();
            const ct = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, cryptoKey, enc.encode(inputText));
            const b64 = btoa(String.fromCharCode(...new Uint8Array(ct)));
            setOutputText(b64);
            addLog('[OK] Encryption successful. Ciphertext (Base64) generated.', 'var(--primary-glow)');
        } catch (e) {
            addLog(`[ERR] ${e.message}`, 'var(--danger-glow)');
        }
        setLoading(false);
    };

    const decryptText = async () => {
        if (!privateKey || !inputText) { addLog('[ERR] Private key and ciphertext required.', 'var(--danger-glow)'); return; }
        setLoading(true);
        addLog('[INIT] Importing private key...', 'var(--text-secondary)');
        try {
            const rawPriv = fromPem(privateKey);
            const cryptoKey = await window.crypto.subtle.importKey(
                'pkcs8', rawPriv, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt']
            );
            const ctBytes = Uint8Array.from(atob(inputText), c => c.charCodeAt(0));
            const pt = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, cryptoKey, ctBytes);
            setOutputText(new TextDecoder().decode(pt));
            addLog('[OK] Decryption successful. Plaintext recovered.', 'var(--primary-glow)');
        } catch (e) {
            addLog(`[ERR] Decryption failed. Check key/ciphertext integrity.`, 'var(--danger-glow)');
        }
        setLoading(false);
    };

    const copyText = async (text, label) => {
        await navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div style={{ fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--panel-border)' }}>
                {[['generate', 'GENERATE KEYS'], ['encrypt', 'ENCRYPT'], ['decrypt', 'DECRYPT']].map(([val, label]) => (
                    <button key={val} onClick={() => { setMode(val); setOutputText(''); setLog([]); }}
                        style={{ padding: '10px 20px', fontSize: '0.75rem', background: mode === val ? 'rgba(51,255,0,0.1)' : 'transparent', color: mode === val ? 'var(--primary-glow)' : 'var(--text-secondary)', border: 'none', borderBottom: mode === val ? '2px solid var(--primary-glow)' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {label}
                    </button>
                ))}
            </div>

            {mode === 'generate' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button className="cyber-button" onClick={generateKeys} disabled={loading} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {loading ? <RefreshCw size={16} className="spin" /> : <Key size={16} />}
                        {loading ? 'GENERATING...' : 'GENERATE RSA-2048 KEY PAIR'}
                    </button>
                    {publicKey && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[['PUBLIC KEY', publicKey, 'pub'], ['PRIVATE KEY', privateKey, 'priv']].map(([label, val, id]) => (
                                <div key={id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</span>
                                        <button onClick={() => copyText(val, id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === id ? 'var(--primary-glow)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem' }}>
                                            {copied === id ? <><CheckCircle size={12} /> COPIED</> : <><Copy size={12} /> COPY</>}
                                        </button>
                                    </div>
                                    <textarea readOnly className="cyber-input" style={{ width: '100%', height: '160px', fontSize: '0.65rem', resize: 'none', boxSizing: 'border-box' }} value={val} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {(mode === 'encrypt' || mode === 'decrypt') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginBottom: '8px' }}>
                            {mode === 'encrypt' ? 'PUBLIC KEY (PEM)' : 'PRIVATE KEY (PEM)'}
                        </label>
                        <textarea className="cyber-input" style={{ width: '100%', height: '120px', fontSize: '0.65rem', resize: 'none', boxSizing: 'border-box' }}
                            value={mode === 'encrypt' ? publicKey : privateKey}
                            onChange={e => mode === 'encrypt' ? setPublicKey(e.target.value) : setPrivateKey(e.target.value)}
                            placeholder={`Paste ${mode === 'encrypt' ? 'public' : 'private'} key here...`} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginBottom: '8px' }}>
                                {mode === 'encrypt' ? 'PLAINTEXT INPUT' : 'CIPHERTEXT (Base64)'}
                            </label>
                            <textarea className="cyber-input" style={{ width: '100%', height: '140px', resize: 'none', fontSize: '0.75rem', boxSizing: 'border-box' }}
                                value={inputText} onChange={e => setInputText(e.target.value)}
                                placeholder={mode === 'encrypt' ? 'Enter message to encrypt...' : 'Paste Base64 ciphertext...'} />
                        </div>
                        <div>
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginBottom: '8px' }}>OUTPUT</label>
                            <div className="cyber-input" style={{ height: '140px', overflowY: 'auto', fontSize: '0.75rem', color: 'var(--text-accent)', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{outputText || '> Output will appear here...'}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="cyber-button" onClick={mode === 'encrypt' ? encryptText : decryptText} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {loading ? <RefreshCw size={16} className="spin" /> : mode === 'encrypt' ? <Lock size={16} /> : <Unlock size={16} />}
                            {loading ? 'PROCESSING...' : mode === 'encrypt' ? 'ENCRYPT' : 'DECRYPT'}
                        </button>
                        {outputText && <button className="cyber-button secondary" onClick={() => copyText(outputText, 'out')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {copied === 'out' ? <><CheckCircle size={16} /> COPIED</> : <><Copy size={16} /> COPY RESULT</>}
                        </button>}
                    </div>
                </div>
            )}

            {log.length > 0 && (
                <div style={{ background: 'rgba(0,5,0,0.9)', border: '1px solid var(--panel-border)', padding: '12px', fontSize: '0.72rem', lineHeight: '1.8' }}>
                    {log.map((l, i) => <div key={i} style={{ color: l.color }}>{l.msg}</div>)}
                </div>
            )}
        </div>
    );
};

function toPem(buffer, type) {
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const chunks = b64.match(/.{1,64}/g).join('\n');
    return `-----BEGIN ${type}-----\n${chunks}\n-----END ${type}-----`;
}
function fromPem(pem) {
    const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
    const raw = atob(b64);
    return Uint8Array.from(raw, c => c.charCodeAt(0)).buffer;
}

export default RsaTool;
