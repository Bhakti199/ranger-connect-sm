import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { EditProfileModal, PostCard, Loader } from "../../Components";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileDetails } from "../../redux/AuthSlice/AuthSlice";
import { getAllPosts } from "../../redux/PostSlice/PostSlice";
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const { user, updateUserDetailsStatus, getUserDetailsStatus } = useSelector(
    (state) => state.auth
  );
  const otherUserDetails = useSelector((state) => state.auth.otherUserDetails);
  const posts = useSelector((state) => state.post.posts);
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getUserProfileDetails(userId));
    dispatch(getAllPosts());
  }, [dispatch]);
  const loggedInUserPost = posts.filter((post) => post.user.id === userId);
  const userPosts = posts.filter((post) => post.user.id === userId);
  const currentUserProfile = userId === user.id ? user : otherUserDetails;
  const isFollowing = otherUserDetails?.followers?.includes(user.id);
  return (
    <div className="profile-page">
      <Link to="/my-feed">
        <AiOutlineDoubleLeft size={35} color="white" className="backward" />
      </Link>
      <div className="profile-section-one">
        <div className="profile-img-container">
          <img
            src={
              currentUserProfile?.photoUrl === ""
                ? "https://res.cloudinary.com/bhakti1801/image/upload/v1653925669/blank-profile-picture-g1870ca927_640_xroajd.png"
                : currentUserProfile?.photoUrl
            }
            alt="profile"
            className="profile-page-profile responsive-img"
          />
        </div>
        <div className="profile-data">
          <div className="profile-name-container">
            <div>
              <div className="profile-name">
                {currentUserProfile?.firstName} {currentUserProfile?.lastName}
              </div>
              <div className="profile-username">
                @{currentUserProfile?.userName}
              </div>
            </div>
            {userId === user.id ? (
              <button
                className="edit-profile-btn"
                onClick={() => setOpenEditProfile((prevValue) => !prevValue)}
              >
                Edit Profile
              </button>
            ) : (
              <div>
                {isFollowing ? (
                  <button className="unfollow-btn btn-other">unfollow</button>
                ) : (
                  <button className="follow-btn">Follow</button>
                )}
              </div>
            )}
          </div>

          <div className="followers">
            <div>0 Posts</div>
            <BsDot />
            <div>
              {currentUserProfile?.followers &&
                currentUserProfile?.followers.length}{" "}
              Followers
            </div>
            <BsDot />
            <div>
              {currentUserProfile?.following &&
                currentUserProfile?.following.length}{" "}
              Following
            </div>
          </div>
          <div className="bio-text">
            {currentUserProfile?.bio === ""
              ? "edit profile to add bio"
              : currentUserProfile?.bio}
          </div>
          <div>
            {currentUserProfile?.portfolioLink === ""
              ? "edit profile to add portfolio link."
              : currentUserProfile?.portfolioLink}
          </div>
        </div>
      </div>
      <h2>
        {userId === user.id ? "My" : currentUserProfile.firstName + "'s"} Posts
      </h2>

      <div className="profile-posts">
        {userId === user.id ? (
          loggedInUserPost.length === 0 ? (
            <div>0 posts</div>
          ) : (
            loggedInUserPost.map((post) => <PostCard post={post} />)
          )
        ) : loggedInUserPost.length === 0 ? (
          <div>0 posts</div>
        ) : (
          userPosts.map((post, index) => (
            <div key={index}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
      {openEditProfile && (
        <>
          <div
            className="edit-profile-container"
            onClick={() => setOpenEditProfile((prevValue) => !prevValue)}
          ></div>
          <EditProfileModal
            setOpenEditProfile={setOpenEditProfile}
            user={user}
          />
        </>
      )}
      {(updateUserDetailsStatus === "pending" ||
        getUserDetailsStatus === "pending") && <Loader />}
    </div>
  );
};
