import React, { useEffect, useState } from "react";
import { createAdmin, getAllAdmins } from "../api/superAdmin.api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "SUPPORT_ADMIN",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAllAdmins();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async () => {
    try {
      setLoading(true);

      const data = await createAdmin(form);

      // 🔥 Instantly update UI
      setUsers((prev) => [...prev, data]);

      // Reset form
      setForm({
        email: "",
        password: "",
        role: "",
      });

      setShowModal(false);
    } catch (err) {
      console.error("Create failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="text-gray-500 text-sm">Manage system users and roles</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{user.email}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && !loading && (
          <p className="p-6 text-center text-gray-500">No users found.</p>
        )}
      </div>

      {/* 🔥 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Create Admin User</h3>

            {/* Name */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option value="SUPPORT_ADMIN">Support</option>
                <option value="SALES_ADMIN">Sales</option>
                <option value="TRAINER">Trainer</option>
                <option value="DIETICIAN">Dietician</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateAdmin}
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

export default Users;
