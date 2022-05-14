import React, { useState } from "react";
import "./MyFeedPage.css";
import { FeedColumn, SearchColumn, Sidebar } from "../../Components";

export const MyFeedPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="my-feed-page">
      <div
        className={` ${sidebarOpen && "sidebar-mbl"}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className={`${sidebarOpen ? "sidebar-open" : "sidebar-close"}`}>
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>
      </div>

      <FeedColumn setSidebarOpen={setSidebarOpen} />
      <div className="search-column-display">
        <SearchColumn />
      </div>
    </div>
  );
};
