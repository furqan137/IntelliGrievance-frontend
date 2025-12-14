import { Link } from "react-router-dom";
import { Brain, BarChart3, MessageSquare } from "lucide-react";

export default function Landing() {
  return (
    <div className="w-full text-gray-800 overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-blue-600">🧠</span>
            IntelliGrievance
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="/about" className="hover:text-blue-600">About</a>
            <a href="#features" className="hover:text-blue-600">Features</a>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </nav>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      {/* Offset for fixed header */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              AI-Driven Complaint <br /> & Suggestion Management
            </h1>

            <p className="text-gray-600 max-w-xl mb-8">
              Empower smarter communication between citizens and organizations
              with intelligent categorization and real-time tracking.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700"
              >
                Get Started →
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50"
              >
                Login
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
              <Brain className="text-blue-600" size={32} />
            </div>
            <p className="text-sm text-gray-500">AI-Powered Intelligence</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14">
            Complaints are automatically analyzed, categorized, and tracked using AI.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="text-blue-600" />}
              title="AI Categorization"
              text="Automatically classify complaints using machine learning."
            />
            <FeatureCard
              icon={<BarChart3 className="text-green-600" />}
              title="Real-time Tracking"
              text="Track complaint progress and resolution status instantly."
              bg="bg-green-100"
            />
            <FeatureCard
              icon={<MessageSquare className="text-purple-600" />}
              title="Instant Feedback"
              text="Get immediate acknowledgement and updates."
              bg="bg-purple-100"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              About IntelliGrievance
            </h2>

            <p className="text-gray-600 mb-4">
              IntelliGrievance is an AI-powered platform designed to improve
              transparency, accountability, and efficiency in grievance handling.
            </p>

            <p className="text-gray-600 mb-4">
              The system categorizes complaints, analyzes trends, and enables
              faster resolutions through real-time insights.
            </p>

            <p className="text-gray-600">
              Our mission is to modernize complaint management using technology.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ul className="space-y-4 text-sm text-gray-700">
              <li>✅ AI-powered categorization</li>
              <li>✅ Live complaint tracking</li>
              <li>✅ Secure & transparent workflow</li>
              <li>✅ Faster resolution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-8">
          Join users improving communication through intelligent complaint management.
        </p>

        <Link
          to="/register"
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700"
        >
          Create Your Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-300 py-14">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <FooterCol title="IntelliGrievance" items={["AI complaint management system"]} />
          <FooterCol title="Product" items={["Features", "Pricing"]} />
          <FooterCol title="Company" items={["About", "Contact"]} />
          <FooterCol title="Legal" items={["Privacy Policy", "Terms of Service"]} />
        </div>

        <p className="text-center text-xs text-gray-500 mt-10">
          © 2025 IntelliGrievance. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function FeatureCard({ icon, title, text, bg = "bg-blue-100" }) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition text-left">
      <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold text-white mb-3">{title}</h4>
      <ul className="text-sm space-y-2">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
