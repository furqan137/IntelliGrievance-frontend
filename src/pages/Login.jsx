import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/authcontext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ FIXED
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const user = await login(email.trim(), password);

      if (remember) {
        localStorage.setItem("remember_email", email);
      } else {
        localStorage.removeItem("remember_email");
      }

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.response?.data?.message || "Invalid email or password");
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
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to your account to continue
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-blue-600">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
