import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#facc15"];

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/admin/analytics");
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return <p className="text-gray-500">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  /* ================= DATA ================= */

  const statusData = data.statusAgg.map((s) => ({
    name: s._id,
    value: s.count,
  }));

  const categoryData = data.categoryAgg.map((c) => ({
    name: c._id,
    value: c.count,
  }));

  const timeData = data.timeAgg.map((t) => ({
    name: t._id,
    complaints: t.count,
  }));

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-sm text-gray-500">
          Visualize complaint trends and system insights
        </p>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Metric title="Avg Resolution Time" value={data.avgResolution} />
        <Metric title="Total Users" value={data.totalUsers} />
        <Metric title="AI Accuracy" value={data.aiAccuracy} />
        <Metric title="Customer Satisfaction" value={data.satisfaction} />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card title="Complaints by Category">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Status Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={90}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Complaints Over Time">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
}

/* ================= UI HELPERS ================= */

function Metric({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
