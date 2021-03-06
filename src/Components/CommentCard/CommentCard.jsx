import React from "react";
import "../FollowCard/FollowCard.css";
import "./CommentCard.css";
import { deleteComments } from "../../redux/PostSlice/PostSlice";
import { useDispatch, useSelector } from "react-redux";

export const CommentCard = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.post.comments);
  const user = useSelector((state) => state.auth.user);
  const commnentsOnPost = comments?.filter(
    (comment) => comment.postId === postId
  );

  return (
    <>
      {commnentsOnPost.length === 0 ? (
        <div>No comments</div>
      ) : (
        commnentsOnPost.map((comment) => (
          <div className="follow-card">
            <div className="post-profile">
              <img
                src={
                  comment.userData.photoUrl === ""
                    ? "https://res.cloudinary.com/bhakti1801/image/upload/v1653925669/blank-profile-picture-g1870ca927_640_xroajd.png"
                    : comment.userData.photoUrl
                }
                alt=""
                className="responsive-img feed-profile-img"
              />
            </div>
            <div className="follow-card-text">
              <div className="heading-comment">
                <span className="comment-card-name">
                  {comment.userData.firstName} {comment.userData.lastName}
                </span>
                {comment.userData.id === user.id && (
                  <span onClick={() => dispatch(deleteComments(comment.id))}>
                    delete
                  </span>
                )}
              </div>
              <div className="follow-card-bio">{comment.comment}</div>
            </div>
          </div>
        ))
      )}
    </>
  );
};
