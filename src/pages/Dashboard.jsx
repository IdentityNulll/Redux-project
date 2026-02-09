import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  IoMdPeople,
  IoMdCalendar,
  IoMdAnalytics,
  IoMdSchool,
} from "react-icons/io";
import Clock from "../components/Clock";

function Dashboard() {
  const { list: classes, loading: classesLoading } = useSelector(
    (state) => state.classes,
  );
  const { today: todayLessons, loading: lessonsLoading } = useSelector(
    (state) => state.lessons,
  );

  const totalClasses = classes.length;
  console.log(totalClasses);
  const totalStudents = classes.reduce((sum, cls) => sum + cls.studentCount, 0);
  const todaysLessonsCount = todayLessons.length;

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between bg-[var(--bg-card)] rounded-[var(--radius)] p-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Welcome back 👋
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your classes and track attendance
          </p>
        </div>

        <div className="text-right">
          <Clock />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Classes",
            value: totalClasses,
            icon: <IoMdSchool />,
          },
          {
            label: "Total Students",
            value: totalStudents,
            icon: <IoMdPeople />,
          },
          {
            label: "Today's Lessons",
            value: todaysLessonsCount,
            icon: <IoMdCalendar />,
          },
          {
            label: "Attendance Rate",
            value: "—",
            icon: <IoMdAnalytics />,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[var(--bg-card)] rounded-[var(--radius)] p-5 flex items-center gap-4"
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

      {/* ===== Classes + Quick Stats ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes */}
        <div className="lg:col-span-2 bg-[var(--bg-card)]  rounded-[var(--radius)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              My Classes
            </h2>
            <Link
              to="/manageusers"
              className="text-sm text-[var(--color-secondary)] hover:underline"
            >
              View all
            </Link>
          </div>

          {classesLoading ? (
            <p className="text-sm text-[var(--text-muted)]">Loading classes…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <div
                  key={cls.uuid}
                  className=" rounded-[var(--radius)] p-4 flex border items-center justify-between hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-semibold">
                      {cls.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {cls.studentCount} students
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <aside className="bg-[var(--bg-card)]  rounded-[var(--radius)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Today's Lessons
          </h2>

          {lessonsLoading ? (
            <p className="text-sm text-[var(--text-muted)]">Loading lessons…</p>
          ) : todayLessons.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">
              No lessons today 🎉
            </p>
          ) : (
            todayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center border justify-between bg-slate-50 rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">{lesson.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {lesson.teacher.firstName} {lesson.teacher.lastName}
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {lesson.period}
                </span>
              </div>
            ))
          )}
        </aside>
      </section>
    </div>
  );
}

export default Dashboard;
