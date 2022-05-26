import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { LoginPage } from "../../Pages";

export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <div>
      {isUserLoggedIn ? (
        children
      ) : (
        <Navigate
          to="/login"
          element={<LoginPage />}
          state={{ from: location }}
          replace
        />
      )}
    </div>
  );
};
