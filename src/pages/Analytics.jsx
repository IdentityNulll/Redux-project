import React from "react";
import {
  IoMdTrendingUp,
  IoMdPeople,
  IoMdSchool,
  IoMdCalendar,
} from "react-icons/io";

function Analytics() {
  const monthlyAttendance = [
    { month: "Sep", value: 75 },
    { month: "Oct", value: 82 },
    { month: "Nov", value: 78 },
    { month: "Dec", value: 90 },
    { month: "Jan", value: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <section className="bg-[var(--bg-card)] rounded-[var(--radius)] p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Analytics Overview
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Monitor performance and attendance insights
          </p>
        </div>
        <div className="text-sm text-[var(--text-muted)]">
          Academic Year 2025
        </div>
      </section>

      {/* ===== KPI Cards ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Students",
            value: "248",
            icon: <IoMdPeople />,
          },
          {
            label: "Active Classes",
            value: "12",
            icon: <IoMdSchool />,
          },
          {
            label: "Lessons This Month",
            value: "64",
            icon: <IoMdCalendar />,
          },
          {
            label: "Avg. Attendance",
            value: "84%",
            icon: <IoMdTrendingUp />,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[var(--bg-card)] rounded-[var(--radius)] p-5 flex items-center gap-4 border border-[var(--border-color)]"
          >
            <div className="text-3xl text-[var(--color-secondary)]">
              {item.icon}
            </div>
            <div>
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== Charts Section ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-[var(--radius)] p-6 border border-[var(--border-color)]">
          <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-6">
            Monthly Attendance Rate
          </h2>

          <div className="flex items-end justify-between h-52 gap-4">
            {monthlyAttendance.map((item) => (
              <div
                key={item.month}
                className="flex flex-col items-center w-full"
              >
                <div className="relative w-full bg-slate-100 rounded-md h-full flex items-end">
                  <div
                    className="w-full bg-[var(--color-secondary)] rounded-md transition-all"
                    style={{ height: `${item.value}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-2 text-[var(--text-muted)]">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <aside className="bg-[var(--bg-card)] rounded-[var(--radius)] p-6 border border-[var(--border-color)] space-y-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Performance Summary
          </h2>

          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">
              Overall Attendance
            </p>
            <div className="w-full bg-slate-100 h-3 rounded-full">
              <div
                className="bg-[var(--color-secondary)] h-3 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-[var(--text-muted)]">
              84%
            </p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">
              Student Engagement
            </p>
            <div className="w-full bg-slate-100 h-3 rounded-full">
              <div
                className="bg-[var(--color-accent)] h-3 rounded-full"
                style={{ width: "72%" }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-[var(--text-muted)]">
              72%
            </p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">
              Assignment Completion
            </p>
            <div className="w-full bg-slate-100 h-3 rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: "91%" }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-[var(--text-muted)]">
              91%
            </p>
          </div>
        </aside>
      </section>

      {/* ===== Recent Activity ===== */}
      <section className="bg-[var(--bg-card)] rounded-[var(--radius)] p-6 border border-[var(--border-color)]">
        <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            "Class 10A reached 95% attendance this week.",
            "New student joined Mathematics 9B.",
            "Physics midterm results published.",
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-[var(--border-color)] pb-3 last:border-none"
            >
              <div className="w-2 h-2 mt-2 bg-[var(--color-secondary)] rounded-full"></div>
              <p className="text-sm text-[var(--text-muted)]">{activity}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Analytics;
