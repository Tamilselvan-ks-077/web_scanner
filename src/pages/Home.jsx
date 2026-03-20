import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import SystemMonitor from '../components/SystemMonitor';
import ThreatActivity from '../components/ThreatActivity';
import { tools } from '../data/tools';
import './Home.css';

const Home = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTools, setFilteredTools] = useState(tools);

    useEffect(() => {
        let result = tools;

        if (categoryParam && categoryParam !== 'All') {
            result = result.filter(tool => tool.category === categoryParam);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(tool =>
                tool.name.toLowerCase().includes(q) ||
                tool.desc.toLowerCase().includes(q)
            );
        }

        setFilteredTools(result);
    }, [categoryParam, searchQuery]);

    return (
        <div className="home-dashboard">
            <div className="dashboard-grid">

                {/* ASCII Header Banner */}
                <div className="terminal-panel banner-panel">
                    <pre className="ascii-banner">
                        {`   _____      ____               _______          _ _    _ _     _    _       _     
  / ____|    |  _ \\             |__   __|        | | |  (_| |   | |  | |     | |    
 | |    _   _| |_) | ___ _ __      | | ___   ___ | | | ___| |_  | |__| |_   _| |__  
 | |   | | | |  _ < / _ | '__|     | |/ _ \\ / _ \\| | |/ | | __| |  __  | | | | '_ \\ 
 | |___| |_| | |_) |  __| |        | | (_) | (_) | |   <| | |_  | |  | | |_| | |_) |
  \\_____\\__, |____/ \\___|_|        |_|\\___/ \\___/|_|_|\\_|_|\\__| |_|  |_|\\__,_|_.__/ 
         __/ |                                                                      
        |___/                                                                        `}</pre>
                    <div className="banner-subtitle">/// ADVANCED SECURITY ANALYSIS & PENETRATION TESTING UTILITIES ///</div>
                </div>

                {/* System Monitor & Threat Feed row */}
                <div className="sys-row">
                    <SystemMonitor />
                    <ThreatActivity />
                </div>

                {/* Command Input / Search */}
                <div className="terminal-panel cmd-panel">
                    <div className="cmd-prompt">root@cyber-hub:/opt/tools#</div>
                    <div className="cmd-input-wrapper">
                        <span className="cmd-prefix">./search_tools.sh --query="</span>
                        <input
                            type="text"
                            className="cyber-input search-input inline-input"
                            placeholder="..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <span className="cmd-suffix">"</span>
                        {categoryParam && <span className="cmd-flag"> --cat="{categoryParam}"</span>}
                    </div>
                </div>

                <div className="results-info">
                    <span>{'>'} FOUND {filteredTools.length} EXECUTABLES MATCHING CRITERIA</span>
                </div>

                {/* Tools Grid */}
                {filteredTools.length > 0 ? (
                    <div className="tools-grid">
                        {filteredTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results terminal-panel">
                        <h3>[ ERROR_NO_MODULES_FOUND ]</h3>
                        <p>{'>'} Check your search query parameters or category filter and try again.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
