import React, { useEffect, useState } from "react";
import "../../Components/SearchColumn/SearchColumn.css";
import "./SearchPage.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { FollowCard } from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/AuthSlice/AuthSlice";
export const SearchPage = () => {
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
    <div className=" search-page">
      <Link to="/my-feed">
        <AiOutlineDoubleLeft size={35} color="white" className="backward" />
      </Link>
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
