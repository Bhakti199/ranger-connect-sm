import React from "react";
import "./Sidebar.css";
import {
  IoHomeOutline,
  IoRocketOutline,
  IoSettingsOutline,
  IoAdd,
} from "react-icons/io5";
import { BsPerson, BsBookmark, BsSearch, BsX } from "react-icons/bs";

export const Sidebar = ({ setSidebarOpen }) => {
  return (
    <div className="sidebar">
      <div className="logo-tab">
        <img
          src="https://res.cloudinary.com/bhakti1801/image/upload/v1652539071/Pink_Pastel_Cup_Cake_Bakery_Illustration_Logo_qlcyrh.png"
          alt=""
          className="icon"
        />

        <BsX
          onClick={() => setSidebarOpen(false)}
          size={30}
          className="sidebar-cancel {"
        />
      </div>
      <div className="sidebar-menu-text">Menu</div>
      <div className="sidebar-items-container">
        <div className="sidebar-item">
          <IoHomeOutline />
          <span className="sidebar-item-text">Home</span>
        </div>
        <div className="sidebar-item">
          <BsPerson />
          <span className="sidebar-item-text">Profile</span>
        </div>
        <div className="sidebar-item">
          <IoRocketOutline />
          <span className="sidebar-item-text">Explore</span>
        </div>
        <div className="sidebar-item sidebar-search-icon">
          <BsSearch />
          <span className="sidebar-item-text">Search</span>
        </div>
        <div className="sidebar-item">
          <BsBookmark />
          <span className="sidebar-item-text">Saved posts</span>
        </div>
        <div className="sidebar-item">
          <IoSettingsOutline />
          <span className="sidebar-item-text">Settings</span>
        </div>
      </div>
      <button className="sidebar-post-btn">Post</button>
      <button className="sidebar-post-btn-mbl">
        <IoAdd color="white" size={25} />
      </button>
    </div>
  );
};
