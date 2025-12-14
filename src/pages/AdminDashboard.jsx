import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart2,
} from "lucide-react";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("intelli_user"));

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* ================= FETCH ================= */
  const fetchComplaints = async () => {
    try {
      const res = await api.get("/admin/complaints");
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (status) => {
    if (!selected) return;
    setUpdating(true);

    try {
      await api.put(
        `/admin/complaints/${selected._id}/status`,
        { status } // ✅ MUST MATCH BACKEND
      );

      setSelected(null);
      fetchComplaints();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  /* ================= STATS ================= */
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  const badge = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in-review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const label = (status) => {
    if (!status) return "Unknown";
    return status
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || "Admin"} 👋
        </h1>
        <p className="text-sm text-gray-500">
          Manage all complaints and system insights
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Complaints" value={total} icon={<AlertCircle />} />
        <StatCard title="Pending" value={pending} icon={<Clock />} />
        <StatCard title="Resolved" value={resolved} icon={<CheckCircle />} />
        <StatCard title="AI Categorized" value="98.5%" icon={<BarChart2 />} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-semibold mb-4">Manage Complaints</h2>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-blue-600">
                    GRV-{c._id.slice(-4).toUpperCase()}
                  </td>
                  <td className="px-4 py-3">{c.user?.email || "N/A"}</td>
                  <td className="px-4 py-3">{c.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${badge(
                        c.status
                      )}`}
                    >
                      {label(c.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(c)}
                      className="text-xs border px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}

              {complaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-semibold mb-2">
              Update Complaint Status
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Complaint: <b>{selected.title}</b>
            </p>

            <div className="flex gap-3">
              <button
                disabled={updating}
                onClick={() => updateStatus("resolved")}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Resolve
              </button>

              <button
                disabled={updating}
                onClick={() => updateStatus("in-review")}
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                In Review
              </button>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= CARD ================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className="text-blue-600">{icon}</div>
    </div>
  );
}
