import { useState } from 'react';
import {
  FiHome,
  FiAlertCircle,
  FiChevronLeft,
  FiDatabase,
} from 'react-icons/fi';
import { IoPulseOutline, IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineMenu, MdVpnKey, MdManageAccounts } from 'react-icons/md';
import { FaCloudDownloadAlt, FaEnvelope } from 'react-icons/fa';
import { FaCalculator, FaFileCircleCheck } from 'react-icons/fa6';
import { HiBeaker, HiUsers} from 'react-icons/hi';
import { IoMdLaptop } from 'react-icons/io';

// Reusable MenuItem component
const MenuItem = ({ label, dropdown, children, collapsed, onClick, isOpen, icon }) => (
  <li>
    <div
      className="p-2 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
      {dropdown && !collapsed && (
        <FiChevronLeft
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-270" : "rotate-0"
          }`}
        />
      )}
    </div>
    {dropdown && isOpen && !collapsed && (
      <ul className="ml-4 mt-2">{children}</ul>
    )}
  </li>
);

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`bg-gray-800 text-white h-auto transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top section: Only menu icon when collapsed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center cursor-pointer">
            <img
              src="/images.png"
              alt="Company Logo"
              className="w-8 h-8"
            />
            <span className="ml-2 font-bold text-2xl cursor-pointer">Orion RDV</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="focus:outline-none cursor-pointer">
          {collapsed ? <MdOutlineMenu  size={20} /> : <MdOutlineMenu  size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4">
        <ul>
          <MenuItem
            label="Home"
            icon={<FiHome size={20} />}
            collapsed={collapsed}
          />

          <MenuItem
            label="Alerts"
            dropdown
            icon={<FiAlertCircle size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["alerts"]}
            onClick={() => toggleDropdown("alerts")}
          >
            <li className="p-1 hover:bg-gray-700 cursor-pointer">Sub Alert 1</li>
          </MenuItem>

          <hr className="border-gray-600 my-2" />

          <MenuItem
            label="Summary Data"
            dropdown
            icon={<FiDatabase size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["summary"]}
            onClick={() => toggleDropdown("summary")}
          >
            <li className="p-1 hover:bg-gray-700 cursor-pointer">DAF Summary</li>
            <li className="p-1 hover:bg-gray-700 cursor-pointer">CLO2 Summary</li>
            <li className="p-1 hover:bg-gray-700 cursor-pointer">Brine Summary</li>
          </MenuItem>

          {/* Add other menu items similarly */}
          <MenuItem
            label="Analytics"
            dropdown
            icon={<IoPulseOutline size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["analytics"]}
            onClick={() => toggleDropdown("analytics")}
          >
          </MenuItem>

          <MenuItem
            label="Reports"
            dropdown
            icon={<FaFileCircleCheck size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["reports"]}
            onClick={() => toggleDropdown("reports")}
          >
          </MenuItem>

          <hr className="border-gray-600 my-2" />

          <MenuItem
            label="Operations"
            dropdown
            icon={<HiBeaker size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["operations"]}
            onClick={() => toggleDropdown("operations")}
          >
          </MenuItem>

          <MenuItem
            label="Financial"
            dropdown
            icon={<FaCalculator size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["financial"]}
            onClick={() => toggleDropdown("financial")}
          >
          </MenuItem>

          <MenuItem
            label="Sensor Telemetry"
            dropdown
            icon={<FaCloudDownloadAlt size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["sensor-telemetry"]}
            onClick={() => toggleDropdown("sensor-telemetry")}
          >
          </MenuItem>

          <hr className="border-gray-600 my-2" />
            {/* APPLICATION ADMINISTRATION heading (only shown when expanded) */}
            {!collapsed && (
            <li className="p-2 text-xs uppercase tracking-wider">
              APPLICATION ADMINISTRATION
            </li>
          )}

          <MenuItem
            label="Data Management"
            dropdown
            icon={<HiUsers size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["data-management"]}
            onClick={() => toggleDropdown("data-management")}
          >
          </MenuItem>

          <MenuItem
            label="Asset Management"
            dropdown
            icon={<FiAlertCircle size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["asset-management"]}
            onClick={() => toggleDropdown("asset-management")}
          >
          </MenuItem>

          <MenuItem
            label="Device Management"
            dropdown
            icon={<IoMdLaptop size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["device-management"]}
            onClick={() => toggleDropdown("device-management")}
          >
          </MenuItem>

          <MenuItem
            label="Authorized Key"
            dropdown
            icon={<MdVpnKey size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["authorized-key"]}
            onClick={() => toggleDropdown("authorized-key")}
          >
          </MenuItem>

          <MenuItem
            label="Subscription"
            dropdown
            icon={<FaEnvelope size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["subscription"]}
            onClick={() => toggleDropdown("subscription")}
          >
          </MenuItem>

          <MenuItem
            label="Administration"
            dropdown
            icon={<IoSettingsSharp size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["administration"]}
            onClick={() => toggleDropdown("administration")}
          >
          </MenuItem>

          <hr className="border-gray-600 my-2" />
            {/* INTERNAL OPERATIONS heading (only shown when expanded) */}
            {!collapsed && (
            <li className="p-2 text-xs uppercase tracking-wider">
              INTERNAL OPERATIONS
            </li>
          )}

          <MenuItem
            label="Job Management"
            dropdown
            icon={<MdManageAccounts size={20} />}
            collapsed={collapsed}
            isOpen={openDropdowns["job-management"]}
            onClick={() => toggleDropdown("job-management")}
          >
          </MenuItem>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;