import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/AuthSlice/AuthSlice";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./Auth.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [seePassword, setSeePassword] = useState(false);
  const logInStatus = useSelector((state) => state.auth.logInStatus);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const logInHandler = async (e) => {
    e.preventDefault();
    let emailId = loginDetails.email,
      pass = loginDetails.password;
    try {
      await dispatch(
        logIn({
          email: emailId,
          password: pass,
        })
      ).unwrap();
      navigate("/my-feed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <form className="login-form" onSubmit={(e) => logInHandler(e)}>
        <h2 className="form-title">LOG IN</h2>
        <div className="form-inputs">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="form-input"
            value={loginDetails.email}
            required
            onChange={(event) =>
              setLoginDetails((prevObj) => ({
                ...prevObj,
                email: event.target.value,
              }))
            }
          />
          <div className="form-input">
            <input
              type={`${seePassword ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className="password-form-input"
              value={loginDetails.password}
              required
              onChange={(event) =>
                setLoginDetails((prevObj) => ({
                  ...prevObj,
                  password: event.target.value,
                }))
              }
            />
            {seePassword ? (
              <AiFillEye onClick={() => setSeePassword(false)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setSeePassword(true)} />
            )}
          </div>
        </div>
        <button type="submit" className="login-form-btn btn-cta">
          {logInStatus === "pending" ? "LOGGING..." : "LOGIN"}
        </button>
        <div
          className="login-guest"
          onClick={() => {
            setLoginDetails({
              email: "test@gmail.com",
              password: "tester",
            });
          }}
        >
          Login as a guest
        </div>
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/sign-up" className="link">
            REGISTER
          </Link>
        </p>
      </form>
    </div>
  );
};
