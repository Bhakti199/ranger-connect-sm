import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="home-page">
      <div className="social-media-banner">
        <div className="social-media-heading">
          <img
            src="https://res.cloudinary.com/bhakti1801/image/upload/v1652539071/Pink_Pastel_Cup_Cake_Bakery_Illustration_Logo_qlcyrh.png"
            alt=""
            className="social-media-logo"
          />

          <div>
            <div className="social-media-title">Ranger Connect</div>
            <div>
              {" "}
              <div>Follow, connect and share</div>
            </div>
          </div>
        </div>

        <Link to="/my-feed" className="join-now-btn link">
          Join Now
        </Link>
      </div>
    </div>
  );
};
