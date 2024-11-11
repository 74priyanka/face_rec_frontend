import axios from "axios";

const API_URL = "http://localhost:5000/api";

// api/faceRecognitionAPI.js

export const registerFace = async (imageFile, name, rollNo, role) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("name", name);
  formData.append("rollNo", rollNo);
  formData.append("role", role);

  try {
    const response = await fetch(`${API_URL}/register`, {
      // Updated to use API_URL
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in registration:", error);
    return { error: "Registration failed" };
  }
};

export const recognizeFace = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(`${API_URL}/recognize`, {
      // Updated to use API_URL
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in recognition:", error);
    return { error: "Recognition failed" };
  }
};

// faceRecognitionAPI.js

export const markAttendance = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("http://localhost:5000/api/mark-attendance", {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error in marking attendance:", error);
    return { error: "Attendance marking failed" };
  }
};

export const getAttendanceReport = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/attendance-report?name=${name}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    return { error: "Failed to retrieve attendance report" };
  }
};
