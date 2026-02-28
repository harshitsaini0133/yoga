import React, { useEffect, useState } from "react";
import { getMyAssignedUsers } from "../api/dietician";

const AssignedUsers = () => {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assigned users from API
  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const users = await getMyAssignedUsers(); // Should return array like [{id, name, plan, subscriptionStatus, nextSession}]
        setAssignedUsers(users);
      } catch (err) {
        console.error("Failed to fetch assigned users:", err);
        setError("Failed to load assigned users.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedUsers();
  }, []);

  const statusStyle = {
    Active: "bg-green-100 text-green-700",
    Expired: "bg-red-100 text-red-700",
  };

  if (loading) return <div className="p-6">Loading assigned users...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!assignedUsers.length)
    return <div className="p-6 text-gray-500">No users assigned yet.</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Assigned Users</h2>
        <p className="text-gray-500 text-sm">
          Users assigned to you for sessions and follow-ups
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Subscription</th>
              <th className="p-4">Next Session</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignedUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">
                  {user.name || `User ${user.id}`}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {user.plan || "N/A"}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusStyle[user.subscriptionStatus] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.subscriptionStatus || "Unknown"}
                  </span>
                </td>

                <td className="p-4 text-gray-600">{user.nextSession || "—"}</td>

                <td className="p-4 space-x-3">
                  <button className="text-blue-600 text-sm hover:underline">
                    View
                  </button>
                  <button className="text-green-600 text-sm hover:underline">
                    Start Session
                  </button>
                  <button className="text-purple-600 text-sm hover:underline">
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedUsers;
