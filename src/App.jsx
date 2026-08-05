import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NetworkBackground from "./components/NetworkBackground";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Gallery from "./pages/Gallery";
import People from "./pages/People";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageGallery from "./pages/admin/ManageGallery";
import ManagePeople from "./pages/admin/ManagePeople";
import ManageMessage from "./pages/admin/ManageMessage";
import ManageNews from "./pages/admin/ManageNews";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <NetworkBackground />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/events" element={<SiteLayout><Events /></SiteLayout>} />
        <Route path="/events/:id" element={<SiteLayout><EventDetail /></SiteLayout>} />
        <Route path="/gallery" element={<SiteLayout><Gallery /></SiteLayout>} />
        <Route path="/people" element={<SiteLayout><People /></SiteLayout>} />
        <Route path="/login" element={<SiteLayout><Login /></SiteLayout>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="people" element={<ManagePeople />} />
          <Route path="message" element={<ManageMessage />} />
          <Route path="news" element={<ManageNews />} />
        </Route>

        <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
      </Routes>
    </>
  );
}
