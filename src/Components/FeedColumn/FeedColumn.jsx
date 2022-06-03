import React, { useEffect, useState } from "react";
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

  const [filterApply, setFilterApply] = useState("");
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.post.comments);
  const user = useSelector((state) => state.auth.user);

  const FeedPosts =
    user?.following &&
    posts?.length > 0 &&
    posts?.filter(
      (post) =>
        user.following.includes(post?.userId) || post?.userId === user?.id
    );

  const applyFilterHandler = () => {
    switch (filterApply) {
      case "TRENDING":
        return FeedPosts.sort(
          (first, second) => second.likes.length - first.likes.length
        );
      case "EARLIEST":
        return FeedPosts.sort(
          (first, second) =>
            new Date(first.createdAt) - new Date(second.createdAt)
        );
      case "LATEST":
        return FeedPosts.sort(
          (first, second) =>
            new Date(second.createdAt) - new Date(first.createdAt)
        );
      default:
        return FeedPosts;
    }
  };

  let filteredPosts = applyFilterHandler();

  const setFilterHandler = (filterInput) => {
    const check = filterApply === "" || filterApply != filterInput;
    setFilterApply(check ? filterInput : "");
    filteredPosts = filterInput === "" && FeedPosts;
  };

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
        <div className="sort-by-container">
          <div
            style={{
              backgroundColor: `${
                filterApply === "TRENDING" ? "var(--pink-light)" : "white"
              } `,
              color: `${filterApply === "TRENDING" ? "white" : "black"} `,
            }}
            className="sort-by-item"
            onClick={() => setFilterHandler("TRENDING")}
          >
            Trending
          </div>
          <div
            style={{
              backgroundColor: `${
                filterApply === "LATEST" ? "var(--pink-light)" : "white"
              } `,
              color: `${filterApply === "LATEST" ? "white" : "black"} `,
            }}
            className="sort-by-item"
            onClick={() => setFilterHandler("LATEST")}
          >
            Latest
          </div>
          <div
            style={{
              backgroundColor: `${
                filterApply === "EARLIEST" ? "var(--pink-light)" : "white"
              } `,
              color: `${filterApply === "EARLIEST" ? "white" : "black"} `,
            }}
            className="sort-by-item"
            onClick={() => setFilterHandler("EARLIEST")}
          >
            Earliest
          </div>
        </div>
        {filteredPosts &&
          filteredPosts.length > 0 &&
          filteredPosts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};
