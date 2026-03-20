import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../data/tools';
import { X, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

            <aside className={`sidebar terminal-panel ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header mobile-only">
                    <span className="logo-text">SYS_MENU</span>
                    <button className="close-btn" onClick={closeSidebar}>
                        <X size={20} />
                    </button>
                </div>

                <div className="tree-view">
                    <div className="tree-root">root@cyber-hub:/opt/tools# ls -la</div>

                    <ul className="tree-list">
                        <li>
                            <NavLink to="/" end className="tree-link" onClick={closeSidebar}>
                                <ChevronRight size={14} className="tree-icon" /> ./all_tools
                            </NavLink>
                        </li>

                        <li className="tree-dir">./categories/</li>
                        {categories.filter(c => c !== 'All').map((category) => (
                            <li key={category} className="tree-indent">
                                <NavLink
                                    to={`/?category=${encodeURIComponent(category)}`}
                                    className="tree-link"
                                    onClick={closeSidebar}
                                >
                                    <ChevronRight size={14} className="tree-icon" /> {category.toLowerCase().replace(/\s+/g, '_')}.sh
                                </NavLink>
                            </li>
                        ))}

                        <li className="tree-dir">./system/</li>
                        <li className="tree-indent">
                            <NavLink to="/about" className="tree-link" onClick={closeSidebar}>
                                <ChevronRight size={14} className="tree-icon" /> about.txt
                            </NavLink>
                        </li>
                        <li className="tree-indent">
                            <NavLink to="/contact" className="tree-link" onClick={closeSidebar}>
                                <ChevronRight size={14} className="tree-icon" /> contact.cfg
                            </NavLink>
                        </li>
                        <li className="tree-indent">
                            <NavLink to="/login" className="tree-link" onClick={closeSidebar}>
                                <ChevronRight size={14} className="tree-icon" /> auth.exe
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <div className="system-status">
                        <span className="status-dot"></span> [SYS_ONLINE]
                    </div>
                    <p>v1.0.0-rc2</p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
