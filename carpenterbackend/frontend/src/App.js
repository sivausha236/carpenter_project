import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import BookingPage from "./pages/BookingPage";

import AdminLogin from "./pages/AdminLogin";
import AdminBookingsPage from "./AdminBookingsPage";

// --------- PROTECTED ROUTE ----------
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/book" element={<BookingPage />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Page */}
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
