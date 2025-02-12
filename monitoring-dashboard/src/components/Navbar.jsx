import React from 'react';
import { FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';

const Navbar = ({ alertCount = 0, isSidebarCollapsed }) => {
  return (
    <div className="bg-white flex items-center justify-between p-4 shadow">
      {/* Left section: Company logo & name (only when sidebar is collapsed) */}
      {isSidebarCollapsed && (
        <div className="flex items-center gap-4">
          <img
            src="/images.png"
            alt="Company Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-2xl mr-3">Orion RDV</span>
        </div>
      )}

      {/* Middle section: Search field & alerts */}
      <div className="flex items-center gap-4 flex-1">
        {/* Search bar - Expands to fill available space */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Alerts button - remains fixed width */}
        <button className="bg-green-500 text-white px-3 py-1 rounded focus:outline-none flex items-center gap-2 cursor-pointer">
          {alertCount === 0 ? "No Alerts" : "Alerts"}
          <span className="bg-white text-green-500 border border-green-500 rounded px-2 py-1">
            {alertCount}
          </span>
        </button>
      </div>

      {/* Right section: User info */}
      <div className="flex items-center space-x-2 ml-2 cursor-pointer">
        <span className="text-gray-700">username</span>
        <FiUser />
        <FiChevronDown />
      </div>
    </div>
  );
};

export default Navbar;
