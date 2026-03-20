import React, { useState, useEffect } from 'react';
import { Network, RefreshCw, Map } from 'lucide-react';

const IpInfoChecker = () => {
    const [ip, setIp] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchIpInfo = async (targetIp = '') => {
        setLoading(true);
        setError('');
        setData(null);
        try {
            // Using a free public API for demonstration. For production, a reliable backend proxy is better.
            const url = targetIp ? `https://ipapi.co/${targetIp}/json/` : 'https://ipapi.co/json/';
            const response = await fetch(url);
            const result = await response.json();

            if (result.error) {
                setError(result.reason || 'Failed to locate IP.');
            } else {
                setData(result);
            }
        } catch (err) {
            setError('Network error or API rate limit exceeded.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch client IP on mount
    useEffect(() => {
        fetchIpInfo();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ip) fetchIpInfo(ip);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <input
                    type="text"
                    className="cyber-input"
                    placeholder="Enter an IPv4 or IPv6 address (e.g. 8.8.8.8)..."
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button type="submit" className="cyber-button" disabled={loading}>
                    {loading ? <RefreshCw size={18} className="spin" /> : <Network size={18} />}
                    TRACE IP
                </button>
            </form>

            <div className="glass-panel" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {error && <div style={{ color: 'var(--danger-color)', fontFamily: 'var(--font-mono)' }}>[ERROR] {error}</div>}

                {data && (
                    <div style={{ fontFamily: 'var(--font-mono)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '10px' }}>
                            <Map size={24} style={{ color: 'var(--primary-glow)' }} />
                            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Geolocation Data: <span style={{ color: 'var(--primary-glow)' }}>{data.ip}</span></h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px 0', fontSize: '0.9rem' }}>
                            <div style={{ color: 'var(--text-secondary)' }}>Status:</div>
                            <div style={{ color: 'var(--primary-glow)' }}>SUCCESS (Trace Complete)</div>

                            <div style={{ color: 'var(--text-secondary)' }}>City:</div>
                            <div>{data.city || 'N/A'}</div>

                            <div style={{ color: 'var(--text-secondary)' }}>Region:</div>
                            <div>{data.region || 'N/A'}</div>

                            <div style={{ color: 'var(--text-secondary)' }}>Country:</div>
                            <div>{data.country_name || 'N/A'} ({data.country})</div>

                            <div style={{ color: 'var(--text-secondary)' }}>ASN / ISP:</div>
                            <div>{data.asn} - {data.org || 'N/A'}</div>

                            <div style={{ color: 'var(--text-secondary)' }}>Timezone:</div>
                            <div>{data.timezone || 'N/A'}</div>

                            <div style={{ color: 'var(--text-secondary)' }}>Coordinates:</div>
                            <div style={{ color: 'var(--secondary-glow)' }}>{data.latitude}, {data.longitude}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IpInfoChecker;
