


import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        {/* ===== Column 1 ===== */}
        <div className="col">
          <h4>View / Downloads</h4>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/application-form">Application Form</a></li>
            <li><a href="/academic-calendar">Academic Calendar</a></li>
            <li><a href="/results">Results</a></li>
            <li><a href="/gallery">Photo Gallery</a></li>
          </ul>
        </div>

        {/* ===== Column 2 ===== */}
        <div className="col">
          <h4>Contact Us:</h4>
          <p>
            <strong>Address:</strong> Near Gandhi Institute, Opposite Jainpur,
            Hapur Bypass, Shoprix Mall, Delhi Road, Meerut
          </p>
          <p>
            <strong>Phone:</strong> +91 9045032868, 9639144661
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:gipsmrt.in@gmail.com">gipsmrt.in@gmail.com</a>
          </p>
        </div>

        {/* ===== Column 3 ===== */}
        <div className="col">
          <h4>Location</h4>
          <iframe
            title="School Location"
            src="https://www.google.com/maps?q=Kendriya+Vidyalaya+Sector+24+Noida&output=embed"
            style={{ width: "100%", height: "160px", border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* ===== Footer Bottom ===== */}
      <div className="footer-bottom container">
        <div className="social-icons">
          <a
            href="https://wa.me/919045032868"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube Channel"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow (Twitter)"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>

        <div className="copyright">
          © 2015 Gandhi International Public School. All rights reserved.
        </div>
      </div>
    </footer>
  );
}





