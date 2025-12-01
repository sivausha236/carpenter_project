import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-header">
        <h1>About Carpenter Sermakani</h1>
        <p>Professional Carpenter Services in Tirunelveli · Palayamkottai · KTC Nagar</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <img
          src="/images/carpenter-profile.jpg"
          alt="Carpenter Sermakani"
          className="profile-img"
        />

        <div className="profile-details">
          <h2>Sermakani</h2>
          <p className="exp">🔨 25+ Years of Carpentry Experience</p>
          <p className="location">📍 Based in Tirunelveli — KTC Nagar</p>
          <p className="about-text">
            I am a full-time carpenter offering customized furniture making,
            wood repair, door/window works, kitchen setup, and home interior carpentry.
            I believe in quality, honesty, and delivering work on time.
          </p>

          <p className="about-text-tamil">
            <strong>தமிழில்:</strong><br />
            நான் 25+ வருட அனுபவம் கொண்ட தச்சன். வீடுகள், கடைகள், அலமாரிகள்,
            கதவு, ஜன்னல், படுக்கை, சமையலறை வேலைகள் போன்ற அனைத்து மர வேலைகளும்
            நேர்மை மற்றும் நம்பிக்கையுடன் செய்து கொடுக்கிறேன்.
          </p>

          <a href="tel:8220546995" className="call-btn">📞 Call: 8220546995</a>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2>Services & Skills</h2>
        <div className="skills-grid">
          <div className="skill-box">🪵 Furniture Making</div>
          <div className="skill-box">🚪 Door & Window Works</div>
          <div className="skill-box">🛏️ Cot / Bed Works</div>
          <div className="skill-box">🪑 Table & Chair Fixing</div>
          <div className="skill-box">🏠 Interior Carpentry</div>
          <div className="skill-box">🔧 Wood Repair</div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

