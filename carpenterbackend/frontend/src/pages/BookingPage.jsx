import React, { useState } from "react";
import axios from "axios";

function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/create/",
        {
          name,
          phone,
          address,
          problem,
          date,
          time,
        }
      );

      alert("🎉 Your booking has been submitted successfully!");

      if (response.data.whatsapp_url) {
        window.open(response.data.whatsapp_url, "_blank");
      }

      setName("");
      setPhone("");
      setAddress("");
      setProblem("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("⚠️ Failed to submit booking. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Book a Carpenter</h1>

      <div className="card p-4 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input
              className="form-control"
              type="text"
              value={phone}
              required
              maxLength="10"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Address"
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Work Needed</label>
            <textarea
              className="form-control"
              value={problem}
              required
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe the work"
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Select Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Select Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>

      {/* Emergency Section */}
      <div className="text-center mt-4">
        <a
          href="https://wa.me/8220546995"
          className="btn btn-success btn-lg px-4 py-2"
          target="_blank"
          rel="noreferrer"
        >
          🚨 Emergency WhatsApp (Fast Response)
        </a>
      </div>
    </div>
  );
}

export default BookingPage;
