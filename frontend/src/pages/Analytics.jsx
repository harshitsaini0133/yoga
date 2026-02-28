import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getAnalytics } from "../api/analytics.api";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (!analytics) return <div className="p-6">No analytics data found.</div>;

  // KPI Cards
  const kpis = [
    { title: "Total Users", value: analytics.totalUsers, icon: "👤" },
    { title: "Active Trainers", value: analytics.totalTrainers, icon: "🏋️" },
    { title: "Sales Admins", value: analytics.salesAdmins, icon: "💼" },
    { title: "Dieticians", value: analytics.dieticians, icon: "🥗" },
  ];

  // Pie chart data for roles
  const roleData = [
    { name: "Users", value: analytics.totalUsers, color: "#3b82f6" },
    { name: "Trainers", value: analytics.totalTrainers, color: "#10b981" },
    { name: "Sales Admins", value: analytics.salesAdmins, color: "#f59e0b" },
    { name: "Dieticians", value: analytics.dieticians, color: "#ef4444" },
  ];

  // Sample line chart data (can be dynamic later)
  const chartData = [
    { month: "Jan", users: 50 },
    { month: "Feb", users: 120 },
    { month: "Mar", users: 200 },
    { month: "Apr", users: 260 },
    { month: "May", users: 320 },
    { month: "Jun", users: 400 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <p className="text-gray-500 mt-1">
          Overview of users, trainers, and staff performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm">{kpi.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{kpi.value}</h3>
            </div>
            <div className="text-3xl">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">User Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Role Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
