import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/AuthSlice/AuthSlice";
import "./Auth.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logInHandler = async (event) => {
    event.preventDefault();
    const [email, password] = event.target;
    console.log(email.value, password.value);
    let emailId = email.value,
      pass = password.value;
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
      <form className="login-form" onSubmit={(event) => logInHandler(event)}>
        <h2 className="form-title">LOG IN</h2>
        <div className="form-inputs">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="form-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="login-form-btn">
          Login
        </button>
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/sign-up" className="link">
            REGISTER
          </Link>
        </p>
      </form>
      <Link to="/my-feed"> Login as a guest</Link>
    </div>
  );
};
