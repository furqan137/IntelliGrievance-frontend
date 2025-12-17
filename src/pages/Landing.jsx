import { Link } from "react-router-dom";
import {
  Brain,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

// ✅ IMPORT LOCAL HERO IMAGE
import HeroImage from "../assets/hero-image.jpg";

export default function Landing() {
  return (
    <div className="w-full text-gray-800 overflow-x-hidden bg-white">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-blue-600">🧠</span>
            IntelliGrievance
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </nav>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Smart AI-Powered <br />
              <span className="text-blue-600">Complaint Management</span>
            </h1>

            <p className="text-gray-600 max-w-xl mb-8 text-lg">
              A modern platform that uses AI to categorize, track, and resolve complaints
              with transparency and real-time insights.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-7 py-4 rounded-full font-medium hover:bg-blue-700 flex items-center gap-2 transition"
              >
                Start Free <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-7 py-4 rounded-full font-medium hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>

          {/* RIGHT – HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <img
                src={HeroImage}
                alt="AI Complaint Management Dashboard"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            How IntelliGrievance Works
          </motion.h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Automated workflows powered by AI ensure faster, transparent,
            and smarter grievance handling.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Brain className="text-blue-600" size={26} />}
              title="AI Categorization"
              text="Machine learning automatically classifies complaints accurately."
            />
            <FeatureCard
              icon={<BarChart3 className="text-green-600" size={26} />}
              title="Live Tracking"
              text="Monitor complaint status and resolution progress in real-time."
              bg="bg-green-100"
            />
            <FeatureCard
              icon={<MessageSquare className="text-purple-600" size={26} />}
              title="Instant Updates"
              text="Users receive instant notifications and acknowledgements."
              bg="bg-purple-100"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Built for Trust & Transparency
            </h2>

            <p className="text-gray-600 mb-4">
              IntelliGrievance empowers organizations to manage complaints
              efficiently while ensuring fairness and accountability.
            </p>

            <p className="text-gray-600">
              Advanced analytics help identify trends, improve services,
              and enhance user satisfaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-10 shadow-lg"
          >
            <ul className="space-y-5 text-sm text-gray-700">
              <li className="flex gap-3"><ShieldCheck className="text-blue-600" /> Secure & encrypted data</li>
              <li className="flex gap-3"><ShieldCheck className="text-blue-600" /> Transparent workflows</li>
              <li className="flex gap-3"><ShieldCheck className="text-blue-600" /> Faster resolutions</li>
              <li className="flex gap-3"><ShieldCheck className="text-blue-600" /> AI-driven insights</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Start Managing Complaints Smarter
        </motion.h2>

        <p className="mb-10 opacity-90">
          Join organizations modernizing grievance handling with AI.
        </p>

        <Link
          to="/register"
          className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <FooterCol title="IntelliGrievance" items={["AI-powered complaint platform"]} />
          <FooterCol title="Product" items={["Features", "Security", "Roadmap"]} />
          <FooterCol title="Company" items={["About", "Contact"]} />
          <FooterCol title="Legal" items={["Privacy Policy", "Terms"]} />
        </div>

        <p className="text-center text-xs text-gray-600 mt-10">
          © 2025 IntelliGrievance. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FeatureCard({ icon, title, text, bg = "bg-blue-100" }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 p-10 rounded-2xl shadow-sm hover:shadow-xl text-left"
    >
      <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </motion.div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold text-white mb-4">{title}</h4>
      <ul className="text-sm space-y-2">
        {items.map((item, i) => (
          <li key={i} className="hover:text-white transition cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
