

// // src/components/ParentHeader.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles/main.css";

// export default function Header() {
//   const location = useLocation();
//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "The School", path: "/school" },
//     { name: "Admissions", path: "/admissions" },
//     { name: "Fee Structure", path: "/fees" },
//     { name: "Academics", path: "/academics" },
//     { name: "Extra Curricular", path: "/extracurricular" },
//     { name: "Download", path: "/download" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Mandatory Disclosure", path: "/mandatory-disclosure" },
//     { name: "Contact", path: "/contact" },
    
//   ];

//   return (
//     <header className="site-header">
//       <div className="topbar">
//         <div className="top-left">
//           <img src="/assets/logo.png" alt="logo" className="logo" />
//           <div className="school-meta">
//             <div className="school-name">Kendriya Vidyalaya Sector-24 Noida</div>
//             <div className="school-sub">
//               CBSE Board Affiliated Co-Ed English Medium Senior Secondary School
//             </div>
//           </div>
//         </div>
//         <div className="top-right">
//           <Link to="/admin/login" className="login-btn">
//             Admin Login
//           </Link>
//         </div>
//       </div>

//       <nav className="main-nav">
//         <div className="nav-inner">
//           {navItems.map((item) => {
//             const active = location.pathname === item.path || (location.pathname === "/" && item.path === "/");
//             return (
//               <Link key={item.name} to={item.path} className={`nav-item ${active ? "active" : ""}`}>
//                 {item.name}
//               </Link>
//             );
//           })}
//         </div>
//       </nav>
//     </header>
//   );
// }












// src/components/ParentHeader.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";


const MySwal = withReactContent(Swal);

export default function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "The School", path: "/school" },
    { name: "Admissions", path: "/admissions" },
    // { name: "Fee Structure", path: "/fees" },
    { name: "Academics", path: "/academics" },
    { name: "Extra Curricular", path: "/extracurricular" },
    { name: "Download", path: "/download" },
    { name: "Gallery", path: "/gallery" },
    { name: "Mandatory Disclosure", path: "/mandatory-disclosure" },
    { name: "Contact", path: "/contact" },
  ];



  return (
    <header className="site-header">
      <div className="topbar">
        <div className="top-left">
          <img src="/assets/logo.png" alt="logo" className="logo" />
          <div className="school-meta">
            <div className="school-name">Kendriya Vidyalaya Sector-24 Noida</div>
            <div className="school-sub">
              CBSE Board Affiliated Co-Ed English Medium Senior Secondary School
            </div>
          </div>
        </div>

        <div className="top-right" style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/parent-fees")}
            className="payfee-btn"
            style={{
              background: "#0077b6",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            💳 Pay Fee
          </button>

          <Link to="/admin/login" className="login-btn">
            Admin Login
          </Link>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-inner">
          {navItems.map((item) => {
            const active =
              location.pathname === item.path ||
              (location.pathname === "/" && item.path === "/");
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${active ? "active" : ""}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}




















































