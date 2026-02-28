import React, { useEffect, useState } from "react";
import { getAllZoomMeetings } from "../api/zoom.api";

const Attendance = () => {
  const [allSessions, setAllSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // Fetch all Zoom meetings
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const meetings = await getAllZoomMeetings();
        setAllSessions(meetings);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Filter sessions by selected date
  const sessionsForDate = allSessions
    .filter((s) => {
      const meetingDate = new Date(s.startTime).toISOString().split("T")[0];
      return meetingDate === selectedDate;
    })
    .map((s) => {
      const dateObj = new Date(s.startTime);
      return {
        id: s.id,
        user: s.createdBy, // Replace with actual user name if available
        sessionType: s.topic,
        time: dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status:
          s.status === "completed"
            ? "Present"
            : s.status === "waiting" && dateObj < new Date()
              ? "Absent"
              : "Upcoming",
      };
    });

  const presentCount = sessionsForDate.filter(
    (s) => s.status === "Present",
  ).length;
  const absentCount = sessionsForDate.filter(
    (s) => s.status === "Absent",
  ).length;

  // Toggle attendance status locally
  const toggleStatus = (id) => {
    setAllSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          // If waiting → mark completed
          const newStatus = s.status === "completed" ? "waiting" : "completed";
          return { ...s, status: newStatus };
        }
        return s;
      }),
    );
  };

  if (loading) return <div>Loading attendance...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Attendance</h2>
          <p className="text-gray-500 text-sm">
            Track daily session attendance
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Sessions</p>
          <h3 className="text-xl font-semibold">{sessionsForDate.length}</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Present</p>
          <h3 className="text-xl font-semibold text-green-600">
            {presentCount}
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Absent</p>
          <h3 className="text-xl font-semibold text-red-600">{absentCount}</h3>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Session Type</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessionsForDate.map((session) => (
              <tr key={session.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{session.user}</td>
                <td className="p-4 text-gray-600">{session.sessionType}</td>
                <td className="p-4 text-gray-600">{session.time}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      session.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : session.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="p-4">
                  {session.status !== "Upcoming" && (
                    <button
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => toggleStatus(session.id)}
                    >
                      Toggle Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
