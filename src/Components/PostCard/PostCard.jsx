import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";
import {
  BsEmojiSmile,
  BsHeart,
  BsFillHeartFill,
  BsBookmark,
  BsTrash,
  BsFillBookmarkFill,
} from "react-icons/bs";
import {
  addBookmark,
  deleteBookmark,
} from "../../redux/BookmarkSlice/BookmarkSlice";
import { addComments, deleteComments } from "../../redux/PostSlice/PostSlice";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSend, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../index";
import {
  deletePost,
  likedUserPost,
  disLikedUserPost,
} from "../../redux/PostSlice/PostSlice";
import { CommentCard } from "../index";

export const PostCard = ({ post }) => {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  const bookmarkId = bookmarks.find(
    (bookmark) => bookmark.post.id === post.id
  )?.bookmarkId;
  const isliked = post.likes?.some((id) => id === user.id);

  const addBookmarkHandler = (post) => {
    dispatch(addBookmark(post));
  };

  const deleteBookmarkHandler = (postId) => {
    let bookmark = bookmarks.find((bookmark) => bookmark.bookmarkId === postId);
    dispatch(deleteBookmark(bookmark.bookmarkId));
  };

  return (
    <>
      <div className="postcard">
        <Link to={`/profile/${post.user.id}`} className="post-profile">
          <img
            src={
              post.user.photoUrl === ""
                ? "https://res.cloudinary.com/bhakti1801/image/upload/v1653925669/blank-profile-picture-g1870ca927_640_xroajd.png"
                : post.user.photoUrl
            }
            alt=""
            className="responsive-img feed-profile-img"
          />
        </Link>
        <div className="postcard-main">
          <div className="postcard-username-container">
            <span className="postcard-username">
              {post.user.firstName} {post.user.lastName}
            </span>
            <span>{post.createdAt}</span>
          </div>
          <div className="postcard-main-text"> {post.postInput} </div>
          <div className="postcard-footer">
            {post.likes.length}{" "}
            {isliked ? (
              <div className="postcard-icon like-color like-icon">
                <BsFillHeartFill
                  onClick={() => dispatch(disLikedUserPost(post.id))}
                />
              </div>
            ) : (
              <div className="postcard-icon like-icon">
                <BsHeart onClick={() => dispatch(likedUserPost(post.id))} />
              </div>
            )}
            <div className="postcard-icon">
              <AiOutlineMessage
                onClick={() => setShowComments((prevValue) => !prevValue)}
              />
            </div>
            {bookmarkId ? (
              <div className="postcard-icon">
                <BsFillBookmarkFill
                  onClick={() => deleteBookmarkHandler(bookmarkId)}
                />
              </div>
            ) : (
              <div className="postcard-icon">
                <BsBookmark onClick={() => addBookmarkHandler(post)} />
              </div>
            )}
            {post.user.userName === user.userName && (
              <>
                <div className="postcard-icon">
                  <FiEdit onClick={() => setOpenCreatePost(true)} />
                </div>
                <div className="postcard-icon">
                  <BsTrash
                    onClick={() =>
                      dispatch(deletePost({ postId: post.id, bookmarkId }))
                    }
                  />
                </div>
              </>
            )}
          </div>
          <div className="postcard-comment-tab">
            <BsEmojiSmile size={21} color="var(--grey-color)" />
            <input
              className="comment-tab-input"
              placeholder="Add comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <FiSend
              size={21}
              color="var(--grey-color)"
              onClick={() => {
                dispatch(
                  addComments({ postId: post.id, comment: commentInput })
                );
                setCommentInput("");
                setShowComments(true);
              }}
            />
          </div>
          <div className="comment-column">
            {showComments && <CommentCard postId={post.id} />}
          </div>
        </div>
      </div>{" "}
      {openCreatePost && (
        <CreatePost setOpenCreatePost={setOpenCreatePost} post={post} />
      )}
    </>
  );
};
