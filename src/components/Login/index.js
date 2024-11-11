import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledLogin } from "./style";
import Header from "../Header";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      // Updated Flask URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Ensures session cookies are handled
    });

    if (response.ok) {
      localStorage.setItem("username", username);
      navigate("/attendance"); // Redirect to attendance page
    } else {
      const errorData = await response.json();
      alert("Login failed: " + errorData.message);
    }
  };

  return (
    <StyledLogin>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Signup here</a>.
        </p>
      </div>
    </StyledLogin>
  );
};

export default LoginPage;
