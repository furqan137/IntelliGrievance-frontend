import { useState } from "react";
import { User, Lock } from "lucide-react";
import { useAuth } from "../context/authcontext";

export default function Settings() {
  const { user } = useAuth();

  /* ================= PROFILE STATE ================= */
  const [profile, setProfile] = useState({
    name: user?.name || "",
    phone: "",
  });

  /* ================= PASSWORD STATE ================= */
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  /* ================= HANDLERS ================= */
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully ✅");

    // 🔗 API later
    // api.put("/user/profile", profile)
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (passwords.newPass !== passwords.confirm) {
      setMessage("Passwords do not match ❌");
      return;
    }

    setMessage("Password updated successfully 🔐");

    // 🔗 API later
    // api.put("/user/password", passwords)
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your profile and account preferences
        </p>
      </div>

      {message && (
        <div className="mb-6 bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <User size={18} />
          <h2 className="font-semibold text-lg">Profile Information</h2>
        </div>

        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="+1 (555) 123-4567"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <input
              value={user?.role === "admin" ? "Admin" : "Citizen"}
              disabled
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>

      {/* ================= PASSWORD CARD ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} />
          <h2 className="font-semibold text-lg">Change Password</h2>
        </div>

        <form onSubmit={updatePassword} className="space-y-4">
          <input
            type="password"
            name="current"
            placeholder="Current password"
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="newPass"
            placeholder="New password"
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm new password"
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700">
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}
