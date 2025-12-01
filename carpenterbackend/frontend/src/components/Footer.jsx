import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #111, #222)",
        color: "white",
        padding: "35px 0",
        marginTop: "40px",
      }}
    >
      <div className="container text-center">

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{
            height: "55px",
            marginBottom: "10px",
            filter: "brightness(1.1)",
          }}
        />

        <h4 style={{ fontWeight: "bold", marginTop: "5px" }}>
          Carpenter Sermakani
        </h4>

        <p style={{ margin: "5px 0", fontSize: "16px" }}>
          Tirunelveli • Palayamkottai • KTC Nagar
        </p>

        {/* Call Button */}
        <a
          href="tel:8220546995"
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "#000",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          📞 Call: 8220546995
        </a>

        {/* Divider */}
        <hr style={{ borderColor: "#555", margin: "25px 0" }} />

        <p style={{ fontSize: "14px", opacity: 0.8 }}>
          © {new Date().getFullYear()} Carpenter Services — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
