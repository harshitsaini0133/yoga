import React, { useEffect, useState } from "react";
import { createLead, deleteLead, getLeads, updateLead } from "../api/lead.api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
  });

  // ================= Fetch Leads =================
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data || res);
    } catch (err) {
      console.error("Fetch leads error:", err);
    }
  };

  // ================= Create Lead =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Name and Phone are required");
      return;
    }

    try {
      await createLead(formData);

      setFormData({
        name: "",
        phone: "",
        email: "",
        source: "",
      });

      setShowForm(false);
      fetchLeads();
    } catch (err) {
      console.error("Create lead error:", err);
    }
  };

  // ================= Convert Lead =================
  const convertLead = async (id) => {
    try {
      await updateLead(id, { status: "Converted" });
      fetchLeads();
    } catch (err) {
      console.error("Convert error:", err);
    }
  };

  // ================= Delete =================
  const removeLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= Filters =================
  const filters = ["All", "New", "Contacted", "Converted"];

  const filteredLeads = leads
    .filter((lead) => {
      if (activeFilter === "All") return true;
      return lead.status === activeFilter;
    })
    .filter((lead) => {
      return (
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search)
      );
    });

  const statusStyle = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Converted: "bg-green-100 text-green-700",
  };

  // ================= UI =================
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Leads</h2>
          <p className="text-gray-500 text-sm">
            Manage and track incoming leads
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-3">Add New Lead</h3>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Name *"
              className="border p-2 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              placeholder="Phone *"
              className="border p-2 rounded"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="border p-2 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              placeholder="Source"
              className="border p-2 rounded"
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
            />

            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-4">
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

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search name / phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No leads found
                </td>
              </tr>
            )}

            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{lead.name}</td>

                <td className="p-4 text-gray-600">{lead.phone}</td>

                <td className="p-4 text-gray-600">{lead.email || "-"}</td>

                <td className="p-4 text-gray-600">{lead.source || "-"}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusStyle[lead.status || "New"]
                    }`}
                  >
                    {lead.status || "New"}
                  </span>
                </td>

                <td className="p-4 space-x-3">
                  <button
                    onClick={() => convertLead(lead.id)}
                    className="text-green-600 text-sm"
                  >
                    Convert
                  </button>

                  <button
                    onClick={() => removeLead(lead.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
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

export default Leads;
