import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ManagaUsers from "./pages/ManagaUsers";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";
import ClassDetails from "./pages/ClassDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Notfound from "./components/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./features/user/userSlice";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    axios.get("/")
  }, [])

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/manageusers" element={<ManagaUsers />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/classdetails/:id" element={<ClassDetails />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
