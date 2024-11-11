import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { markAttendance } from "../../api/faceRecognitionAPI"; // New API function

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [previousDatesTimes, setPreviousDatesTimes] = useState([]); // State for previous dates and times

  // Capture image from webcam
  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      return new File([blob], "capture.jpg", { type: "image/jpeg" });
    }
    return null;
  };

  // Mark attendance for the user
  const handleMarkAttendance = async () => {
    setIsWebcamActive(true);
  };

  const submitAttendance = async () => {
    setLoading(true);
    const imageFile = await captureImage();
    if (imageFile) {
      const result = await markAttendance(imageFile);
      if (result.error) {
        setError(result.error);
      } else {
        setResult(result);
        setPreviousDatesTimes(result.previous_dates_times); // Update previous dates and times
      }
    }
    setLoading(false);
    setIsWebcamActive(false);
  };

  return (
    <div>
      <h2>Mark Attendance</h2>

      <button onClick={handleMarkAttendance}>Open Webcam</button>

      {isWebcamActive && (
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={submitAttendance} disabled={loading}>
            {loading ? "Marking Attendance..." : "Capture & Mark Attendance"}
          </button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Attendance Marked</h3>
          <p>{`Name: ${result.attendance.name}`}</p>
          <p>{`Roll No: ${result.attendance.rollNo}`}</p>
          <p>{`Time: ${result.attendance.time}`}</p>
          <p>{`Date: ${result.attendance.date}`}</p>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
