import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Plus, X } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("intelli_user") || "{}");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setComplaints(res.data || []);
    } catch (err) {
      console.error("Failed to load complaints", err);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */
  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status?.toLowerCase() === "pending"
  ).length;
  const resolved = complaints.filter(
    (c) => c.status?.toLowerCase() === "resolved"
  ).length;

  const recentComplaints = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "resolved") return "bg-green-100 text-green-700";
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-sm text-gray-500">
          Here's your complaint management dashboard
        </p>
      </div>

      {/* ADD COMPLAINT */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/add-complaint")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          Add New Complaint
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Complaints" value={total} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Resolved" value={resolved} />
      </div>

      {/* RECENT COMPLAINTS */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Recent Complaints</h2>
          <button
            onClick={() => navigate("/track-complaints")}
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-6">
            Loading complaints...
          </p>
        ) : recentComplaints.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No complaints submitted yet
          </p>
        ) : (
          <div className="space-y-4">
            {recentComplaints.map((c) => (
              <div
                key={c._id}
                className="border rounded-lg p-4 flex justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">
                      GRV-{c._id.slice(-4).toUpperCase()}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${statusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-xs text-gray-500">
                    {c.category} •{" "}
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedComplaint(c)}
                  className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DISTRIBUTION */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-semibold text-lg mb-4">
          Complaint Distribution
        </h2>

        <Distribution label="Resolved" value={resolved} />
        <Distribution label="Pending" value={pending} />
        <Distribution label="Other" value={total - resolved - pending} />
      </div>

      {/* ================= VIEW MODAL ================= */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </>
  );
}

/* ================= MODAL ================= */

function ComplaintModal({ complaint, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Complaint Details
        </h3>

        <div className="space-y-3 text-sm">
          <Detail label="Complaint ID">
            GRV-{complaint._id.slice(-4).toUpperCase()}
          </Detail>

          <Detail label="Title">{complaint.title}</Detail>

          <Detail label="Category">{complaint.category}</Detail>

          <Detail label="Status">
            <span className="capitalize">{complaint.status}</span>
          </Detail>

          <Detail label="Description">
            {complaint.description}
          </Detail>

          <Detail label="Submitted On">
            {new Date(complaint.createdAt).toLocaleString()}
          </Detail>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full border py-2 rounded-lg hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function Distribution({ label, value }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${Math.min(value * 10, 100)}%` }}
        />
      </div>
    </div>
  );
}
