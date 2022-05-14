import React from "react";
import "./SearchColumn.css";
import { BsSearch } from "react-icons/bs";
import { FollowCard } from "../../Components";
export const SearchColumn = () => {
  return (
    <div className="search-column">
      <div className="search-tab">
        <BsSearch color="white" size={23} />
        <input className="search-input" placeholder="Search..." />
      </div>
      <div>Suggestions for you</div>
      <div className="suggestions-container">
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
      </div>
    </div>
  );
};
