import React, { useEffect, useState } from "react";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscription.api";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // used only for editing
    name: "",
    durationInDays: "", // will convert to number
    price: "", // will convert to decimal in backend
    sessions: "", // optional
    dieticianSupport: false,
    liveClasses: false,
  });

  // Fetch subscriptions from backend
  const fetchSubscriptions = async () => {
    try {
      const res = await getSubscriptions();
      // console.log("data is", data);
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data with proper types
      const payload = {
        name: formData.name,
        durationInDays: Number(formData.durationInDays),
        price: formData.price, // backend converts to Decimal
        sessions: formData.sessions ? Number(formData.sessions) : null,
        dieticianSupport: formData.dieticianSupport,
        liveClasses: formData.liveClasses,
      };

      if (formData.id) {
        await updateSubscription(formData.id, payload);
      } else {
        await createSubscription(payload); // ⚠️ do NOT send id
      }

      setFormOpen(false);
      setFormData({
        id: null,
        name: "",
        durationInDays: "",
        price: "",
        sessions: "",
        dieticianSupport: false,
        liveClasses: false,
      });

      fetchSubscriptions();
    } catch (err) {
      console.error("Error saving subscription:", err);
    }
  };

  // Edit subscription
  const handleEdit = (sub) => {
    setFormData({
      id: sub.id,
      name: sub.name,
      durationInDays: sub.durationInDays.toString(),
      price: sub.price.toString(),
      sessions: sub.sessions?.toString() ?? "",
      dieticianSupport: sub.dieticianSupport,
      liveClasses: sub.liveClasses,
    });
    setFormOpen(true);
  };

  // Delete subscription
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await deleteSubscription(id);
        fetchSubscriptions();
      } catch (err) {
        console.error("Error deleting subscription:", err);
      }
    }
  };

  if (loading) return <div>Loading subscriptions...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Subscriptions</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setFormOpen(true)}
      >
        Add Subscription
      </button>

      {/* Subscription Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Duration (Days)</th>
              <th className="p-4">Price</th>
              <th className="p-4">Sessions</th>
              <th className="p-4">Dietician Support</th>
              <th className="p-4">Live Classes</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{sub.name}</td>
                <td className="p-4">{sub.durationInDays}</td>
                <td className="p-4">₹{sub.price}</td>
                <td className="p-4">{sub.sessions ?? "-"}</td>
                <td className="p-4">{sub.dieticianSupport ? "Yes" : "No"}</td>
                <td className="p-4">{sub.liveClasses ? "Yes" : "No"}</td>
                <td className="p-4 space-x-2">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => handleEdit(sub)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => handleDelete(sub.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal/Form */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {formData.id ? "Edit Subscription" : "Add Subscription"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Subscription Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="durationInDays"
                placeholder="Duration (Days)"
                value={formData.durationInDays}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="sessions"
                placeholder="Sessions (optional)"
                value={formData.sessions}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="dieticianSupport"
                  checked={formData.dieticianSupport}
                  onChange={handleChange}
                />
                <span>Dietician Support</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="liveClasses"
                  checked={formData.liveClasses}
                  onChange={handleChange}
                />
                <span>Live Classes</span>
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
                  {formData.id ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
