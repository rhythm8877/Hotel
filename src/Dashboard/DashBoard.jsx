"use client"

import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import RoomEntry from "../Room Entry/RoomEntry"
import Sidebar from "../Sidebar/Sidebar"
import "./Dashboard.css"

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className={`dashboard-grid ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={setIsSidebarCollapsed}
      />
      <div className="content-wrapper">
        <Navbar />
        <main className="main-content">
          <RoomEntry />
        </main>
      </div>
    </div>
  )
}

export default Dashboard