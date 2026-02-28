import React, { useEffect, useState } from "react";
import {
  getOnboardingCalls,
  createOnboardingCall,
  updateOnboardingCall,
  deleteOnboardingCall,
} from "../api/onboardingcalls";
import { getAllUsers } from "../api/user.api";

const statusOptions = ["SCHEDULED", "COMPLETED", "MISSED", "RESCHEDULED"];

const OnboardingCalls = () => {
  const [calls, setCalls] = useState([]);
  const [users, setUsers] = useState([]); // Platform users
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [formData, setFormData] = useState({
    id: null,
    userId: "", // Changed from userName to userId for platform integrity
    userName: "",
    userPhNo: "",
    date: "",
    time: "",
    status: "SCHEDULED",
  });

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const [callsData, usersData] = await Promise.all([
        getOnboardingCalls(),
        getAllUsers(),
      ]);
      setCalls(callsData);
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= HANDLERS ================= */

  // When selecting a user from the platform
  const handleUserSelect = (e) => {
    const selectedUserId = e.target.value;
    const user = users.find((u) => u.id === Number(selectedUserId));

    if (user) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id,
        userName: user.name,
        userPhNo: user.phone || user.phoneNumber || "", // adjust based on your API key
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        userId: "",
        userName: "",
        userPhNo: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure date and time are combined correctly
      const scheduledDateTime = new Date(`${formData.date}T${formData.time}`);

      const payload = {
        userId: Number(formData.userId), // Link to actual user ID
        userName: formData.userName,
        userPhNo: formData.userPhNo,
        date: scheduledDateTime.toISOString(),
        status: formData.status,
      };

      if (formData.id) {
        await updateOnboardingCall(formData.id, payload);
      } else {
        await createOnboardingCall(payload);
      }

      closeModal();
      fetchData();
    } catch (err) {
      console.error("Error saving call:", err);
      alert("Failed to save call. Please check the data.");
    }
  };

  const handleEdit = (call) => {
    const callDate = new Date(call.date);
    const dateStr = callDate.toISOString().split("T")[0];
    const timeStr = callDate.toTimeString().split(" ")[0].substring(0, 5);

    setFormData({
      id: call.id,
      userId: call.userId || "",
      userName: call.userName,
      userPhNo: call.userPhNo,
      date: dateStr,
      time: timeStr,
      status: call.status,
    });
    setFormOpen(true);
  };

  const closeModal = () => {
    setFormOpen(false);
    setFormData({
      id: null,
      userId: "",
      userName: "",
      userPhNo: "",
      date: "",
      time: "",
      status: "SCHEDULED",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this call?")) {
      try {
        await deleteOnboardingCall(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  /* ================= FILTERING ================= */
  const filters = ["All", ...statusOptions];
  const filteredCalls =
    activeFilter === "All"
      ? calls
      : calls.filter((c) => c.status === activeFilter);

  const statusStyle = {
    SCHEDULED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    MISSED: "bg-red-100 text-red-700",
    RESCHEDULED: "bg-yellow-100 text-yellow-700",
  };

  if (loading)
    return <div className="p-10 text-center">Loading platform data...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Onboarding Calls</h2>
          <p className="text-gray-500">
            Manage sessions for registered platform users
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
          onClick={() => setFormOpen(true)}
        >
          + Schedule Platform Call
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-gray-800 text-white"
                : "bg-white border text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold">Scheduled Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCalls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <span className="font-semibold text-gray-800">
                    {call.userName}
                  </span>
                </td>
                <td className="p-4 text-gray-600 font-mono text-sm">
                  {call.userPhNo}
                </td>
                <td className="p-4 text-gray-600">
                  <div className="text-sm font-medium">
                    {new Date(call.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(call.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyle[call.status]}`}
                  >
                    {call.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => handleEdit(call)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(call.id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCalls.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No calls found for this filter.
          </div>
        )}
      </div>

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-1">
              {formData.id ? "Update Call" : "Schedule Call"}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Only registered users can be scheduled.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* SELECT USER FROM PLATFORM */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Select User
                </label>
                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleUserSelect}
                  className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">-- Choose User --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* PHONE (AUTO-FILLED) */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.userPhNo}
                  className="w-full p-2.5 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  placeholder="Auto-filled from user profile"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                >
                  {formData.id ? "Save Changes" : "Confirm Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingCalls;
