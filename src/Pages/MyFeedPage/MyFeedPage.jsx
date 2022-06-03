import React, { useState } from "react";
import "./MyFeedPage.css";
import { FeedColumn, Loader, SearchColumn, Sidebar } from "../../Components";
import { useSelector } from "react-redux";

export const MyFeedPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { statusAllPost, logOutStatus } = useSelector((state) => state.post);
  return (
    <div className="my-feed-page">
      <div
        className={` ${sidebarOpen && "sidebar-mbl"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className={`${sidebarOpen ? "sidebar-open" : "sidebar-close"}`}>
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>
      <FeedColumn setSidebarOpen={setSidebarOpen} />
      <div className="search-column-display">
        <SearchColumn />
      </div>
      {(statusAllPost === "pending" || logOutStatus === "pending") && (
        <Loader />
      )}
    </div>
  );
};
