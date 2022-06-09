import React, { useEffect, useState } from "react";
import "./SearchColumn.css";
import { BsSearch } from "react-icons/bs";
import { FollowCard } from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/AuthSlice/AuthSlice";
export const SearchColumn = () => {
  const [searchUserInput, setSearchUserInput] = useState("");
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

  return (
    <div className="search-column">
      <div className="search-tab">
        <BsSearch color="white" size={23} />
        <input
          className="search-input"
          placeholder="Search..."
          onChange={(event) => setSearchUserInput(event.target.value)}
        />
      </div>
      <div>Suggestions for you</div>
      <div className="suggestions-container">
        {users &&
          users.length > 0 &&
          users
            .filter(
              (user) =>
                user.firstName
                  .toLowerCase()
                  .includes(searchUserInput.toLowerCase()) ||
                user.lastName
                  .toLowerCase()
                  .includes(searchUserInput.toLowerCase()) ||
                user.userName
                  .toLowerCase()
                  .includes(searchUserInput.toLowerCase())
            )
            .map((user) => (
              <div key={user.id}>
                <FollowCard user={user} />
              </div>
            ))}
      </div>
    </div>
  );
};
