import React from "react";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { PostCard } from "../../Components";
import "./ProfilePage.css";
export const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Link to="/my-feed">
        <AiOutlineDoubleLeft size={35} color="white" className="backward" />
      </Link>
      <div className="profile-section-one">
        <div className="profile-img-container">
          <img
            src="https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
            alt="profile"
            className="profile-page-profile responsive-img"
          />
        </div>
        <div className="profile-data">
          <div className="profile-name-container">
            <div>
              <div className="profile-name">Nayani Chopra</div>
              <div className="profile-username">@nayanee</div>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
            <IoSettingsOutline size={23} />
          </div>

          <div className="followers">
            <div>6 Posts</div>
            <BsDot />
            <div>100 Followers</div>
            <BsDot />
            <div>200 Following</div>
          </div>
          <div className="bio-text">
            Actor, Moody, Floaty, Fire, desire. Views expressed here are
            strictly personal.
          </div>
        </div>
      </div>
      <h2>My Posts</h2>
      <div className="profile-posts"></div>
    </div>
  );
};
