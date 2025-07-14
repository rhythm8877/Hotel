"use client"

import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import RoomEntry from "../Room Entry/RoomEntry"
import Sidebar from "../Sidebar/Sidebar"
import "./Dashboard.css"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("room-entry")

  const renderSection = () => {
    switch (activeSection) {
      case "room-entry":
        return <RoomEntry />
      default:
        return <div className="empty-content">Select an option from the sidebar</div>
    }
  }

  return (
    <div className="dashboard-grid">
      <Sidebar activeItem={activeSection} setActiveItem={setActiveSection} />
      <div className="content-wrapper">
        <Navbar />
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

export default Dashboard