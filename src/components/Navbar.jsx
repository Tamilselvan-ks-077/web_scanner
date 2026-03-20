import React, { useState, useEffect } from 'react';
import { Clock, Activity, Wifi, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="terminal-header">
            <div className="header-left">
                <button className="mobile-toggle" onClick={toggleSidebar}>
                    <Menu size={16} />
                </button>
                <span className="user-prompt">root@cyber-hub:~#</span>
                <span className="blinking-cursor">_</span>
            </div>

            <div className="header-center">
                <span>/// CYBER COMMAND CENTER ///</span>
            </div>

            <div className="header-right">
                <div className="status-item"><Activity size={12} /> <span className="hide-mobile">SYS: OK</span></div>
                <div className="status-item"><Wifi size={12} /> <span className="hide-mobile">NET: SECURE</span></div>
                <div className="status-item"><Clock size={12} /> {time}</div>
            </div>
        </header>
    );
};

export default Navbar;
