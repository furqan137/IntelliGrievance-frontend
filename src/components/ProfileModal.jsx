import { X, User, Mail, Shield } from "lucide-react";

export default function ProfileModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">
          Profile Information
        </h2>

        <div className="space-y-4">
          <Info icon={<User size={16} />} label="Name" value={user?.name} />
          <Info icon={<Mail size={16} />} label="Email" value={user?.email} />
          <Info
            icon={<Shield size={16} />}
            label="Role"
            value={user?.role === "admin" ? "Administrator" : "User"}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
