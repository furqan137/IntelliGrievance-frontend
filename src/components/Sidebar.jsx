import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  BarChart3,
  Settings,
  PlusCircle,
  ListChecks,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ role = "user" }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium";

  const inactive =
    "text-gray-600 hover:bg-blue-50 hover:text-blue-600";

  const active =
    "bg-blue-600 text-white";

  const handleLogout = () => {
    localStorage.removeItem("intelli_user");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } min-h-screen bg-white border-r flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* ================= LOGO + TOGGLE ================= */}
      <div className="px-4 py-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-blue-600">
              IntelliGrievance
            </h1>
            <p className="text-xs text-gray-500">
              AI Complaint System
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 px-3 py-4 space-y-2">

        {/* ================= USER LINKS ================= */}
        {role === "user" && (
          <>
            <SidebarLink
              to="/dashboard"
              icon={<Home size={18} />}
              label="Dashboard"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />

            <SidebarLink
              to="/add-complaint"
              icon={<PlusCircle size={18} />}
              label="Add Complaint"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />

            <SidebarLink
              to="/track-complaints"
              icon={<ListChecks size={18} />}
              label="Track Complaints"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />

            <SidebarLink
              to="/settings"
              icon={<Settings size={18} />}
              label="Settings"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />
          </>
        )}

        {/* ================= ADMIN LINKS ================= */}
        {role === "admin" && (
          <>
            <SidebarLink
              to="/admin"
              end
              icon={<ShieldCheck size={18} />}
              label="Admin Dashboard"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />

            <SidebarLink
              to="/admin/analytics"
              icon={<BarChart3 size={18} />}
              label="Analytics"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />

            <SidebarLink
              to="/admin/settings"
              icon={<Settings size={18} />}
              label="Settings"
              collapsed={collapsed}
              onClick={() => setCollapsed(false)}
              baseClass={baseClass}
              active={active}
              inactive={inactive}
            />
          </>
        )}
      </nav>

      {/* ================= FOOTER ================= */}
      <div className="px-3 py-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-600 text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition w-full"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

/* ================= REUSABLE LINK ================= */

function SidebarLink({
  to,
  icon,
  label,
  collapsed,
  onClick,
  active,
  inactive,
  baseClass,
  end,
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick} // ✅ AUTO EXPAND ON CLICK
      className={({ isActive }) =>
        `${baseClass} ${isActive ? active : inactive}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
