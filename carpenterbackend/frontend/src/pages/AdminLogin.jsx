import React, { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bookings/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        // Simple token to allow access
        localStorage.setItem("admin_token", "simple_admin_token");
        window.location.href = "/admin/bookings";
      } else {
        setError("Wrong password");
      }
    } catch (e) {
      setError("Network error");
    }
  };

  return (
    <div style={{ width: 340, margin: "80px auto", textAlign: "center" }}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 12 }}
      />

      <button
        onClick={handleLogin}
        style={{ width: "100%", padding: 10, marginTop: 12 }}
      >
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
