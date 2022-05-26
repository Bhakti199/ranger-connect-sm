import React, { useState } from "react";
import "./PostCard.css";
import { BsEmojiSmile, BsHeart, BsBookmark, BsTrash } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSend, FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../index";
import { deletePost } from "../../redux/PostSlice/PostSlice";

export const PostCard = ({ post }) => {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const deletePostHandler = (postId) => {
    dispatch(deletePost(postId));
  };
  return (
    <>
      <div className="postcard">
        <div className="post-profile">
          <img
            src={
              post.user.photoUrl === ""
                ? "https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
                : post.user.photoUrl
            }
            alt=""
            className="responsive-img feed-profile-img"
          />
        </div>
        <div className="postcard-main">
          <div className="postcard-username">
            {post.user.firstName} {post.user.lastName}
          </div>
          <div className="postcard-main-text"> {post.postInput} </div>
          <div className="postcard-footer">
            <div className="postcard-comment-tab">
              <BsEmojiSmile size={21} color="var(--grey-color)" />
              <input
                className="comment-tab-input"
                placeholder="Add comment..."
              />
              <FiSend size={21} color="var(--grey-color)" />
            </div>
            <div className="postcard-icon">
              <BsHeart />
            </div>
            <div className="postcard-icon">
              <AiOutlineMessage />
            </div>
            <div className="postcard-icon">
              <BsBookmark />
            </div>
            {post.user.userName === user.userName && (
              <>
                <div className="postcard-icon">
                  <FiEdit onClick={() => setOpenCreatePost(true)} />
                </div>
                <div className="postcard-icon">
                  <BsTrash onClick={() => deletePostHandler(post.id)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>{" "}
      {openCreatePost && (
        <CreatePost setOpenCreatePost={setOpenCreatePost} post={post} />
      )}
    </>
  );
};
