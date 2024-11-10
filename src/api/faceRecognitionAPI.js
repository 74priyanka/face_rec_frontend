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

export const getAttendanceReport = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/attendance_report`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    return { error: "Failed to fetch attendance report" };
  }
};
