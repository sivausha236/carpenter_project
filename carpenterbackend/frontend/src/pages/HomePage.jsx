import React from "react";

export default function HomePage() {
  return (
    <div>

      {/* Hero Section */}
      <div
        style={{
          height: "220px",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          borderBottom: "3px solid #ddd",
        }}
      >
        {/* Logo + Title Row */}
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255,255,255,0.9)",
            padding: "6px 12px",
            borderRadius: "8px",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ height: "50px", width: "50px", objectFit: "contain" }}
          />
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            Carpenter Sermakani
          </h2>
        </div>

        {/* Emergency Banner */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#e60000",
            padding: "8px 16px",
            borderRadius: "6px",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
          }}
        >
          🚨 Emergency Service —
          <a
            href="tel:8220546995"
            style={{
              color: "yellow",
              marginLeft: "5px",
              textDecoration: "underline",
            }}
          >
            Tap to Call
          </a>
        </div>

        {/* Main Heading */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "18px",
            borderRadius: "10px",
            textAlign: "center",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ color: "#333", fontSize: "32px", fontWeight: "bold" }}>
            Professional Carpentry Services
          </h1>
          <p style={{ color: "#555", fontSize: "18px", marginTop: "5px" }}>
            Tirunelveli • Palayamkottai • KTC Nagar
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Our Services</h2>

        <div className="row g-4">
          {[
            { img: "/images/woodwork1.jpg", title: "Furniture Works" },
            { img: "/images/woodwork2.jpg", title: "Door & Window Fitting" },
            { img: "/images/woodwork3.jpg", title: "Repair & Renovation" },
          ].map((item, index) => (
            <div className="col-12 col-md-4" key={index}>
              <div
                className="card shadow-sm h-100"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <img
                  src={item.img}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h5>{item.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call Button */}
      <div className="text-center mb-5">
        <a
          href="tel:8220546995"
          className="btn btn-success px-4 py-2"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          Call Sermakani (8220546995)
        </a>
      </div>
    </div>
  );
}
