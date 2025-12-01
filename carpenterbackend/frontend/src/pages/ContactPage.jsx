import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendMessage = async () => {
    setStatus("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bookings/contact/send/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (res.status === 200) {
        setStatus("Message sent successfully ✔");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed: " + data.error);
      }
    } catch (err) {
      setStatus("Network error");
    }
  };

  return (
    <div
      style={{
        width: "95%",
        maxWidth: 700,
        margin: "50px auto",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* -------------------- MESSAGE FORM -------------------- */}
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          marginBottom: 50,
          transition: "0.3s",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20, fontSize: 26 }}>
          📩 Send a Message
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          style={{
            width: "100%",
            padding: 14,
            marginTop: 12,
            borderRadius: 12,
            border: "1px solid #ccc",
            fontSize: 15,
          }}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          style={{
            width: "100%",
            padding: 14,
            marginTop: 12,
            borderRadius: 12,
            border: "1px solid #ccc",
            fontSize: 15,
          }}
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          rows="4"
          style={{
            width: "100%",
            padding: 14,
            marginTop: 12,
            borderRadius: 12,
            border: "1px solid #ccc",
            fontSize: 15,
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            width: "100%",
            padding: 14,
            marginTop: 18,
            borderRadius: 12,
            background:
              "linear-gradient(135deg, #007bff, #0055cc)",
            color: "#fff",
            border: "none",
            fontSize: 17,
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "0.2s",
          }}
          onMouseOver={(e) =>
            (e.target.style.transform = "scale(1.03)")
          }
          onMouseOut={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          Send Message
        </button>

        {status && (
          <p style={{ marginTop: 15, textAlign: "center", color: "green" }}>
            {status}
          </p>
        )}
      </div>

      {/* -------------------- EMERGENCY BLOCK -------------------- */}
      <div
        style={{
          background: "linear-gradient(135deg, #ff7676, #ff3d3d)",
          padding: 28,
          borderRadius: 15,
          color: "white",
          boxShadow: "0 6px 20px rgba(255,0,0,0.25)",
          marginBottom: 50,
        }}
      >
        <h3 style={{ marginBottom: 12, fontSize: 24 }}>
          🚨 அவசர சேவை (Emergency)
        </h3>

        <p style={{ fontSize: 16, lineHeight: 1.7 }}>
          நான் உடனடியாக கிடைக்காத சூழலில், இன்னொரு தச்சரை உடனடியாக
          ஏற்பாடு செய்து, சேவை தொடர்ச்சியாக வழங்கப்படும்.
        </p>

        <p style={{ marginTop: 16, fontSize: 20 }}>
          📞 <strong>Emergency Phone: +91 8220546995</strong>
        </p>
      </div>

      {/* -------------------- LOCATION -------------------- */}
      <div
        style={{
          background: "#ffffff",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          marginBottom: 40,
        }}
      >
        <h3 style={{ marginBottom: 15, fontSize: 24 }}>
          📍 Our Location
        </h3>

        <iframe
          title="location"
          src="https://maps.google.com/maps?q=KTC%20Nagar%20Tirunelveli&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: 15 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>

        <p style={{ marginTop: 15, fontSize: 16 }}>
          📌 KTC Nagar, Tirunelveli.
        </p>
      </div>
    </div>
  );
}
