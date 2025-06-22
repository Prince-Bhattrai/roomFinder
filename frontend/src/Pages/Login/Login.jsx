import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";
import { url } from "../../../url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required", { theme: "dark" });
    if (!password) return toast.error("Password is required", { theme: "dark" });

    try {
      const res = await axios.post(`${url}/user/login`, {
        email,
        password,
      });

      // Assuming backend sends { token, user, success, message }
      const { token, user } = res.data;

      // Save token to localStorage
      localStorage.setItem("jwtToken", token);

      toast.success("Login successful", { theme: "dark" });

      // Optional: save user info
      localStorage.setItem("userInfo", JSON.stringify(user));

      // Redirect to dashboard or home
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed",
        { theme: "dark" }
      );
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <input
          type="text"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have account?{" "}
          <span>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup here..
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
