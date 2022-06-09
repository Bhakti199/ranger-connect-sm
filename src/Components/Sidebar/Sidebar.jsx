import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { IoHomeOutline, IoRocketOutline } from "react-icons/io5";
import { BsPerson, BsBookmark, BsSearch, BsX } from "react-icons/bs";
import { CreatePost } from "../index";
import { useDispatch, useSelector } from "react-redux";

export const Sidebar = ({ setSidebarOpen }) => {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const getStyleOfActiveLink = ({ isActive }) => ({
    color: isActive && "white",
    backgroundColor: isActive && "var(--blue-lightest)",
    padding: "5px",
    borderRadius: "10px",
  });
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
          <NavLink
            style={getStyleOfActiveLink}
            to="/my-feed"
            className="sidebar-item link"
          >
            <IoHomeOutline size={22} />
            <span className="sidebar-item-text">My feed</span>
          </NavLink>
          <NavLink
            style={getStyleOfActiveLink}
            to="/explore"
            className="sidebar-item link"
          >
            <IoRocketOutline size={22} />
            <span className="sidebar-item-text">Explore</span>
          </NavLink>
          <NavLink
            style={getStyleOfActiveLink}
            to={`/profile/${user.id}`}
            className="sidebar-item link"
          >
            <BsPerson size={24} />
            <span className="sidebar-item-text">Profile</span>
          </NavLink>

          <NavLink
            style={getStyleOfActiveLink}
            to="/search"
            className="sidebar-item sidebar-search-icon link"
          >
            <BsSearch size={22} />
            <span className="sidebar-item-text">Search</span>
          </NavLink>
          <NavLink
            style={getStyleOfActiveLink}
            to="/bookmarks"
            className="sidebar-item link"
          >
            <BsBookmark size={20} />
            <span className="sidebar-item-text">Bookmarks</span>
          </NavLink>

          <button
            className="sidebar-post-btn btn-cta"
            onClick={() => setOpenCreatePost(true)}
          >
            Post
          </button>
        </div>
      </div>

      {openCreatePost && <CreatePost setOpenCreatePost={setOpenCreatePost} />}
    </>
  );
};
