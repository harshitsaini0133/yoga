import React from "react";
import { Link, useLocation } from "react-router-dom";

// Get role from localStorage / Auth Context / API
// Example: localStorage.setItem("role", "sales_admin");
const getUserRole = () => {
  //   return localStorage.getItem("role"); // Change if using Auth Context
  //   return "sales_admin";
  return "super_admin";
};

const menuItems = [
  // Super Admin
  {
    name: "Dashboard",
    path: "/",
    roles: ["super_admin"],
  },
  {
    name: "All Users",
    path: "/users",
    roles: ["super_admin"],
  },
  {
    name: "Analytics",
    path: "/analytics",
    roles: ["super_admin"],
  },

  // Sales Admin
  {
    name: "Leads",
    path: "/leads",
    roles: ["sales_admin", "super_admin"],
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
    roles: ["sales_admin", "super_admin"],
  },
  {
    name: "Onboarding Calls",
    path: "/onboarding",
    roles: ["sales_admin", "super_admin"],
  },

  // Trainer
  {
    name: "My Sessions",
    path: "/sessions",
    roles: ["trainer", "super_admin"],
  },
  {
    name: "Attendance",
    path: "/attendance",
    roles: ["trainer", "super_admin"],
  },
  {
    name: "Assigned Users",
    path: "/assigned-users",
    roles: ["trainer", "super_admin"],
  },

  // Dietician
  {
    name: "Diet Plans",
    path: "/diet-plans",
    roles: ["dietician", "super_admin"],
  },
  {
    name: "Progress Tracking",
    path: "/progress",
    roles: ["dietician", "super_admin"],
  },
  {
    name: "Chat with Users",
    path: "/diet-chat",
    roles: ["dietician", "super_admin"],
  },

  // Support Admin
  {
    name: "Tickets",
    path: "/tickets",
    roles: ["support_admin", "super_admin"],
  },
  {
    name: "Chat Logs",
    path: "/chat-logs",
    roles: ["support_admin", "super_admin"],
  },
  {
    name: "Resolutions",
    path: "/resolutions",
    roles: ["support_admin", "super_admin"],
  },
  {
    name: "Assign Dietician",
    path: "/assign",
    roles: ["support_admin", "super_admin"],
  },
  {
    name: "Create Admin",
    path: "/create-admin",
    roles: ["super_admin"],
  },
  {
    name: "schedule zoom meeting",
    path: "/create-zoom-session",
    roles: ["super_admin"],
  },
];

const SideBar = () => {
  const role = getUserRole();
  const location = useLocation();

  // Filter menu based on role
  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <div style={styles.sidebar} className="overflow-auto">
      {/* Logo / Title */}
      <div style={styles.logo}>
        <h2>Yoga Admin</h2>
        <p style={styles.role}>{role?.replace("_", " ")}</p>
      </div>

      {/* Menu */}
      <ul style={styles.menu}>
        {filteredMenu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item.path}
                style={{
                  ...styles.link,
                  backgroundColor: isActive ? "#2c3e50" : "transparent",
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div style={styles.logout}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

// Logout function
const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

// Inline Styles
const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#1e272e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "fixed",
    left: 0,
    top: 0,
  },

  logo: {
    padding: "20px",
    textAlign: "center",
    borderBottom: "1px solid #34495e",
  },

  role: {
    fontSize: "12px",
    color: "#aaa",
    marginTop: "5px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
  },

  link: {
    display: "block",
    padding: "15px 20px",
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s",
  },

  logout: {
    padding: "20px",
    borderTop: "1px solid #34495e",
  },

  logoutBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#e74c3c",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default SideBar;
