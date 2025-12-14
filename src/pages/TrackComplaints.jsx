import { useEffect, useState } from "react";
import api from "../api/axios";
import { Search } from "lucide-react";

export default function TrackComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setComplaints(res.data || []);
    } catch (err) {
      console.error("Failed to load complaints", err);
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c._id.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    if (status === "Resolved")
      return "bg-green-100 text-green-700";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">My Complaints</h1>
        <p className="text-sm text-gray-500">
          Track all your submitted complaints and their status
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            placeholder="Search by ID or category..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded-lg px-4 py-2 bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Review</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Complaint ID</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">
                Date Submitted
              </th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400"
                >
                  No complaints found
                </td>
              </tr>
            )}

            {filteredComplaints.map((c) => (
              <tr
                key={c._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-3">
                  GRV-{c._id.slice(-4).toUpperCase()}
                </td>
                <td className="px-6 py-3">{c.category}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${statusBadge(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  {new Date(c.createdAt).toISOString().slice(0, 10)}
                </td>
                <td className="px-6 py-3">
                  <button className="text-xs border px-3 py-1 rounded hover:bg-gray-100">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
