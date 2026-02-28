import React, { useEffect, useState } from "react";
import { createAdmin, getAllAdmins } from "../api/superAdmin.api";

const CreateAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SALES_ADMIN",
  });

  // Fetch all admins/users
  const fetchAdmins = async () => {
    try {
      const res = await getAllAdmins();
      setAdmins(res || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create user/admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      form.role = form.role.toUpperCase();
      await createAdmin(form);

      alert("User created successfully ✅");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "SALES_ADMIN",
      });

      fetchAdmins();
    } catch (err) {
      console.error("Create user failed", err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create User / Admin</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="admin">SALES_ADMIN</option>
            <option value="superadmin">TRAINER</option>
            <option value="dietician">DIETICIAN</option>
            <option value="user">USER</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "8px 16px" }}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      {/* Users List */}
      <h2>All Users / Admins</h2>

      {admins.length === 0 && <p>No users found</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {admins.map((admin) => (
          <li
            key={admin.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{admin.name}</strong>
              <div style={{ fontSize: "14px", color: "gray" }}>
                {admin.email}
              </div>
            </div>

            <span>{admin.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateAdmin;
