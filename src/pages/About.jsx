import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Users,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function About() {
  const [openFAQ, setOpenFAQ] = useState(5);

  const faqs = [
    { q: "How can I track my complaint?", a: "You can track your complaint from your dashboard in real-time with live status updates." },
    { q: "How does AI categorize issues?", a: "Our AI analyzes complaint text using machine learning models to automatically categorize issues." },
    { q: "How long does it take to resolve a complaint?", a: "Resolution time depends on the issue type, but most complaints are addressed within 24–72 hours." },
    { q: "Can I edit my complaint after submission?", a: "Yes, you can edit your complaint before it is reviewed by an administrator." },
    { q: "Is my personal information secure?", a: "Yes. We use industry-standard encryption and security practices to protect your data." },
    { q: "How do I contact support?", a: "You can reach our support team via the contact form or email support@intelligrievance.com." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ================= NAVBAR ================= */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-blue-600">⬢</span>
            IntelliGrievance
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ================= ABOUT HEADER ================= */}
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold mb-3">About IntelliGrievance</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Empowering smarter communication between citizens and organizations
          through AI-driven complaint management
        </p>
      </section>

      {/* ================= ABOUT CARD ================= */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-xl border p-8 text-sm text-gray-600 space-y-4">
          <p>
            IntelliGrievance is a revolutionary platform that transforms how
            complaints and suggestions are managed. By leveraging advanced
            artificial intelligence and machine learning, we enable organizations
            to categorize, prioritize, and resolve complaints faster and more
            efficiently.
          </p>
          <p>
            Our mission is to bridge the communication gap between citizens and
            organizations, ensuring that every voice is heard and every concern
            is addressed promptly and fairly.
          </p>
          <p>
            With real-time tracking, AI-powered categorization, and comprehensive
            analytics, IntelliGrievance helps organizations improve their service
            delivery and citizen satisfaction.
          </p>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="text-center mb-20">
        <Users className="mx-auto text-blue-600 mb-2" />
        <h2 className="text-2xl font-bold">Our Team</h2>
        <p className="text-gray-500 mb-10">
          Meet the talented people behind IntelliGrievance
        </p>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            ["Sarah Johnson", "Founder & CEO"],
            ["Michael Chen", "CTO & Lead Developer"],
            ["Emily Rodriguez", "AI/ML Specialist"],
            ["David Kumar", "Product Manager"],
          ].map(([name, role]) => (
            <div
              key={name}
              className="bg-white border rounded-xl p-6 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" />
              </div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm text-blue-600">{role}</p>
              <p className="text-xs text-gray-400 mt-1">
                {name.split(" ")[0].toLowerCase()}@intelligrievance.com
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center mb-8">
          <HelpCircle className="mx-auto text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-gray-500">
            Find answers to common questions about IntelliGrievance
          </p>
        </div>

        <div className="bg-white border rounded-xl divide-y">
          {faqs.map((f, i) => (
            <div key={i} className="p-4">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`transition ${
                    openFAQ === i ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </button>

              {openFAQ === i && (
                <p className="text-sm text-gray-600 mt-3">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-gray-500 text-center mb-10">
          Have questions? We'd love to hear from you
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white border rounded-xl p-6 space-y-4 text-sm">
            <div className="flex gap-3">
              <Mail className="text-blue-600" />
              support@intelligrievance.com
            </div>
            <div className="flex gap-3">
              <Phone className="text-blue-600" />
              +1 (234) 567-890
            </div>
            <div className="flex gap-3">
              <MapPin className="text-blue-600" />
              123 Tech Street, Innovation City, IC 12345
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border rounded-xl p-6">
            <h4 className="font-semibold mb-4">Send us a Message</h4>
            <form className="space-y-4">
              <input
                placeholder="Your name"
                className="w-full border rounded px-4 py-2"
              />
              <input
                placeholder="your@email.com"
                className="w-full border rounded px-4 py-2"
              />
              <textarea
                rows="4"
                placeholder="Your message..."
                className="w-full border rounded px-4 py-2"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 text-center py-6 text-sm">
        © 2025 IntelliGrievance. All rights reserved.
      </footer>
    </div>
  );
}
