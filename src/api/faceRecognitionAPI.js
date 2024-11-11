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

export const markAttendance = async (image, rollNo) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("rollNo", rollNo);

    const response = await fetch("/api/mark_attendance", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data; // Return response data (success or error message)
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error; // Rethrow error for further handling
  }
};
