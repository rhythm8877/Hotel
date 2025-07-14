"use client";

import "./Sidebar.css";

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!isCollapsed);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-text">
            <span className="college-name">Hotel</span>
            <span className="college-type">Admin Panel</span>
          </div>
        </div>
        <button className="collapse-btn" onClick={handleToggleCollapse}>
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
        <div className="nav-item active">
          <div className="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
          </div>
          {!isCollapsed && <span className="nav-label">Room Entry</span>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
