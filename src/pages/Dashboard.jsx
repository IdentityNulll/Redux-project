import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IoMdPeople,
  IoMdAnalytics,
  IoMdSchool,
  IoMdCheckboxOutline,
} from "react-icons/io";
import Clock from "../components/Clock";

function Dashboard() {
  const { list: classes, loading: classesLoading } = useSelector(
    (state) => state.classes,
  );

  const { list: attendanceList, loading: attendanceLoading } = useSelector(
    (state) => state.attendance,
  );

  const totalClasses = classes.length;
  const totalStudents = classes.reduce(
    (sum, cls) => sum + (cls.studentCount || 0),
    0,
  );

  const missingStudents = attendanceList
    .filter((item) => item.reasonType === "ABSENT")
    .slice(0, 4);

  const missingStudentsCount = missingStudents.length;

  const formatReason = (reason) => {
    if (!reason) return "No reason";
    return reason
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between bg-[var(--bg-card)] rounded-[var(--radius)] p-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Welcome back
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your classes and track attendance
          </p>
        </div>

        <div className="hidden md:block text-right">
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
            label: "Missing Students",
            value: missingStudentsCount,
            icon: <IoMdCheckboxOutline />,
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

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-[var(--radius)] p-6">
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
                  className="rounded-[var(--radius)] p-4 flex border items-center justify-between hover:bg-slate-50 transition"
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

        {/* Missing Students */}
        <aside className="bg-[var(--bg-card)] rounded-[var(--radius)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Missing Students
          </h2>

          {attendanceLoading ? (
            <p className="text-sm text-[var(--text-muted)]">
              Loading attendance…
            </p>
          ) : missingStudents.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">
              No missing students for now
            </p>
          ) : (
            missingStudents.map((item) => {
              const student = item.studentResponseDto;

              return (
                <div
                  key={item.attendanceId}
                  className="flex items-center border justify-between bg-slate-50 rounded-lg p-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {student?.firstName} {student?.lastName}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] truncate">
                      {formatReason(item.reason)}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.reasonType === "ABSENT"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.reasonType}
                  </span>
                </div>
              );
            })
          )}
        </aside>
      </section>
    </div>
  );
}

export default Dashboard;
