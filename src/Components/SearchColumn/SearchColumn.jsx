import React, { useEffect } from "react";
import "./SearchColumn.css";
import { BsSearch } from "react-icons/bs";
import { FollowCard } from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/AuthSlice/AuthSlice";
export const SearchColumn = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      if (user) {
        dispatch(getAllUsers());
      } else {
        console.log("could not complete the request");
      }
    } catch (err) {
      console.log(err, "could not complete the request");
    }
  }, [dispatch, user]);

  console.log(users);
  return (
    <div className="search-column">
      <div className="search-tab">
        <BsSearch color="white" size={23} />
        <input className="search-input" placeholder="Search..." />
      </div>
      <div>Suggestions for you</div>
      <div className="suggestions-container">
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <div key={user.id}>
              <FollowCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};
