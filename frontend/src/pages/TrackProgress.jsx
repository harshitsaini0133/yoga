import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TrackProgress = () => {
  const [selectedUser, setSelectedUser] = useState("Priya Sharma");

  const users = ["Priya Sharma", "Rahul Verma", "Sneha Kapoor"];

  const progressData = [
    { date: "Week 1", weight: 75 },
    { date: "Week 2", weight: 73.5 },
    { date: "Week 3", weight: 72 },
    { date: "Week 4", weight: 70.8 },
  ];

  const latestWeight = progressData[progressData.length - 1].weight;
  const initialWeight = progressData[0].weight;
  const totalLoss = (initialWeight - latestWeight).toFixed(1);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Track Progress</h2>
        <p className="text-gray-500 text-sm">
          Monitor user transformation and performance metrics
        </p>
      </div>

      {/* User Selector */}
      <div className="mb-6">
        <label className="text-sm text-gray-600 block mb-2">Select User</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          {users.map((user) => (
            <option key={user}>{user}</option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Initial Weight</p>
          <h3 className="text-xl font-semibold">{initialWeight} kg</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Current Weight</p>
          <h3 className="text-xl font-semibold">{latestWeight} kg</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Weight Loss</p>
          <h3 className="text-xl font-semibold text-green-600">
            {totalLoss} kg
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-4">Weight Progress</h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Notes</h3>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>✔ User improved consistency in workouts.</li>
          <li>✔ Diet adherence increased to 90%.</li>
          <li>✔ Cardio sessions extended by 10 minutes.</li>
        </ul>
      </div>
    </div>
  );
};

export default TrackProgress;
