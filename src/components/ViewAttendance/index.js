import React, { useState } from "react";
import axios from "axios";

const ViewAttendance = () => {
  const [name, setName] = useState("");
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleViewAttendanceClick = () => {
    setIsInputVisible(true); // Show input field when button is clicked
  };

  const fetchAttendanceHistory = async () => {
    if (!name) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.get(`/get-attendance-history?name=${name}`);
      setAttendanceHistory(response.data); // Save the response to state
    } catch (err) {
      setError("Failed to fetch attendance history");
      setAttendanceHistory([]); // Clear previous attendance history
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>View Attendance History</h2>
      <button onClick={handleViewAttendanceClick}>
        View Attendance History
      </button>

      {isInputVisible && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
          <button onClick={fetchAttendanceHistory}>Fetch Attendance</button>
        </div>
      )}

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && attendanceHistory.length > 0 && (
        <div>
          <h3>Attendance Details for {name}</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.roll_no}</td>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && attendanceHistory.length === 0 && name && (
        <p>No attendance records found for {name}</p>
      )}
    </div>
  );
};

export default ViewAttendance;
