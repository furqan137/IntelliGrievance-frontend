import { Routes, Route } from "react-router-dom";

/* Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

import Dashboard from "./pages/Dashboard";
import AddComplaint from "./pages/AddComplaint";
import TrackComplaints from "./pages/TrackComplaints";
import Settings from "./pages/Settings";

import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";

/* Layout */
import AppLayout from "./layouts/AppLayout";

/* Guards */
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

import NotFound from "./pages/NotFound";


export default function App() {
  return (
    <Routes>
      {/* 🌐 PUBLIC */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 👤 USER ONLY */}
      <Route
        path="/dashboard"
        element={
          <UserRoute>
            <AppLayout role="user">
              <Dashboard />
            </AppLayout>
          </UserRoute>
        }
      />

      <Route
        path="/add-complaint"
        element={
          <UserRoute>
            <AppLayout role="user">
              <AddComplaint />
            </AppLayout>
          </UserRoute>
        }
      />

      <Route
        path="/track-complaints"
        element={
          <UserRoute>
            <AppLayout role="user">
              <TrackComplaints />
            </AppLayout>
          </UserRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <UserRoute>
            <AppLayout role="user">
              <Settings />
            </AppLayout>
          </UserRoute>
        }
      />

      {/* 🛠 ADMIN ONLY */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AppLayout role="admin">
              <AdminDashboard />
            </AppLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <AdminRoute>
            <AppLayout role="admin">
              <Analytics />
            </AppLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <AppLayout role="admin">
              <Settings />
            </AppLayout>
          </AdminRoute>
        }
      />

      {/* 🚫 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
