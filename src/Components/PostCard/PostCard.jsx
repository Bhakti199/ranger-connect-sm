import React from "react";
import "./PostCard.css";
import { BsEmojiSmile, BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
export const PostCard = () => {
  return (
    <div className="postcard">
      <div className="post-profile">
        <img
          src="https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
          alt=""
          className="responsive-img feed-profile-img"
        />
      </div>
      <div className="postcard-main">
        <div className="postcard-username">Nayani</div>
        <div className="postcard-main-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          commodi ut eaque libero optio voluptas quibusdam molestias nesciunt
          iste blanditiis labore saepe quidem nulla nobis aspernatur quo
          incidunt, quae iure! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Veniam enim praesentium cumque ullam hic laborum
          deleniti corporis maxime unde, dignissimos expedita, voluptatem
          voluptatibus explicabo similique consequuntur doloribus debitis nihil
          a.
        </div>
        <div className="postcard-footer">
          <div className="postcard-comment-tab">
            <input className="comment-tab-input" placeholder="Add comment..." />
            <BsEmojiSmile size={21} color="var(--grey-color)" />
          </div>
          <div className="postcard-icon">
            <BsHeart />
          </div>
          <div className="postcard-icon">
            <AiOutlineMessage />
          </div>
        </div>
      </div>
    </div>
  );
};
