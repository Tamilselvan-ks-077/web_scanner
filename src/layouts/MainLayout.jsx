import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MatrixRain from '../components/MatrixRain';
import './MainLayout.css';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }

    return (
        <div className="layout-container">
            <MatrixRain />
            {/* Visual cyber background elements */}
            <div className="scanline"></div>
            <div className="crt-flicker"></div>

            <Navbar toggleSidebar={toggleSidebar} />

            <div className="layout-main">
                <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
