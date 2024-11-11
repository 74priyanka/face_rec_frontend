import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StyledHeader } from "./style";
import face_recognition from "../../assets/face_recognition.png";
import MarkAttendance from "../MarkAttendance/MarkAttendance";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/"); // Redirect to the home page after logging out
  };

  // Function to render login/signup or welcome message
  const renderConditionalLinks = () => {
    if (username) {
      return (
        <>
          <li className="li-item">Hi, {username}</li>
          <li>
            <button onClick={handleLogout} className="li-item logout-btn">
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <button
              onClick={() => navigate("/login")} // Navigate to login page
              className="li-item"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signup")} // Navigate to signup page
              className="li-item"
            >
              Signup
            </button>
          </li>
        </>
      );
    }
  };

  const navigateToAttendanceReport = () => {
    navigate("/attendance-report"); // Use navigate to go to the new page
  };

  return (
    <StyledHeader>
      <div className="logo-container">
        <img src={face_recognition} alt="Face Recognition" className="logo" />
      </div>
      <div className="nav-items">
        <ul className="nav-items-list">
          <li>
            <NavLink to="/" activeClassName="active" className="li-item">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active" className="li-item">
              About
            </NavLink>
          </li>
          {renderConditionalLinks()}
        </ul>

        <MarkAttendance />
        <div>
          <button onClick={navigateToAttendanceReport}>
            View Attendance History
          </button>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
