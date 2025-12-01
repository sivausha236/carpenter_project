import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable"

const LOGO = "/images/logo.png";

const STATUS_OPTIONS = ["Pending", "Assigned", "In Progress", "Completed", "Cancelled"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [colFilters, setColFilters] = useState({
    name: "",
    phone: "",
    problem: "",
    date: ""
  });

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [dark, setDark] = useState(() => localStorage.getItem("admin_dark") === "1");

  // Dark Mode
  useEffect(() => {
    if (dark) document.body.classList.add("admin-dark");
    else document.body.classList.remove("admin-dark");

    localStorage.setItem("admin_dark", dark ? "1" : "0");
  }, [dark]);

  // Load Bookings
  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bookings/admin/bookings/");

      if (!res.ok) {
        setError("Failed to load bookings");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setError("Network error");
    }

    setLoading(false);
  }

  // Update Status
  async function changeStatus(id, newStatus) {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/bookings/admin/update-status/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (res.ok) loadBookings();
      else alert("Status update failed");
    } catch {
      alert("Network error");
    }
  }

  // Delete booking
  async function deleteBooking(id) {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await fetch(
        `http://127.0.0.1:8000/api/bookings/admin/delete/${id}/`,
        { method: "DELETE" }
      );
      loadBookings();
    } catch {}
  }

  // ---------------------------------------------------------
  // EXPORT PDF
  // ---------------------------------------------------------
  function exportPDF() {
    const doc = new jsPDF();

    doc.addImage(LOGO, "PNG", 14, 10, 25, 25);

    doc.setFontSize(18);
    doc.text("Carpenter Sermakani - Booking Report", 48, 20);

    doc.setFontSize(11);
    doc.text("Tirunelveli • Palayamkottai • KTC Nagar", 48, 28);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 40);

    const rows = bookings.map(b => [
      b.name,
      b.phone,
      b.address,
      b.problem,
      b.date,
      b.time,
      b.status
    ]);

   /* doc.autoTable({
      startY: 48,
      head: [["Name", "Phone", "Address", "Work", "Date", "Time", "Status"]],
      body: rows
    });

    doc.save("booking-report.pdf");*/
  
  autoTable(doc, {
      startY: 40,
      head: [["Name", "Phone", "Address", "Work", "Date", "Time", "Status"]],
      body: filtered.map((b) => [
        b.name,
      b.phone,
      b.address,
      b.problem,
      b.date,
      b.time,
      b.status
      ]),
    });

    doc.save("BookingsReport.pdf");
  };

  // ---------------------------------------------------------
  // EXPORT EXCEL
  // ---------------------------------------------------------
  function exportExcel() {
    const wsData = [
      ["Carpenter Sermakani - Bookings"],
      [],
      ["Name", "Phone", "Address", "Work", "Date", "Time", "Status"]
    ];

    bookings.forEach(b => {
      wsData.push([
        b.name,
        b.phone,
        b.address,
        b.problem,
        b.date,
        b.time,
        b.status
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Style header row
    const headerCells = ["A3", "B3", "C3", "D3", "E3", "F3", "G3"];
    headerCells.forEach(cell => {
      ws[cell].s = {
        fill: { fgColor: { rgb: "DDDDDD" } },
        font: { bold: true },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
          bottom: { style: "thin" }
        }
      };
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "booking-report.xlsx");
  }

  // ---------------------------------------------------------
  // FILTERING
  // ---------------------------------------------------------
  const filtered = useMemo(() => {
    let arr = bookings.slice();

    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter(b =>
        `${b.name} ${b.phone} ${b.address} ${b.problem}`.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All")
      arr = arr.filter(b => b.status === statusFilter);

    if (colFilters.name)
      arr = arr.filter(b =>
        b.name.toLowerCase().includes(colFilters.name.toLowerCase())
      );

    if (colFilters.phone)
      arr = arr.filter(b => b.phone.includes(colFilters.phone));

    if (colFilters.problem)
      arr = arr.filter(b =>
        b.problem.toLowerCase().includes(colFilters.problem.toLowerCase())
      );

    if (colFilters.date)
      arr = arr.filter(b => b.date.startsWith(colFilters.date));

    return arr;
  }, [bookings, query, statusFilter, colFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const base = {
    fontFamily: "Arial, Helvetica, sans-serif",
    color: dark ? "#e6eef8" : "#111"
  };

  return (
    <div style={{ padding: 16, maxWidth: 1200, margin: "0 auto", ...base }}>
      
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={LOGO}
            alt="logo"
            style={{ width: 56, height: 56, borderRadius: 8 }}
          />
          <div>
            <h2 style={{ margin: 0 }}>Carpenter Sermakani</h2>
            <div style={{ fontSize: 13 }}>
              Tirunelveli · Palayamkottai · KTC Nagar
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setDark(d => !d)}>
            {dark ? "Light" : "Dark"}
          </button>
          <button onClick={() => (window.location.href = "/")}>Home</button>
        </div>
      </header>

      {/* EXPORT BUTTONS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          onClick={exportPDF}
          style={{ background: "#c62828", color: "#fff", padding: "8px 12px" }}
        >
          Download PDF Report
        </button>

        <button
          onClick={exportExcel}
          style={{ background: "#2e7d32", color: "#fff", padding: "8px 12px" }}
        >
          Download Excel Report
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        <input
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: 8, flexGrow: 1 }}
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="All">All</option>
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          placeholder="Name"
          value={colFilters.name}
          onChange={e =>
            setColFilters(s => ({ ...s, name: e.target.value }))
          }
          style={{ padding: 8 }}
        />

        <input
          placeholder="Phone"
          value={colFilters.phone}
          onChange={e =>
            setColFilters(s => ({ ...s, phone: e.target.value }))
          }
          style={{ padding: 8 }}
        />

        <input
          placeholder="Work"
          value={colFilters.problem}
          onChange={e =>
            setColFilters(s => ({ ...s, problem: e.target.value }))
          }
          style={{ padding: 8 }}
        />

        <input
          type="date"
          value={colFilters.date}
          onChange={e =>
            setColFilters(s => ({ ...s, date: e.target.value }))
          }
          style={{ padding: 8 }}
        />
      </div>

      {/* TABLE */}
      <div
        style={{
          background: dark ? "#07101a" : "#fff",
          padding: 12,
          borderRadius: 8,
          overflowX: "auto"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 900
          }}
        >
          <thead>
            <tr style={{ background: dark ? "#0b2230" : "#f6f6f6" }}>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Work</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pageItems.map(b => (
              <tr key={b.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td>{b.name}</td>

                <td>
                  {b.phone}
                  <div style={{ marginTop: 6 }}>
                    <a href={`tel:${b.phone}`} style={{ marginRight: 8 }}>Call</a>
                    <a href={`https://wa.me/${b.phone}`} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </div>
                </td>

                <td>{b.address}</td>
                <td>{b.problem}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>

                <td>
                  <select
                    value={b.status}
                    onChange={e => changeStatus(b.id, e.target.value)}
                    style={{ padding: 6 }}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: 6
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "center",
          gap: 8
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      
      <footer style={{ marginTop: 20, textAlign: "center" }}>
        Carpenter Sermakani • Phone: 8220546995
      </footer>
    </div>
  );
}
