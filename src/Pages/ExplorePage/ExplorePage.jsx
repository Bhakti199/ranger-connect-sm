import React, { useState } from "react";
import "../MyFeedPage/MyFeedPage.css";
import { useSelector } from "react-redux";
import {
  ExploreFeedColumn,
  SearchColumn,
  Sidebar,
  Loader,
} from "../../Components";

export const ExplorePage = () => {
  const { statusAllPost, logOutStatus } = useSelector((state) => state.post);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="my-feed-page">
      <div
        className={` ${sidebarOpen && "sidebar-mbl"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className={`${sidebarOpen ? "sidebar-open" : "sidebar-close"}`}>
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>
      <ExploreFeedColumn setSidebarOpen={setSidebarOpen} />
      <div className="search-column-display">
        <SearchColumn />
      </div>
      {(statusAllPost === "pending" || logOutStatus === "pending") && (
        <Loader />
      )}
    </div>
  );
};
