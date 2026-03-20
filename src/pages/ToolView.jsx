import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { ArrowLeft, Play, RefreshCw, Save } from 'lucide-react';
import PasswordGenerator from '../tools/PasswordGenerator';
import Base64Tool from '../tools/Base64Tool';
import HashGenerator from '../tools/HashGenerator';
import TextBinaryTool from '../tools/TextBinaryTool';
import UrlEncoder from '../tools/UrlEncoder';
import IpInfoChecker from '../tools/IpInfoChecker';
import LogAnalyzer from '../tools/LogAnalyzer';
import CaesarCipher from '../tools/CaesarCipher';
import HttpHeaderViewer from '../tools/HttpHeaderViewer';
import './ToolView.css';

const ToolView = () => {
    const { id } = useParams();
    const tool = tools.find(t => t.id === id);

    const [inputVal, setInputVal] = useState('');
    const [outputVal, setOutputVal] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!tool) {
        return (
            <div className="page-container glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ color: 'var(--danger-color)' }}>Error: Tool Not Found</h2>
                <p style={{ marginTop: '16px', marginBottom: '24px' }}>The requested module is unavailable or has been removed.</p>
                <Link to="/" className="cyber-button">Return to Dashboard</Link>
            </div>
        );
    }

    const Icon = tool.icon;

    const handleExecute = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Mock processing delay
        setTimeout(() => {
            setOutputVal(`[SYSTEM LOG] Execution complete for ${tool.name}.\n\nResults for input: "${inputVal}"\n\nStatus: SUCCESS\nTime: ${new Date().toISOString()}`);
            setIsProcessing(false);
        }, 800);
    };

    return (
        <div className="page-container tool-view">
            <div style={{ marginBottom: '24px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={16} /> Back to Toolkit
                </Link>
            </div>

            <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ background: 'rgba(0, 255, 128, 0.1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--panel-border)' }}>
                        <Icon size={32} style={{ color: 'var(--primary-glow)' }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>{tool.name}</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>{tool.desc}</p>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', background: 'rgba(0, 191, 255, 0.1)', color: 'var(--secondary-glow)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0, 191, 255, 0.2)' }}>
                            {tool.category}
                        </span>
                    </div>
                </div>
            </div>

            {(() => {
                switch (tool.id) {
                    case 'password-generator': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><PasswordGenerator /></div>;
                    case 'base64': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><Base64Tool /></div>;
                    case 'hash-generator': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><HashGenerator /></div>;
                    case 'binary-text': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><TextBinaryTool /></div>;
                    case 'url-encode': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><UrlEncoder /></div>;
                    case 'ip-info': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><IpInfoChecker /></div>;
                    case 'log-analyzer': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><LogAnalyzer /></div>;
                    case 'caesar-cipher': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><CaesarCipher /></div>;
                    case 'http-headers': return <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}><HttpHeaderViewer /></div>;
                    default:
                        return (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="tool-io-grid">
                                <div className="glass-panel io-panel">
                                    <div className="io-header">
                                        <h3>Input Parameters</h3>
                                    </div>
                                    <div className="io-body">
                                        <form onSubmit={handleExecute} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <textarea
                                                className="cyber-input"
                                                style={{ flex: 1, resize: 'none', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}
                                                placeholder="Enter payload, hash, or target address here..."
                                                value={inputVal}
                                                onChange={(e) => setInputVal(e.target.value)}
                                            ></textarea>

                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <button type="submit" className="cyber-button" style={{ flex: 1 }} disabled={isProcessing}>
                                                    {isProcessing ? <RefreshCw size={18} className="spin" /> : <Play size={18} />}
                                                    {isProcessing ? 'PROCESSING...' : 'EXECUTE'}
                                                </button>
                                                <button type="button" className="cyber-button secondary" onClick={() => setInputVal('')}>
                                                    CLEAR
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="glass-panel io-panel">
                                    <div className="io-header">
                                        <h3>Output Console</h3>
                                    </div>
                                    <div className="io-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div
                                            className="cyber-input"
                                            style={{ flex: 1, overflowY: 'auto', background: 'rgba(5, 5, 15, 0.8)', color: 'var(--text-accent)', whiteSpace: 'pre-wrap' }}
                                        >
                                            {outputVal || '> Awaiting execution...'}
                                        </div>

                                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                            <button className="cyber-button secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => navigator.clipboard.writeText(outputVal)}>
                                                <Save size={16} /> COPY RESULTS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                }
            })()}
        </div>
    );
};

export default ToolView;
