import React, { useEffect } from "react";
import "./FeedColumn.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { RiMenuLine } from "react-icons/ri";
import { PostCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getComments } from "../../redux/PostSlice/PostSlice";
import { getAllBookmarks } from "../../redux/BookmarkSlice/BookmarkSlice";
import { setUserLogOut } from "../../redux/AuthSlice/AuthSlice";
export const FeedColumn = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(async () => {
    dispatch(getAllPosts());
    dispatch(getAllBookmarks());
    dispatch(getComments());
  }, [dispatch]);

  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.post.comments);
  const user = useSelector((state) => state.auth.user);
  console.log("from feedcolumn", user);
  const FeedPosts =
    user.following &&
    posts.length > 0 &&
    posts.filter(
      (post) =>
        user.following.includes(post.user.id) || post.user.id === user.id
    );
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
          <Link to={`/profile/${user.id}`} className="feed-profile">
            <img
              src={user.photoUrl}
              alt="profile img"
              className="responsive-img feed-profile-img"
            />
          </Link>
          <div className="feed-profile-text">Hi, {user.firstName} </div>
          <div className="notify-icon">
            <AiOutlineLogout
              size={30}
              color="white"
              onClick={() => {
                dispatch(setUserLogOut());
                navigate("/");
              }}
            />
          </div>
        </div>

        <div className="wish-text"></div>
      </div>
      <div className="feed-main">
        {FeedPosts &&
          FeedPosts.length > 0 &&
          FeedPosts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};
