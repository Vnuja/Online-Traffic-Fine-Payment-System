import React from "react";
import { motion } from "framer-motion";
import "./signup.css";

const SignUp = () => {
  return (
    <form style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
      <div className="container_user">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr className="hr_user" />

        <label htmlFor="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          className="input_user"
          required
        />

        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          className="input_user"
          required
        />

        <label htmlFor="confirmPassword"><b>Repeat Password</b></label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="confirmPassword"
          className="input_user"
          required
        />

        <label>
          <input
            type="checkbox"
            name="remember"
            className="checkbox_user"
            style={{ marginBottom: "15px" }}
          />{" "}
          Remember me
        </label>

        <p>
          By creating an account you agree to our{" "}
          <a href="#" style={{ color: "dodgerblue" }}>
            Terms & Privacy
          </a>.
        </p>

        <div className="clearfix_user">
          <button type="button" className="cancelbtn_user">
            Cancel
          </button>
          <button type="submit" className="signupbtn_user">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
