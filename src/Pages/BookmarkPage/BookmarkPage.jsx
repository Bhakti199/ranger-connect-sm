import React, { useEffect } from "react";
import "./BookmarkPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { getAllBookmarks } from "../../redux/BookmarkSlice/BookmarkSlice";
import { PostCard, Loader } from "../../Components";
export const BookmarkPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookmarks());
  }, [dispatch]);
  const { bookmarks, getAllBookmarksStatus } = useSelector(
    (state) => state.bookmark
  );

  return (
    <div className="bookmark-page">
      <Link to="/my-feed">
        <AiOutlineDoubleLeft size={35} color="white" className="backward" />
      </Link>
      <div className="bookmark-title">My Bookmarks</div>
      {bookmarks &&
        bookmarks.length > 0 &&
        bookmarks.map((bookmark) => (
          <div key={bookmark.bookmarkId}>
            <PostCard post={bookmark.post} />
          </div>
        ))}
      {getAllBookmarksStatus === "pending" && <Loader />}
    </div>
  );
};
