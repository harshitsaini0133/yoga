import React, { useEffect, useState } from "react";
import { getAllDieticians } from "../api/dietician";
import {
  assignDietician,
  getAssignedDieticians,
  updateAssignedDietician,
  deleteAssignedDietician,
} from "../api/assigndietician";
import { getAllUsers } from "../api/user.api";

const AssignDietician = () => {
  const [users, setUsers] = useState([]);
  const [dieticians, setDieticians] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // null = create, number = update
    userId: "",
    dieticianId: "",
  });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [usersData, dieticiansData, assignmentsData] = await Promise.all([
        getAllUsers(),
        getAllDieticians(),
        getAssignedDieticians(),
      ]);

      console.log(usersData, dieticiansData, assignmentsData);
      setUsers(usersData);
      setDieticians(dieticiansData);
      setAssignments(assignmentsData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateAssignedDietician(formData.id, {
          userId: Number(formData.userId),
          dieticianId: Number(formData.dieticianId),
        });
      } else {
        await assignDietician({
          userId: Number(formData.userId),
          dieticianId: Number(formData.dieticianId),
        });
      }
      setFormOpen(false);
      setFormData({ id: null, userId: "", dieticianId: "" });
      fetchData();
    } catch (err) {
      console.error("Error saving assignment:", err);
    }
  };

  // Edit assignment
  const handleEdit = (assignment) => {
    setFormData({
      id: assignment.id,
      userId: assignment.userId,
      dieticianId: assignment.dieticianId,
    });
    setFormOpen(true);
  };

  // Delete assignment
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      try {
        await deleteAssignedDietician(id);
        fetchData();
      } catch (err) {
        console.error("Error deleting assignment:", err);
      }
    }
  };

  if (loading) return <div className="p-6">Loading assignments...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Assign Dieticians</h2>
        <button
          onClick={() => setFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Assign Dietician
        </button>
      </div>

      {/* Assignments Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Dietician</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length ? (
              assignments.map((assignment) => {
                const user = users.find((u) => u.id === assignment.userId);
                const dietician = dieticians.find(
                  (d) => d.id === assignment.dieticianId,
                );
                return (
                  <tr key={assignment.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{user?.name || "N/A"}</td>
                    <td className="p-4">{dietician?.name || "N/A"}</td>
                    <td className="p-4 space-x-3">
                      <button
                        onClick={() => handleEdit(assignment)}
                        className="text-green-600 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {formData.id ? "Edit Assignment" : "Assign Dietician"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">
                <span className="text-gray-700 text-sm">Select User *</span>
                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="">-- Select User --</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 text-sm">
                  Select Dietician *
                </span>
                <select
                  name="dieticianId"
                  value={formData.dieticianId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="">-- Select Dietician --</option>
                  {dieticians.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {formData.id ? "Update" : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignDietician;
