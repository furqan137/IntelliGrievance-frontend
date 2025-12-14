import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({ children, role }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar
        role={role}
        collapsed={collapsed}
        toggle={() => setCollapsed(!collapsed)}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR (ALWAYS VISIBLE) */}
        <Topbar toggleSidebar={() => setCollapsed(!collapsed)} />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
