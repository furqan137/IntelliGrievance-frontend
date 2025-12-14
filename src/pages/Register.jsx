import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/authcontext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Password strength
  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return "Strong";
    return "Fair";
  };

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register(
        form.name.trim(),
        form.email.trim(),
        form.password,
        form.role
      );

      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-blue-600 text-xl">🧠</span>
          <h1 className="font-bold text-lg">IntelliGrievance</h1>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us to start managing complaints intelligently
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="abc@gmail.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* User Type */}
          <div>
            <label className="text-sm font-medium">User Type</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="user">Citizen / User</option>
              <option value="admin">Organization / Admin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p
              className={`text-xs mt-1 ${
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Fair"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              Strength: {strength}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
