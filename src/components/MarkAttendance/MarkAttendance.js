import React, { useState } from "react";
import Webcam from "react-webcam";
import { markAttendance } from "../../api/faceRecognitionAPI"; // Import API function

const MarkAttendance = ({ rollNo }) => {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const webcamRef = React.useRef(null);

  const captureAndMarkAttendance = async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam

    if (imageSrc) {
      // Convert the captured image to a blob
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const file = new File([blob], "attendance_capture.jpg", {
        type: "image/jpeg",
      });

      // Call the markAttendance API
      try {
        const response = await markAttendance(file, rollNo); // Send file and rollNo to API
        alert(response.message || response.error); // Display success or error message
        setIsWebcamOpen(false); // Close the webcam after marking attendance
      } catch (error) {
        alert("Error marking attendance:", error); // Handle any errors
      }
    }
  };

  return (
    <div>
      <button onClick={() => setIsWebcamOpen(true)}>Mark Attendance</button>

      {isWebcamOpen && (
        <div>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={captureAndMarkAttendance}>Capture & Submit</button>
          <button onClick={() => setIsWebcamOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
