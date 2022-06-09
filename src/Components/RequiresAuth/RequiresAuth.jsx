import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { LoginPage } from "../../Pages";
import { getCurrentUser } from "../../redux/AuthSlice/AuthSlice";

export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");
    if (currentUserId) {
      (async () => {
        await dispatch(getCurrentUser());
        navigate(`${location.pathname}`);
      })();
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  return <div>{children}</div>;
};
