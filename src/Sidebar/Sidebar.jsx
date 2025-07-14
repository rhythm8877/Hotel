"use client";

import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-text">
            <span className="college-name">Guest House</span>
            <span className="college-type">Admin Panel</span>
          </div>
        </div>
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isCollapsed ? (
              <polyline points="9 18 15 12 9 6"></polyline>
            ) : (
              <polyline points="15 18 9 12 15 6"></polyline>
            )}
          </svg>
        </button>
      </div>

      <nav className="nav-menu">
        <div
          className={`nav-item ${activeItem === 'room-entry' ? 'active' : ''}`}
          onClick={() => handleItemClick('room-entry')}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
          </div>
          {!isCollapsed && (
            <span className="nav-label">Room Application</span>
          )}
        </div>

        <div
          className={`nav-item ${activeItem === 'dining-hall' ? 'active' : ''}`}
          onClick={() => handleItemClick('dining-hall')}
        >
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              <circle cx="12" cy="8" r="2"></circle>
            </svg>
          </div>
          {!isCollapsed && (
            <span className="nav-label">Dining Application</span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
