import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { EditProfileModal, PostCard } from "../../Components";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileDetails } from "../../redux/AuthSlice/AuthSlice";
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const otherUserDetails = useSelector((state) => state.auth.otherUserDetails);
  const posts = useSelector((state) => state.post.posts);
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    dispatch(getUserProfileDetails(userId));
  }, [dispatch]);

  const loggedInUserPost = posts.filter(
    (post) => post.user.username === user.username
  );
  const userPosts = posts.filter((post) => post.user.id === userId);

  const currentUserProfile = userId === user.id ? user : otherUserDetails;
  console.log(otherUserDetails);
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
                ? "https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
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

            {userId === user.id && <IoSettingsOutline size={23} />}
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
        {userId === user.id
          ? loggedInUserPost.map((post) => <PostCard post={post} />)
          : userPosts.map((post) => <PostCard post={post} />)}
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
    </div>
  );
};
