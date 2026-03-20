import React, { useState } from 'react';
import { Globe, RefreshCw } from 'lucide-react';

const HttpHeaderViewer = () => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('HEAD');
    const [headers, setHeaders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHeaders = async (e) => {
        e.preventDefault();
        if (!url) return;

        let targetUrl = url;
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = 'http://' + targetUrl;
        }

        setLoading(true);
        setError('');
        setHeaders(null);

        try {
            // Because of CORS, making native requests to arbitrary URLs will fail in the browser.
            // Using a free CORS proxy for demonstration purposes. 
            // In a real pro app, a custom backend proxy is required.
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

            const response = await fetch(proxyUrl, {
                method: method,
                // Some headers may be stripped by the proxy, but it's the best client-side approach
            });

            const headersObj = {};
            response.headers.forEach((value, key) => {
                headersObj[key] = value;
            });

            setHeaders({
                status: `${response.status} ${response.statusText}`,
                url: response.url.replace('https://corsproxy.io/?', ''),
                headersList: headersObj
            });
        } catch (err) {
            setError(`Request Failed (CORS or Network Error). For a fully functional target, ensure the host allows cross-origin requests or use a backend proxy. ERROR: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <form onSubmit={fetchHeaders} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <select
                        className="cyber-input"
                        style={{ width: '120px' }}
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="HEAD">HEAD</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="OPTIONS">OPTIONS</option>
                    </select>

                    <input
                        type="text"
                        className="cyber-input"
                        placeholder="Target URL (e.g. example.com)..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ flex: 1 }}
                    />
                </div>

                <button type="submit" className="cyber-button" style={{ width: '100%' }} disabled={loading}>
                    {loading ? <RefreshCw size={18} className="spin" /> : <Globe size={18} />}
                    INSPECT HEADERS
                </button>
            </form>

            <div className="glass-panel" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {error && <div style={{ color: 'var(--danger-color)', fontFamily: 'var(--font-mono)' }}>{error}</div>}

                {headers && (
                    <div style={{ fontFamily: 'var(--font-mono)' }}>
                        <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '10px' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Response for:</div>
                            <div style={{ wordBreak: 'break-all', color: 'var(--primary-glow)' }}>{headers.url}</div>
                            <div style={{ marginTop: '8px', fontSize: '1.2rem', color: headers.status.startsWith('2') ? 'var(--primary-glow)' : '#ffbf00' }}>
                                HTTP {headers.status}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, auto) 1fr', gap: '8px 15px', fontSize: '0.9rem' }}>
                            {Object.entries(headers.headersList).map(([key, value]) => (
                                <React.Fragment key={key}>
                                    <div style={{ color: 'var(--secondary-glow)', fontWeight: 'bold' }}>{key}:</div>
                                    <div style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>{value}</div>
                                </React.Fragment>
                            ))}
                            {Object.keys(headers.headersList).length === 0 && (
                                <div style={{ color: 'var(--text-secondary)', gridColumn: 'span 2' }}>No extensive headers returned or proxy stripped them.</div>
                            )}
                        </div>
                    </div>
                )}
                {!headers && !loading && !error && (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>
                        Enter a URL and inspect to view HTTP response headers.
                    </div>
                )}
            </div>
        </div>
    );
};

export default HttpHeaderViewer;
