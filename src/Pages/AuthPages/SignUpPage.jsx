import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignUp } from "../../redux/AuthSlice/AuthSlice";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./Auth.css";

export const SignUpPage = () => {
  const [seePassword, setSeePassword] = useState(false);
  const signUpStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignUpHandler = async (event) => {
    event.preventDefault();
    const [first, last, username, email, password] = event.target;
    console.log(email.value, password.value);
    let firstName = first.value,
      lastName = last.value,
      userName = username.value,
      emailId = email.value,
      pass = password.value;
    try {
      await dispatch(
        SignUp({
          firstName,
          lastName,
          userName,
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
      <form className="login-form" onSubmit={(event) => SignUpHandler(event)}>
        <h2 className="form-title">SIGN UP</h2>
        <div className="form-inputs">
          <input
            type="text"
            placeholder="First Name"
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="form-input"
            required
          />
          <div className="form-input">
            <input
              type={`${seePassword ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className="password-form-input"
              required
            />
            {seePassword ? (
              <AiFillEye onClick={() => setSeePassword(false)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setSeePassword(true)} />
            )}
          </div>
        </div>
        <button type="submit" className="login-form-btn btn-cta">
          {signUpStatus === "loading" ? "SIGNING UP..." : "SIGNUP"}
        </button>
        <p className="register-text">
          Already have an account?
          <Link to="/login" className="link">
            LOGIN
          </Link>
        </p>
      </form>
    </div>
  );
};
