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
  const user = useSelector((state) => state.auth.user);
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
          <Link to="/my-feed" className="sidebar-item link">
            <IoHomeOutline size={22} />
            <span className="sidebar-item-text">My feed</span>
          </Link>
          <Link to="/explore" className="sidebar-item link">
            <IoRocketOutline size={22} />
            <span className="sidebar-item-text">Explore</span>
          </Link>
          <Link to={`/profile/${user.id}`} className="sidebar-item link">
            <BsPerson size={24} />
            <span className="sidebar-item-text">Profile</span>
          </Link>

          <Link to="/search" className="sidebar-item sidebar-search-icon link">
            <BsSearch size={22} />
            <span className="sidebar-item-text">Search</span>
          </Link>
          <Link to="/bookmarks" className="sidebar-item link">
            <BsBookmark size={20} />
            <span className="sidebar-item-text">Bookmarks</span>
          </Link>
          <div className="sidebar-item">
            <IoSettingsOutline size={22} />
            <span className="sidebar-item-text">Settings</span>
          </div>
        </div>
        <button
          className="sidebar-post-btn btn-cta"
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
