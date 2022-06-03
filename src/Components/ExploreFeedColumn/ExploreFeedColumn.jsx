import React, { useEffect } from "react";
import "../FeedColumn/FeedColumn.css";
import "./ExploreFeedColumn.css";
import { IoRocketOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { RiMenuLine } from "react-icons/ri";
import { PostCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getComments } from "../../redux/PostSlice/PostSlice";
import { getAllBookmarks } from "../../redux/BookmarkSlice/BookmarkSlice";
import { setUserLogOut } from "../../redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router";
export const ExploreFeedColumn = ({ setSidebarOpen }) => {
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
  const explorePosts = posts.filter(
    (post) =>
      !(user.following.includes(post.user.id) || post.user.id === user.id)
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

          <div className="feed-profile-text">
            <IoRocketOutline /> Explore
          </div>
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
        {explorePosts &&
          explorePosts.length > 0 &&
          explorePosts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        {explorePosts.length === 0 && (
          <div className="caught-up">You have all caught up.</div>
        )}
      </div>
    </div>
  );
};
