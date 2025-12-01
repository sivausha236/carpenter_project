import React from "react";
import "./GalleryPage.css"; // 🔥 Import custom styles

function GalleryPage() {
  const images = [
    "/images/work1.jpg",
    "/images/work2.jpg",
    "/images/work3.jpg",
    "/images/work4.jpg",
    "/images/work5.jpg",
    "/images/work6.jpg",
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Work Gallery</h1>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="gallery-card" key={index}>
            <img src={img} alt="Work" className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
