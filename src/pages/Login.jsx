import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiredTime = localStorage.getItem("expiredTime");
    if (!token || !expiredTime) return;
    if (new Date() >= new Date(expiredTime)) {
      localStorage.clear();
      return;
    }
    navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await api.post("/auth/login", { mail, password });
        const { data } = res.data;
        const { currentUserId, role, token, expiredTime } = data;

        dispatch(setCredentials({ token, id: currentUserId, name: role }));

        localStorage.setItem("token", token);
        localStorage.setItem("id", currentUserId);
        localStorage.setItem("name", role);
        localStorage.setItem("expiredTime", expiredTime);

        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
    [mail, password, dispatch, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-950 px-4">
      <div className="w-full max-w-md bg-paper-100 rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl text-paper-90 font-bold mb-8 text-center">
          Welcome Back
        </h1>

        {error && (
          <div
            role="alert"
            className="bg-red-700 text-paper-90 text-sm p-3 rounded mb-5 text-center"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-paper-70 mb-2 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black-800 text-paper-90 placeholder-paper-50 focus:outline-none focus:ring-2 focus:ring-midnight-700 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-paper-70 mb-2 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-black-800 text-paper-90 placeholder-paper-50 focus:outline-none focus:ring-2 focus:ring-midnight-700 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-paper-50 hover:text-paper-90 focus:outline-none focus:ring-2 focus:ring-midnight-700 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-1 bg-midnight-900 hover:bg-midnight-800 text-paper-90 font-semibold rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-midnight-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-paper-50 text-center mt-6 text-sm select-none">
          © 2026 YourCRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
