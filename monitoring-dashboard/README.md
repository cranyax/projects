# Orion RDV Dashboard

A modern, responsive dashboard built with **React**, **Tailwind CSS**, and **Recharts** for visualizing data with interactive charts and tables. This project is designed to monitor and display key metrics for Orion RDV, including chemical usage, performance metrics, and historical trends.

---

## Features

- **Responsive Design**:
  - Collapsible sidebar for better screen space utilization.
  - Dynamic layout adjustments for different screen sizes.

- **Interactive Charts**:
  - Built with **Recharts** for smooth and customizable data visualization.
  - Includes area charts with legends, tooltips, and data points.

- **Data Tables**:
  - Displays summarized data in a clean, organized table format.
  - Supports dynamic filtering and sorting.

- **Customizable Filters**:
  - Time-based filters (7 Day, 14 Day, 30 Day, etc.) for each chart.
  - Independent filter states for each section.

- **Reusable Components**:
  - Modular design with reusable components like `TimeFilterButtons`, `MenuItem`, and charts.

- **Tailwind CSS Styling**:
  - Consistent and modern UI design using Tailwind CSS utility classes.

---

## Technologies Used

- **Frontend**:
  - React (v18+)
  - Tailwind CSS (v3+)
  - Recharts (v2+)
  - React Icons (v4+)

- **Development Tools**:
  - Vite (for fast development and builds)
  - ESLint & Prettier (for code quality and formatting)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cranyax/projects/monitoring-dashboard.git
   cd monitoring-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
orion-rdv-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx         # Main dashboard layout and charts
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── Sidebar.jsx           # Collapsible sidebar menu
│   │   ├── TimeFilterButtons.jsx # Reusable time filter component
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
├── public/                       # Static assets (e.g., images)
├── package.json                  # Project dependencies and scripts
├── README.md                     # Project documentation
```

---

## Components Overview

### 1. **Sidebar**
- Collapsible navigation menu with dropdowns.
- Displays icons and labels for menu items.
- Toggles between expanded and collapsed states.

### 2. **Navbar**
- Displays the company logo, search bar, alerts, and user info.
- Adjusts layout based on sidebar state.

### 3. **Dashboard**
- Contains:
  - **Top Section**: Three charts (Performance Metrics, Data Summary, Usage Statistics).
  - **Bottom Section**: One wide chart (Historical Trends).
- Each chart has:
  - A heading with an icon.
  - A time filter (7 Day, 14 Day, etc.).
  - Interactive legends and tooltips.

### 4. **TimeFilterButtons**
- Reusable component for time-based filtering.
- Displays buttons for different time ranges (7 Day, 14 Day, etc.).

---

## Customization

### Add New Charts
1. Add a new chart component in `Dashboard.jsx`.
2. Use the `AreaChart` component from Recharts.
3. Pass your data and customize the chart properties (e.g., colors, stroke width).

### Update Data
- Modify the dummy data in `Dashboard.jsx`:
  - `performanceData`
  - `usageData`
  - `historicalData`

### Change Styling
- Use Tailwind CSS classes to customize the UI.
- Update colors, spacing, and layout in the respective components.

---

## Screenshots

![Dashboard Screenshot](/public/screenshot.png)  
