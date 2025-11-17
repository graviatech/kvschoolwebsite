import React from "react";
import "../styles/Banner.css";

const Banner = ({ title, image }) => {
  return (
    <div className="page-banner">
      <img src="/assets/banner-img1.jpg" alt={`${title} Banner`} className="banner-img" />
      <h2 className="banner-title">{title}</h2>
    </div>
  );
};

export default Banner;

