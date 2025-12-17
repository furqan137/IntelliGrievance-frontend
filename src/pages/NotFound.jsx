import { Link, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, HelpCircle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md w-full">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-600">404</span>
          </div>
        </div>

        {/* TEXT */}
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* ACTIONS */}
        <div className="flex justify-center gap-3 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Home size={16} />
            Go Back Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <LayoutDashboard size={16} />
            Go to Dashboard
          </button>
        </div>

        {/* SUPPORT */}
        <div className="text-sm text-gray-500">
          Need help?{" "}
          <Link
            to="/about"
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <HelpCircle size={14} />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
