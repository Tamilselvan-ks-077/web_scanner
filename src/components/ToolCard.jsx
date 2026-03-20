import React from 'react';
import { Link } from 'react-router-dom';
import './ToolCard.css';
import { Terminal } from 'lucide-react';

const ToolCard = ({ tool }) => {
    return (
        <div className="tool-card terminal-panel">
            <div className="tool-card-header">
                <span className="tool-category">[{tool.category.toUpperCase()}]</span>
                <span className="tool-id">PID:{tool.id.toString().padStart(4, '0')}</span>
            </div>

            <div className="tool-card-body">
                <h3 className="tool-name">
                    <Terminal size={14} className="terminal-icon" /> {tool.name}.exe
                </h3>
                <p className="tool-desc">{'>'} {tool.desc}</p>
            </div>

            <div className="tool-card-footer">
                <Link to={`/tool/${tool.id}`} className="cyber-button launch-btn" style={{ textDecoration: 'none' }}>
                    ./execute
                </Link>
            </div>
        </div>
    );
};

export default ToolCard;
