import React from "react";
import "./FollowCard.css";
export const FollowCard = () => {
  return (
    <div className="follow-card">
      <div className="post-profile">
        <img
          src="https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
          alt=""
          className="responsive-img feed-profile-img"
        />
      </div>
      <div className="follow-card-text">
        <div className="follow-card-name">Nayani Chopra</div>
        <div className="follow-card-bio">This is bio text.</div>
      </div>
      <button className="follow-btn">Follow</button>
    </div>
  );
};
