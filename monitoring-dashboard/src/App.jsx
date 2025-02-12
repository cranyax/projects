// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (collapsible) */}
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Navbar alertCount={0} isSidebarCollapsed={collapsed} />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
