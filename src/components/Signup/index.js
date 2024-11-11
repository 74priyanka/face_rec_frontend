import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledSignup } from "./style";
import Header from "../Header";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/signup", {
      // Updated Flask URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/login"); // Redirect to login page after signup
    } else {
      const errorData = await response.json();
      alert("Signup failed: " + errorData.message);
    }
  };

  return (
    <StyledSignup>
      <div className="container">
        <h2>Signup</h2>
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
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </StyledSignup>
  );
};

export default SignupPage;
