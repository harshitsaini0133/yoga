import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Leads from "./pages/Leads";
import Subscriptions from "./pages/Subscriptions";
import OnboardingCalls from "./pages/OnboardingCalls";
import MySessions from "./pages/MySessions";
import Attendance from "./pages/Attendance";
import AssignedUsers from "./pages/AssignedUsers";
import DietPlans from "./pages/DietPlans";
import TrackProgress from "./pages/TrackProgress";
import Chats from "./pages/Chats";
import Tickets from "./pages/Tickets";
import ChatLogs from "./pages/ChatLogs";
import ZoomSession from "./pages/ZoomSession";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import AssignDietician from "./pages/AssignDietician";
import CreateAdmin from "./pages/CreateAdmin";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-zoom-session" element={<ZoomSession />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/onboarding" element={<OnboardingCalls />} />
          <Route path="/sessions" element={<MySessions />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/assigned-users" element={<AssignedUsers />} />
          <Route path="/diet-plans" element={<DietPlans />} />
          <Route path="/progress" element={<TrackProgress />} />
          <Route path="/diet-chat" element={<Chats />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/chat-logs" element={<ChatLogs />} />

          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/assign" element={<AssignDietician />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
