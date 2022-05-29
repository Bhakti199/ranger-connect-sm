import React, { useState } from "react";
import "./CreatePost.css";
import { AiOutlineSmile } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addPost, editPost } from "../../redux/PostSlice/PostSlice";
import EmojiPicker from "emoji-picker-react";

export const CreatePost = ({ setOpenCreatePost, post }) => {
  const [postInput, setPostInput] = useState(post ? post.postInput : "");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { firstName, lastName, userName, photoUrl, id } = user;
  const [showEmoji, setShowEmoji] = useState(false);
  let currentDate = new Date().toLocaleDateString();
  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    setPostInput((prevData) =>
      prevData ? prevData.concat(emojiObject.emoji) : emojiObject.emoji
    );
    setShowEmoji(false);
  };

  const createPostHandler = (postInput) => {
    if (postInput === "") {
      console.log("please enter description");
    } else {
      dispatch(
        addPost({
          postInput,
          createdAt: currentDate,
          userId: id,
        })
      );
    }
  };
  const updatePostHandler = (postInput) => {
    if (postInput === "") {
      console.log("please enter description");
    } else {
      dispatch(
        editPost({
          postInput,
          id: post.id,
        })
      );
    }
  };
  return (
    <div>
      <div
        className="create-post-container"
        onClick={() => setOpenCreatePost((prevValue) => !prevValue)}
      ></div>
      <div className="create-post" value={postInput}>
        <textarea
          name="content"
          className="post-input"
          cols="30"
          rows="10"
          value={postInput}
          onChange={(event) => setPostInput(event.target.value)}
        ></textarea>
        <div className="post-btn-container">
          <AiOutlineSmile
            size={30}
            onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
            className="emoji"
          />
          {post ? (
            <button
              className="post-btn"
              type="submit"
              onClick={() => {
                updatePostHandler(postInput);
                setOpenCreatePost(false);
              }}
            >
              Update
            </button>
          ) : (
            <button
              className="post-btn"
              type="submit"
              onClick={() => {
                createPostHandler(postInput);
                setOpenCreatePost(false);
              }}
            >
              Post
            </button>
          )}

          <button
            className="cancel-btn"
            onClick={() => setOpenCreatePost(false)}
          >
            Cancel
          </button>
        </div>
        {showEmoji && (
          <div className="emojicontainer">
            <EmojiPicker onEmojiClick={onEmojiClick} className="picker-emoji" />
          </div>
        )}
      </div>
    </div>
  );
};
