import React, { useState } from "react";
import "./EditProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebaseconfig";
import { updateUserDetails } from "../../redux/AuthSlice/AuthSlice";

export const EditProfileModal = ({ setOpenEditProfile, user }) => {
  const dispatch = useDispatch();

  const [editUserData, setEditUserData] = useState({
    bio: user?.bio || "",
    portfolioLink: user?.portfolioLink || "",
    photo: "",
  });

  const [photoURL, setPhotoURL] = useState(
    user?.photoUrl ||
      "https://res.cloudinary.com/bhakti1801/image/upload/v1653925669/blank-profile-picture-g1870ca927_640_xroajd.png"
  );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const profileHandler = (e) => {
    setEditUserData({ ...editUserData, photo: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      setPhotoURL(event.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const file = editUserData.photo;
    if (!file && editUserData.bio && editUserData.portfolioLink) {
      return dispatch(
        updateUserDetails({
          bio: editUserData.bio,
          portfolioLink: editUserData.portfolioLink,
        })
      );
    }
    const id = Math.random().toString(36).substring(2, 15);
    console.log("profile img", file, file.name);
    const fileNameStr = file.name.split(".");
    const extension = fileNameStr[fileNameStr.length - 1];
    const filePath = `profile/${id}.${extension}`;
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
          const newUser = {
            filePath,
            photoUrl: downloadURL,
            bio: editUserData.bio,
            portfolioLink: editUserData.portfolioLink,
          };
          dispatch(updateUserDetails(newUser));
        });
      }
    );
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-title">Edit Profile</div>
      <div className="edit-profile-img">
        <img
          src={photoURL}
          alt="profile"
          className="edit-profile-responsive-img"
        />
      </div>
      <label className="profile-img-input-text">
        Edit
        <input
          type="file"
          className="profile-img-input"
          accept="image/jpeg,image/png,image/webp"
          onChange={profileHandler}
          name="profile"
        />
      </label>

      <div className="edit-profile-inputs">
        <label>Bio</label>
        <input
          placeholder="Enter bio"
          className="bio-input"
          onChange={(e) => onChangeHandler(e)}
          name="bio"
          value={editUserData.bio}
        />
      </div>
      <div className="edit-profile-inputs">
        <label>Portfolio link</label>
        <input
          placeholder="Enter portfolio link"
          className="portfolio-input"
          type="url"
          onChange={(e) => onChangeHandler(e)}
          name="portfolioLink"
          value={editUserData.portfolioLink}
        />
      </div>
      <div className="edit-profile-btns">
        <button
          className="save-profile-btn"
          onClick={(e) => {
            uploadFile(e), setOpenEditProfile(false);
          }}
        >
          Save
        </button>
        <button
          className="cancel-profile-btn"
          onClick={() => setOpenEditProfile(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
