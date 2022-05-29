import React, { useState } from "react";
import "../MyFeedPage/MyFeedPage.css";
import { ExploreFeedColumn, SearchColumn, Sidebar } from "../../Components";

export const ExplorePage = () => {
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
    </div>
  );
};
