import React, { useEffect, useState } from "react";
import { getMyZoomMeetings } from "../api/zoom.api";
import { getSubscriptions } from "../api/subscription.api";

const MySessions = () => {
  const [myMeetings, setMyMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Upcoming");

  // Fetch meetings from API
  useEffect(() => {
    const fetchMyZoomMeetings = async () => {
      try {
        const meetings = await getMyZoomMeetings();
        setMyMeetings(meetings);
      } catch (err) {
        console.error("Failed to fetch meetings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyZoomMeetings();
  }, []);

  // Filters
  const filters = ["Upcoming", "Completed", "Missed"];
  const statusStyle = {
    Upcoming: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Missed: "bg-red-100 text-red-700",
  };

  // Convert Zoom API data to display-friendly format
  const sessions = myMeetings.map((meeting) => {
    const dateObj = new Date(meeting.startTime);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let status = "Upcoming";
    const now = new Date();
    if (meeting.status === "waiting" && dateObj < now) status = "Missed";
    if (meeting.status === "completed") status = "Completed";

    return {
      id: meeting.id,
      topic: meeting.topic,
      date: formattedDate,
      time: formattedTime,
      status,
      joinUrl: meeting.joinUrl,
      startUrl: meeting.startUrl,
    };
  });

  const filteredSessions = sessions.filter(
    (session) => session.status === activeFilter,
  );

  if (loading) return <div>Loading sessions...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">My Sessions</h2>
        <p className="text-gray-500 text-sm">
          Manage your assigned training sessions
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Sessions Cards */}
      {filteredSessions.length === 0 ? (
        <p className="text-gray-500">No sessions in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{session.topic}</h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    statusStyle[session.status]
                  }`}
                >
                  {session.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm">
                📅 {session.date} | ⏰ {session.time}
              </p>

              <div className="mt-4 flex gap-3">
                {session.status === "Upcoming" && (
                  <a
                    href={session.joinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Join Session
                  </a>
                )}
                {session.status !== "Upcoming" && (
                  <span className="text-gray-500 text-sm">
                    Session Finished
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;
