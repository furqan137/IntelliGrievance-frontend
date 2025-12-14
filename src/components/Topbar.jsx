import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import ProfileModal from "./ProfileModal";

export default function Topbar({ user, title = "Dashboard" }) {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("intelli_user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* TOPBAR */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        {/* LEFT (empty for balance) */}
        <div className="w-32" />

        {/* CENTER TITLE */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">
            {title}
          </h1>
        </div>

        {/* RIGHT PROFILE */}
        <div className="relative w-32 flex justify-end" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <User size={18} />
            </div>
          </button>

          {open && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
              <button
                onClick={() => {
                  setShowProfile(true);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
              >
                View Profile
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-red-600 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {showProfile && (
        <ProfileModal user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}
