import React from "react";
import "../FollowCard/FollowCard.css";
import "./CommentCard.css";
import { deleteComments } from "../../redux/PostSlice/PostSlice";
import { useDispatch, useSelector } from "react-redux";

export const CommentCard = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.post.comments);
  const commnentsOnPost = comments.filter(
    (comment) => comment.postId === postId
  );
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {commnentsOnPost.length === 0 ? (
        <div>No comments</div>
      ) : (
        commnentsOnPost.map((comment) => (
          <div className="follow-card">
            <div className="post-profile">
              <img
                src="https://res.cloudinary.com/bhakti1801/image/upload/v1652444433/model8_rvnzuo.jpg"
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
