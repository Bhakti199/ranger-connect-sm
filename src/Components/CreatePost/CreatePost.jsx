import React, { useState } from "react";
import "./CreatePost.css";
import { AiOutlineSmile } from "react-icons/ai";
import { MdOutlineImageNotSupported, MdOutlineImage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addPost, editPost } from "../../redux/PostSlice/PostSlice";
import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebaseconfig";

export const CreatePost = ({
  setOpenCreatePost,
  post,
  setEditingPost,
  editingPost,
}) => {
  const dispatch = useDispatch();
  let initialInput = post ? post.postInput : "";
  let previousPhoto = post?.postPhotoUrl;
  const [photoToUpload, setPhotoToUpload] = useState(post?.postPhotoUrl || "");
  const [showEmoji, setShowEmoji] = useState(false);
  let currentDate = new Date().toLocaleDateString();
  const user = useSelector((state) => state.auth.user);
  const currentUserId = localStorage.getItem("userId");

  const [postObj, setPostObj] = useState({
    postInput: initialInput,
    postPhotoUrl: photoToUpload,
    userId: currentUserId,
    createdAt: currentDate,
  });

  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    setPostObj((prevObj) => ({
      ...prevObj,
      postInput: prevObj.postInput.concat(emojiObject.emoji),
    }));
    setShowEmoji(false);
  };

  const createPostHandler = (postObj) => {
    if (postObj.postInput === "") {
      console.log("please enter description");
    } else {
      dispatch(addPost(postObj));
    }
  };

  const updatePostHandler = (postInput, photoToUpload) => {
    dispatch(
      editPost({
        postInput,
        postPhotoUrl: photoToUpload,
        id: post.id,
      })
    );
  };

  const deletePhotoUpdate = () => {
    setPhotoToUpload("");
    setPostObj((prevObj) => ({ ...prevObj, postPhotoUrl: "", id: post.id }));
  };
  const postHandler = (e) => {
    setPostObj({ ...postObj, postPhotoUrl: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      setPhotoToUpload(event.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const file = postObj.postPhotoUrl;
    if (!file) {
      return createPostHandler({
        ...postObj,
        createdAt: currentDate,
        userId: currentUserId,
      });
    }
    const id = Math.random().toString(36).substring(2, 15);
    const fileNameStr = file.name.split(".");

    const extension = fileNameStr[fileNameStr.length - 1];
    const filePath = `postImage/${id}.${extension}`;
    //storage ref
    const storage = getStorage(app);
    const imageRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.totalBytes);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newPost = {
            filePath,
            postPhotoUrl: downloadURL,
            postInput: postObj.postInput,
            createdAt: currentDate,
            userId: currentUserId,
          };
          if (editingPost) {
            dispatch(
              editPost({
                filePath,
                postPhotoUrl: downloadURL,
                postInput: postObj.postInput,
                id: post.id,
              })
            );
            setEditingPost(false);
          } else {
            dispatch(addPost(newPost));
          }
        });
      }
    );
  };

  return (
    <div>
      <div
        className="create-post-container"
        onClick={() => setOpenCreatePost((prevValue) => !prevValue)}
      ></div>
      <div className={`create-post ${editingPost && "editing-post"}`}>
        <textarea
          name="content"
          className="post-input"
          cols="30"
          rows="10"
          value={postObj.postInput}
          onChange={(event) =>
            setPostObj((prevObj) => ({
              ...prevObj,
              postInput: event.target.value,
            }))
          }
        ></textarea>
        {postObj?.postPhotoUrl && postObj?.postPhotoUrl != "" && (
          <div className="create-post-img">
            <img src={photoToUpload} alt="" className="responsive-post-img" />
          </div>
        )}
        <div className="post-btn-container">
          {editingPost && (
            <MdOutlineImageNotSupported
              size={30}
              onClick={() => deletePhotoUpdate()}
            />
          )}
          <label>
            <MdOutlineImage size={30} />
            <input
              type="file"
              className="profile-img-input"
              accept="image/jpeg,image/png,image/webp"
              onChange={postHandler}
              name="photo"
            />
          </label>

          <AiOutlineSmile
            size={30}
            onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
            className="emoji"
          />
          {post ? (
            <button
              className="post-btn"
              type="submit"
              onClick={(e) => {
                if (photoToUpload === previousPhoto) {
                  updatePostHandler(postObj.postInput, photoToUpload);
                  setOpenCreatePost(false);
                } else if (editingPost && photoToUpload === "") {
                  updatePostHandler(postObj.postInput, photoToUpload);
                  setOpenCreatePost(false);
                } else {
                  uploadFile(e);
                  setOpenCreatePost(false);
                }
              }}
            >
              Update
            </button>
          ) : (
            <button
              className="post-btn"
              type="submit"
              onClick={(e) => {
                uploadFile(e);
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
