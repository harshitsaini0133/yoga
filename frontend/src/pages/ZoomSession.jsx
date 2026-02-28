import React, { useEffect, useState } from "react";
import { createZoomMeeting, getAllZoomMeetings } from "../api/zoom.api";
import { getSubscriptions } from "../api/subscription.api"; // import your API

const ZoomSession = () => {
  const [meetings, setMeetings] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    topic: "",
    startTime: "",
    duration: "",
    subscriptionId: "", // for course selection
  });

  // Fetch meetings on load
  useEffect(() => {
    fetchMeetings();
    fetchSubscriptions();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const data = await getAllZoomMeetings();
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateMeeting = async () => {
    if (!form.subscriptionId) {
      alert("Please select a course/subscription");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        topic: form.topic,
        startTime: form.startTime,
        duration: Number(form.duration),
        subscriptionId: Number(form.subscriptionId),
      };

      const newMeeting = await createZoomMeeting(payload);

      // Add new meeting to UI
      setMeetings((prev) => [...prev, newMeeting]);

      // Reset form
      setForm({
        topic: "",
        startTime: "",
        duration: "",
        subscriptionId: "",
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error creating meeting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Zoom Sessions</h2>
          <p className="text-gray-500 text-sm">
            Manage and schedule Zoom meetings
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Meeting
        </button>
      </div>

      {loading && <p className="text-blue-600 text-sm mb-4">Loading...</p>}

      {/* Meetings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Topic</th>
              <th className="p-4">Start Time</th>
              <th className="p-4">Duration (mins)</th>
              <th className="p-4">Course</th>
              <th className="p-4">Join Link</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{meeting.topic}</td>
                <td className="p-4 text-gray-600">
                  {new Date(meeting.startTime).toLocaleString()}
                </td>
                <td className="p-4 text-gray-600">{meeting.duration}</td>
                <td className="p-4 text-gray-600">
                  {subscriptions.find((s) => s.id === meeting.subscriptionId)
                    ?.name || "-"}
                </td>
                <td className="p-4">
                  <a
                    href={meeting.startUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Join
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {meetings.length === 0 && !loading && (
          <p className="p-6 text-center text-gray-500">
            No meetings scheduled.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Create Zoom Meeting</h3>

            <div className="mb-3">
              <label className="text-sm text-gray-600">Topic</label>
              <input
                type="text"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="text-sm text-gray-600">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="text-sm text-gray-600">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">
                Course / Subscription
              </label>
              <select
                name="subscriptionId"
                value={form.subscriptionId}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option value="">Select a course</option>
                {subscriptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMeeting}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomSession;
