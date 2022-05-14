import React from "react";
import "./FeedColumn.css";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiMenuLine } from "react-icons/ri";
import { PostCard } from "../index";
export const FeedColumn = ({ setSidebarOpen }) => {
  return (
    <div className="feed-column">
      <div className="feed-header">
        <div className="feed-profile-container">
          <RiMenuLine
            size={27}
            color="white"
            className="menu-icon"
            onClick={() => setSidebarOpen(true)}
          />
          <div className="feed-profile">
            <img
              src="https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
              alt=""
              className="responsive-img feed-profile-img"
            />
          </div>
          <div className="notify-icon">
            <IoNotificationsOutline size={30} color="white" />
          </div>
        </div>

        <div className="feed-profile-text">Hi, Nayani. Good Morning! </div>

        <div className="wish-text"></div>
      </div>
      <div className="feed-main">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};
