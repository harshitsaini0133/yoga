// import React, { useEffect, useState } from "react";
// import { getAllUsers } from "../api/user.api";
// import {
//   createDietPlan,
//   getDietPlans,
//   updateDietPlan,
//   deleteDietPlan,
// } from "../api/dietplan.api";

// const mealSections = ["morning", "afternoon", "evening", "night", "snacks"];

// const AssignDietPlan = () => {
//   // --- State ---
//   const [plans, setPlans] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const initialFormState = {
//     assignedTo: "",
//     title: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     caloriesPerDay: "",
//     proteinPerDay: "",
//     carbsPerDay: "",
//     fatPerDay: "",
//     notes: "",
//     meals: { morning: [], afternoon: [], evening: [], night: [], snacks: [] },
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   // --- Initialization ---
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       const [usersData, plansData] = await Promise.all([
//         getAllUsers(),
//         getDietPlans(), // Assuming this API exists
//       ]);
//       setUsers(usersData);
//       setPlans(plansData);
//     } catch (err) {
//       console.error("Fetch failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers ---
//   const handleEdit = (plan) => {
//     setEditingId(plan.id);
//     setFormData({
//       ...plan,
//       assignedTo: plan.assignedTo.id || plan.assignedTo, // Handle object or ID
//       startDate: plan.startDate ? plan.startDate.split("T")[0] : "",
//       endDate: plan.endDate ? plan.endDate.split("T")[0] : "",
//     });
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this plan?")) return;
//     try {
//       await deleteDietPlan(id);
//       setPlans(plans.filter((p) => p.id !== id));
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const payload = {
//       ...formData,
//       assignedTo: Number(formData.assignedTo),
//       startDate: formData.startDate ? new Date(formData.startDate) : null,
//       endDate: formData.endDate ? new Date(formData.endDate) : null,
//     };

//     try {
//       if (editingId) {
//         await updateDietPlan(editingId, payload);
//       } else {
//         await createDietPlan(payload);
//       }
//       setIsFormOpen(false);
//       setEditingId(null);
//       setFormData(initialFormState);
//       loadInitialData(); // Refresh list
//     } catch (err) {
//       alert("Save failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- Helper Components ---
//   const MealInput = ({ section }) => (
//     <div className="bg-gray-50 p-3 rounded-lg border mb-3">
//       <div className="flex justify-between items-center mb-2">
//         <h4 className="capitalize font-bold text-gray-700">{section}</h4>
//         <button
//           type="button"
//           onClick={() =>
//             setFormData((prev) => ({
//               ...prev,
//               meals: {
//                 ...prev.meals,
//                 [section]: [...prev.meals[section], { item: "", quantity: "" }],
//               },
//             }))
//           }
//           className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
//         >
//           + Add Item
//         </button>
//       </div>
//       {formData.meals[section].map((m, i) => (
//         <div key={i} className="flex gap-2 mb-2">
//           <input
//             className="flex-1 text-sm border p-1 rounded"
//             placeholder="Item"
//             value={m.item}
//             onChange={(e) => {
//               const updated = [...formData.meals[section]];
//               updated[i].item = e.target.value;
//               setFormData({
//                 ...formData,
//                 meals: { ...formData.meals, [section]: updated },
//               });
//             }}
//           />
//           <input
//             className="w-24 text-sm border p-1 rounded"
//             placeholder="Qty"
//             value={m.quantity}
//             onChange={(e) => {
//               const updated = [...formData.meals[section]];
//               updated[i].quantity = e.target.value;
//               setFormData({
//                 ...formData,
//                 meals: { ...formData.meals, [section]: updated },
//               });
//             }}
//           />
//           <button
//             type="button"
//             onClick={() => {
//               const updated = formData.meals[section].filter(
//                 (_, idx) => idx !== i,
//               );
//               setFormData({
//                 ...formData,
//                 meals: { ...formData.meals, [section]: updated },
//               });
//             }}
//             className="text-red-400 hover:text-red-600 px-1"
//           >
//             ✕
//           </button>
//         </div>
//       ))}
//     </div>
//   );

//   if (loading)
//     return <div className="p-10 text-center">Loading Diet Plans...</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Diet Plans</h1>
//           <p className="text-gray-500">
//             Manage and assign nutritional schedules
//           </p>
//         </div>
//         {!isFormOpen && (
//           <button
//             onClick={() => {
//               setEditingId(null);
//               setFormData(initialFormState);
//               setIsFormOpen(true);
//             }}
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             + Create New Plan
//           </button>
//         )}
//       </div>

//       {isFormOpen ? (
//         /* FORM VIEW */
//         <div className="bg-white border rounded-xl shadow-sm p-6">
//           <div className="flex justify-between items-center mb-6 border-b pb-4">
//             <h2 className="text-xl font-semibold">
//               {editingId ? "Edit Plan" : "New Diet Plan"}
//             </h2>
//             <button
//               onClick={() => setIsFormOpen(false)}
//               className="text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               ✕
//             </button>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             {/* Left Column: Details */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-1">
//                   Assign to User *
//                 </label>
//                 <select
//                   name="assignedTo"
//                   value={formData.assignedTo}
//                   onChange={(e) =>
//                     setFormData({ ...formData, assignedTo: e.target.value })
//                   }
//                   className="w-full border p-2 rounded-md bg-white"
//                   required
//                 >
//                   <option value="">Choose a user...</option>
//                   {users.map((u) => (
//                     <option key={u.id} value={u.id}>
//                       {u.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">
//                   Plan Title *
//                 </label>
//                 <input
//                   className="w-full border p-2 rounded-md"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   placeholder="e.g. Weight Loss Phase 1"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     className="w-full border p-2 rounded-md"
//                     value={formData.startDate}
//                     onChange={(e) =>
//                       setFormData({ ...formData, startDate: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     className="w-full border p-2 rounded-md"
//                     value={formData.endDate}
//                     onChange={(e) =>
//                       setFormData({ ...formData, endDate: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="number"
//                   placeholder="Calories"
//                   className="border p-2 rounded-md"
//                   value={formData.caloriesPerDay}
//                   onChange={(e) =>
//                     setFormData({ ...formData, caloriesPerDay: e.target.value })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Protein (g)"
//                   className="border p-2 rounded-md"
//                   value={formData.proteinPerDay}
//                   onChange={(e) =>
//                     setFormData({ ...formData, proteinPerDay: e.target.value })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Carbs (g)"
//                   className="border p-2 rounded-md"
//                   value={formData.carbsPerDay}
//                   onChange={(e) =>
//                     setFormData({ ...formData, carbsPerDay: e.target.value })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Fats (g)"
//                   className="border p-2 rounded-md"
//                   value={formData.fatPerDay}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fatPerDay: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             {/* Right Column: Meals */}
//             <div className="h-[500px] overflow-y-auto pr-2">
//               <label className="block text-sm font-semibold mb-3">
//                 Meal Breakdown
//               </label>
//               {mealSections.map((section) => (
//                 <MealInput key={section} section={section} />
//               ))}
//             </div>

//             <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-6 border-t">
//               <button
//                 type="button"
//                 onClick={() => setIsFormOpen(false)}
//                 className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 {submitting
//                   ? "Saving..."
//                   : editingId
//                     ? "Update Plan"
//                     : "Create Plan"}
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         /* LIST VIEW */
//         <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="p-4 font-semibold text-sm text-gray-600">
//                   User
//                 </th>
//                 <th className="p-4 font-semibold text-sm text-gray-600">
//                   Plan Title
//                 </th>
//                 <th className="p-4 font-semibold text-sm text-gray-600">
//                   Start Date
//                 </th>
//                 <th className="p-4 font-semibold text-sm text-gray-600 text-right">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan) => (
//                 <tr
//                   key={plan.id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4">
//                     <div className="font-medium">
//                       {users.find((user) => user.id === plan.assignedTo)
//                         ?.name || "N/A"}
//                     </div>
//                     <div className="text-xs text-gray-400">
//                       {users.find((user) => user.id === plan.assignedTo)?.email}
//                     </div>
//                   </td>
//                   <td className="p-4 font-medium text-blue-600">
//                     {plan.title}
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">
//                     {plan.startDate
//                       ? new Date(plan.startDate).toLocaleDateString()
//                       : "Not set"}
//                   </td>
//                   <td className="p-4 text-right">
//                     <button
//                       onClick={() => handleEdit(plan)}
//                       className="text-blue-600 hover:underline mr-4 text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(plan.id)}
//                       className="text-red-600 hover:underline text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {plans.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-10 text-center text-gray-400">
//                     No diet plans found. Create one to get started!
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default DietPlanManager;

// export default AssignDietPlan;

import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/user.api";
import {
  createDietPlan,
  getDietPlans,
  updateDietPlan,
  deleteDietPlan,
} from "../api/dietplan.api";

const mealSections = ["morning", "afternoon", "evening", "night", "snacks"];

/** * 🔥 FIX 1: Move Helper Components OUTSIDE to prevent focus loss
 */
const MealInput = ({ section, meals, setFormData }) => {
  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [section]: [...prev.meals[section], { item: "", quantity: "" }],
      },
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData((prev) => {
      const updatedSection = [...prev.meals[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return {
        ...prev,
        meals: { ...prev.meals, [section]: updatedSection },
      };
    });
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [section]: prev.meals[section].filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg border mb-3">
      <div className="flex justify-between items-center mb-2">
        <h4 className="capitalize font-bold text-gray-700">{section}</h4>
        <button
          type="button"
          onClick={handleAddItem}
          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
        >
          + Add Item
        </button>
      </div>
      {meals[section].map((m, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="flex-1 text-sm border p-1 rounded"
            placeholder="Item"
            value={m.item}
            onChange={(e) => updateItem(i, "item", e.target.value)}
          />
          <input
            className="w-24 text-sm border p-1 rounded"
            placeholder="Qty"
            value={m.quantity}
            onChange={(e) => updateItem(i, "quantity", e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="text-red-400 hover:text-red-600 px-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

const AssignDietPlan = () => {
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialFormState = {
    assignedTo: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    caloriesPerDay: "",
    proteinPerDay: "",
    carbsPerDay: "",
    fatPerDay: "",
    notes: "",
    meals: { morning: [], afternoon: [], evening: [], night: [], snacks: [] },
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [usersData, plansData] = await Promise.all([
        getAllUsers(),
        getDietPlans(),
      ]);
      setUsers(usersData);
      setPlans(plansData);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setFormData({
      ...plan,
      assignedTo: plan.assignedTo?.id || plan.assignedTo,
      startDate: plan.startDate ? plan.startDate.split("T")[0] : "",
      endDate: plan.endDate ? plan.endDate.split("T")[0] : "",
      // Ensure nutritional values are strings for the input fields
      caloriesPerDay: plan.caloriesPerDay?.toString() || "",
      proteinPerDay: plan.proteinPerDay?.toString() || "",
      carbsPerDay: plan.carbsPerDay?.toString() || "",
      fatPerDay: plan.fatPerDay?.toString() || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDietPlan(id);
      setPlans(plans.filter((p) => p.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    /** * 🔥 FIX 2: Convert Strings to Numbers for Prisma
     */
    const payload = {
      ...formData,
      assignedTo: Number(formData.assignedTo),
      caloriesPerDay: Number(formData.caloriesPerDay) || 0,
      proteinPerDay: Number(formData.proteinPerDay) || 0,
      carbsPerDay: Number(formData.carbsPerDay) || 0,
      fatPerDay: Number(formData.fatPerDay) || 0,
      startDate: formData.startDate ? new Date(formData.startDate) : null,
      endDate: formData.endDate ? new Date(formData.endDate) : null,
    };

    try {
      if (editingId) {
        await updateDietPlan(editingId, payload);
      } else {
        await createDietPlan(payload);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData(initialFormState);
      loadInitialData();
    } catch (err) {
      console.error(err);
      alert("Save failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Diet Plans</h1>
          <p className="text-gray-500">Manage nutritional schedules</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => {
              setEditingId(null);
              setFormData(initialFormState);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            + Create New Plan
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 border-b pb-4">
            {editingId ? "Edit Plan" : "New Diet Plan"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Assign to User *
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedTo: e.target.value })
                  }
                  className="w-full border p-2 rounded-md bg-white"
                  required
                >
                  <option value="">Choose a user...</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Plan Title *
                </label>
                <input
                  className="w-full border p-2 rounded-md"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs">Start Date</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded-md"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded-md"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Calories"
                  className="border p-2 rounded-md"
                  value={formData.caloriesPerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, caloriesPerDay: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  className="border p-2 rounded-md"
                  value={formData.proteinPerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, proteinPerDay: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  className="border p-2 rounded-md"
                  value={formData.carbsPerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, carbsPerDay: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Fats (g)"
                  className="border p-2 rounded-md"
                  value={formData.fatPerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, fatPerDay: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="h-[500px] overflow-y-auto pr-2">
              <label className="block text-sm font-semibold mb-3">
                Meal Breakdown
              </label>
              {mealSections.map((section) => (
                <MealInput
                  key={section}
                  section={section}
                  meals={formData.meals}
                  setFormData={setFormData}
                />
              ))}
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg"
              >
                {submitting ? "Saving..." : "Save Plan"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List View remains essentially same, using .find() to map user name */
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Start Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {users.find((u) => u.id === plan.assignedTo)?.name ||
                      "User #" + plan.assignedTo}
                  </td>
                  <td className="p-4 font-medium text-blue-600">
                    {plan.title}
                  </td>
                  <td className="p-4">
                    {plan.startDate
                      ? new Date(plan.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="text-blue-600 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignDietPlan;
