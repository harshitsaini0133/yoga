import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 ">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
