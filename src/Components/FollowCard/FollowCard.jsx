import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../redux/AuthSlice/AuthSlice";
import { Link } from "react-router-dom";
import "./FollowCard.css";
export const FollowCard = ({ user }) => {
  const [followToggle, setFollowToggle] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className="follow-card">
      <Link to={`/profile/${user.id}`} className="post-profile">
        <img
          src={user.photoUrl}
          alt="profile.img"
          className="responsive-img feed-profile-img"
        />
      </Link>
      <div className="follow-card-text">
        <div className="follow-card-name">
          {user.firstName} {user.lastName}
        </div>
        <div className="follow-card-bio">@{user.userName}</div>
      </div>
      {userData.following?.some((follower) => follower === user.id) ? (
        <button
          className="unfollow-btn btn-other"
          onClick={() => dispatch(unfollowUser(user.id))}
        >
          unfollow
        </button>
      ) : (
        <button
          className="follow-btn"
          onClick={() => {
            console.log(user.id);
            dispatch(followUser(user.id));
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};
