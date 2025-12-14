import { useState } from "react";
import api from "../api/axios";
import { Upload } from "lucide-react";

export default function AddComplaint() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/complaints", form);
      alert("✅ Complaint submitted successfully");
      setForm({ title: "", category: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Submit a Complaint</h1>
        <p className="text-sm text-gray-500">
          Share your concerns or suggestions with us
        </p>
      </div>

      <div className="bg-white max-w-2xl rounded-xl shadow-sm border p-8 mx-auto">
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              required
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
            >
              <option value="">Select a category</option>
              <option>Technical Problem</option>
              <option>Service Issue</option>
              <option>Suggestion</option>
              <option>Finance</option>
              <option>Other</option>
            </select>
          </div>

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Short summary"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your complaint in detail..."
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
            />
            <p className="text-xs text-gray-400 mt-1">
              Minimum 10 characters
            </p>
          </div>

          {/* ATTACHMENT (UI ONLY) */}
          <div className="border-2 border-dashed rounded-lg p-6 text-center text-gray-400">
            <Upload className="mx-auto mb-2" />
            <p className="text-sm">Click to upload or drag and drop</p>
            <p className="text-xs">Max 5MB</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({ title: "", category: "", description: "" })
              }
              className="flex-1 border rounded-lg py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
