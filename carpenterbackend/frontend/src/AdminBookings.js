import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/bookings/list/"
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Bookings</h2>

      <div className="card p-4 shadow">
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="border p-3 mb-3 rounded">
              <p><b>Name:</b> {b.name}</p>
              <p><b>Phone:</b> {b.phone}</p>
              <p><b>Address:</b> {b.address}</p>
              <p><b>Work:</b> {b.problem}</p>
              <p><b>Date:</b> {b.date}</p>
              <p><b>Time:</b> {b.time}</p>
              <p><b>Created:</b> {new Date(b.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
