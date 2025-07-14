"use client"

import { useState } from "react"
import DiningHall from "../Dining Hall/DiningHall"
import Navbar from "../Navbar/Navbar"
import Room from "../Room/Room"
import Sidebar from "../Sidebar/Sidebar"
import "./Dashboard.css"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("room-entry")

  const renderSection = () => {
    switch (activeSection) {
      case "room-entry":
        return <Room />
      case "dining-hall":
        return <DiningHall />
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