import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import {
  IoHomeOutline,
  IoRocketOutline,
  IoSettingsOutline,
  IoAdd,
} from "react-icons/io5";
import { BsPerson, BsBookmark, BsSearch, BsX } from "react-icons/bs";
import { CreatePost } from "../index";
import { useDispatch, useSelector } from "react-redux";

export const Sidebar = ({ setSidebarOpen }) => {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className="sidebar">
        <div className="logo-tab">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/bhakti1801/image/upload/v1652539071/Pink_Pastel_Cup_Cake_Bakery_Illustration_Logo_qlcyrh.png"
              alt=""
              className="icon"
            />
          </Link>

          <BsX
            onClick={() => setSidebarOpen(false)}
            size={30}
            className="sidebar-cancel {"
          />
        </div>
        <div className="sidebar-menu-text">Menu</div>
        <div className="sidebar-items-container">
          <div className="sidebar-item">
            <IoRocketOutline />
            <span className="sidebar-item-text">Explore</span>
          </div>
          <Link to="/profile" className="sidebar-item link">
            <BsPerson />
            <span className="sidebar-item-text">Profile</span>
          </Link>

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
        <button
          className="sidebar-post-btn"
          onClick={() => setOpenCreatePost(true)}
        >
          Post
        </button>
        <button className="sidebar-post-btn-mbl">
          <IoAdd color="white" size={25} />
        </button>
      </div>
      {openCreatePost && <CreatePost setOpenCreatePost={setOpenCreatePost} />}
    </>
  );
};
