import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import {
  registerFace,
  recognizeFace,
  getAttendanceReport,
} from "../api/faceRecognitionAPI";

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);

  // Fetch and display the attendance report
  // Ensure result and user_id are defined before using them
  const handleAttendanceReport = async () => {
    if (!result || !result.user_id) {
      setError(
        "User ID is not available. Please ensure the user is recognized before viewing the report."
      );
      return;
    }

    const userId = result.user_id;
    const report = await getAttendanceReport(userId);

    if (report.error) {
      setError(report.error);
    } else {
      setAttendanceHistory(report.attendance_history);
      setShowReport(true);
    }
  };

  // Capture image from webcam
  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      return new File([blob], "capture.jpg", { type: "image/jpeg" });
    }
    return null;
  };

  // Register a new user with captured face
  const handleRegister = async () => {
    if (!name || !rollNo || !role) {
      setError("Please enter all details.");
      return;
    }

    setError(null);
    setIsWebcamActive(true);
    setIsRegisterMode(true);
  };

  const submitRegistration = async () => {
    setLoading(true);
    const imageFile = await captureImage();
    if (imageFile) {
      const result = await registerFace(imageFile, name, rollNo, role);
      if (result.error) {
        setError(result.error);
      } else {
        setIsWebcamActive(false); // Close webcam immediately after successful registration
        setLoading(false); // Stop loading spinner immediately
        setName("");
        setRollNo("");
        setRole("");

        // Add a small delay to ensure webcam closes before showing the alert
        setTimeout(() => {
          alert(result.message || "Registration successful");
        }, 500);
      }
    } else {
      setLoading(false);
    }
  };

  // Recognize an existing user
  const handleRecognize = async () => {
    setIsWebcamActive(true);
    setIsRegisterMode(false);
  };

  const submitRecognition = async () => {
    setLoading(true);
    const imageFile = await captureImage();
    if (imageFile) {
      const result = await recognizeFace(imageFile);
      if (result.error) {
        setError(result.error);
      } else {
        setResult(result);
      }
    }
    setLoading(false);
    setIsWebcamActive(false);
  };

  return (
    <div>
      <h2>{isRegisterMode ? "Register Your Face" : "Mark Attendance"}</h2>

      {isRegisterMode ? (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button onClick={handleRegister}>Register Face</button>
        </>
      ) : (
        <button onClick={handleRecognize}>Mark Attendance</button>
      )}

      <button onClick={() => setIsRegisterMode(!isRegisterMode)}>
        {isRegisterMode
          ? "Switch to Attendance Mode"
          : "Switch to Registration Mode"}
      </button>

      {isWebcamActive && (
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          {isRegisterMode ? (
            <button onClick={submitRegistration} disabled={loading}>
              {loading ? "Registering..." : "Capture & Register"}
            </button>
          ) : (
            <button onClick={submitRecognition} disabled={loading}>
              {loading ? "Recognizing..." : "Capture & Mark Attendance"}
            </button>
          )}
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Recognition Result</h3>
          <p>{result.message}</p>
          <p>{`Name: ${result.name || "Unknown"}, Role: ${
            result.role || "Unknown"
          }`}</p>
        </div>
      )}

      <div>
        <button onClick={handleAttendanceReport}>View Attendance Report</button>

        {showReport && (
          <div>
            <h3>Attendance Report</h3>
            <ul>
              {attendanceHistory.map((record, index) => (
                <li key={index}>
                  Date: {record.date}, Time: {record.time}, Name: {record.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
