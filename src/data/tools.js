import {
    Key, ShieldCheck, Hash, Fingerprint, Code, Link as LinkIcon,
    Binary, FileTerminal, Network, Globe, Search, Radio,
    PanelTop, ShieldAlert, KeyRound, Lock, Mail, Image,
    AlertTriangle, ScrollText, Bot, Map
} from 'lucide-react';

export const categories = [
    "All",
    "Cryptography",
    "Network",
    "Web Security",
    "Encoding",
    "Utilities"
];

export const tools = [
    { id: 'password-checker', name: 'Password Strength Checker', desc: 'Analyze password robustness and entropy.', category: 'Cryptography', icon: ShieldCheck },
    { id: 'password-generator', name: 'Password Generator', desc: 'Generate secure, complex passwords.', category: 'Cryptography', icon: Key },
    { id: 'hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, and SHA-256 hashes.', category: 'Cryptography', icon: Hash },
    { id: 'hash-verifier', name: 'Hash Verifier', desc: 'Compare and verify file or text hashes.', category: 'Cryptography', icon: Fingerprint },

    { id: 'base64', name: 'Base64 Encode/Decode', desc: 'Encode or decode text using Base64.', category: 'Encoding', icon: Code },
    { id: 'url-encode', name: 'URL Encode/Decode', desc: 'Safely encode/decode URLs for payloads.', category: 'Encoding', icon: LinkIcon },
    { id: 'binary-text', name: 'Text to Binary / Binary to Text', desc: 'Convert between text and binary format.', category: 'Encoding', icon: Binary },
    { id: 'caesar-cipher', name: 'Caesar Cipher Encrypt/Decrypt', desc: 'Classic shift cipher for text obfuscation.', category: 'Cryptography', icon: FileTerminal },

    { id: 'ip-info', name: 'IP Address Info Checker', desc: 'Get location and ISP info from an IP.', category: 'Network', icon: Network },
    { id: 'dns-lookup', name: 'DNS Lookup', desc: 'Query DNS records for a domain (A, MX, etc).', category: 'Network', icon: Globe },
    { id: 'whois-lookup', name: 'WHOIS Lookup', desc: 'Find domain registration and owner info.', category: 'Network', icon: Search },
    { id: 'port-scanner', name: 'Port Scanner', desc: 'Scan common ports (lab testing only).', category: 'Network', icon: Radio },

    { id: 'http-viewer', name: 'HTTP Header Viewer', desc: 'View raw HTTP response headers.', category: 'Web Security', icon: PanelTop },
    { id: 'security-headers', name: 'Security Headers Checker', desc: 'Check website security headers.', category: 'Web Security', icon: ShieldAlert },
    { id: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens.', category: 'Web Security', icon: KeyRound },
    { id: 'ssl-checker', name: 'SSL Certificate Checker', desc: 'Analyze SSL/TLS certificate details.', category: 'Web Security', icon: Lock },
    { id: 'phishing-detector', name: 'Phishing URL Detector', desc: 'Analyze URLs for phishing indicators.', category: 'Web Security', icon: AlertTriangle },
    { id: 'robots-viewer', name: 'Robots.txt Viewer', desc: 'Inspect robots.txt for hidden paths.', category: 'Web Security', icon: Bot },
    { id: 'sitemap-viewer', name: 'Sitemap Viewer', desc: 'Parse and explore XML sitemaps.', category: 'Web Security', icon: Map },

    { id: 'email-analyzer', name: 'Email Header Analyzer', desc: 'Trace email headers to find origin IPs.', category: 'Utilities', icon: Mail },
    { id: 'metadata-viewer', name: 'Metadata Viewer', desc: 'Extract EXIF data from files/images.', category: 'Utilities', icon: Image },
    { id: 'log-analyzer', name: 'Log Analyzer', desc: 'Parse and analyze server access logs.', category: 'Utilities', icon: ScrollText },
];
