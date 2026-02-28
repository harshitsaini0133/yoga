import React, { useEffect, useState } from "react";
import { getAnalytics } from "../api/analytics.api";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock recent activity
  const [recentActivity, setRecentActivity] = useState([
    "New Sales Member Added",
    "Yoga Trainer Profile Updated",
    "Support Ticket Resolved",
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!analytics)
    return <div className="p-6">No analytics data available.</div>;

  const stats = [
    { title: "Total Users", value: analytics.totalUsers, icon: "👤" },
    { title: "Yoga Trainers", value: analytics.totalTrainers, icon: "🏋️" },
    { title: "Sales Admins", value: analytics.salesAdmins, icon: "💼" },
    { title: "Dieticians", value: analytics.dieticians, icon: "🥗" },
    { title: "Support Tickets", value: analytics.tickets, icon: "🎫" }, // placeholder
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Welcome, Nishant</h2>
        <p className="text-gray-500 mt-1">Role: SUPER_ADMIN</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="bg-white shadow-md rounded-xl p-6">
          <ul className="list-disc list-inside space-y-2">
            {recentActivity.map((activity, idx) => (
              <li key={idx} className="text-gray-700">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
