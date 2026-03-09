import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../features/lessons/lessons";
import CreateLessonModal from "../components/CreateLessonModal";
import Loading from "../components/Loading";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = [
  { id: 1, label: "Period 1" },
  { id: 2, label: "Period 2" },
  { id: 3, label: "Period 3" },
  { id: 4, label: "Period 4" },
  { id: 5, label: "Period 5" },
];

const DAY_MAP = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
};

const PERIOD_MAP = {
  FIRST: "Period 1",
  SECOND: "Period 2",
  THIRD: "Period 3",
  FOURTH: "Period 4",
  FIFTH: "Period 5",
};

function Schedule() {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lessons.list || []);
  const loading = useSelector((state) => state.lessons.loading);
  const [openModal, setOpenModal] = useState(false);
  const students = useSelector((state) => state.student);
  const teachers = useSelector((state) => state.teachers.teachers);
  const classes = useSelector((state) => state.classes.list);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const scheduleMap = React.useMemo(() => {
    const map = {};
    DAYS.forEach((day) => (map[day] = {}));
    lessons.forEach((lesson) => {
      const day = DAY_MAP[lesson.dayOfWeek];
      const period = PERIOD_MAP[lesson.period];

      if (!day || !period) return;

      map[day][period] = lesson;
    });
    return map;
  }, [lessons]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            Weekly Schedule
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            View your lessons by period
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 rounded-lg text-white"
          style={{ background: "var(--color-primary)" }}
        >
          + Add Lesson
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-[var(--border-color)]">
          <caption className="sr-only">
            Weekly schedule showing periods and lessons
          </caption>
          <thead>
            <tr>
              <th className="border p-2 bg-[var(--bg-card)]"></th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className={`border p-2 text-center ${
                    day === today
                      ? "bg-[var(--color-secondary)] text-white font-semibold"
                      : "bg-[var(--bg-card)]"
                  }`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period) => (
              <tr key={period.id}>
                <th className="border p-2 bg-[var(--bg-card)] text-center">
                  {period.label}
                </th>
                {DAYS.map((day) => {
                  const lesson = scheduleMap[day][period.label];
                  return (
                    <td
                      key={day}
                      className={`border p-2 min-h-[60px] text-center rounded-md transition-colors ${
                        day === today
                          ? "bg-[var(--color-secondary)] text-white font-semibold"
                          : "bg-[var(--bg-card)]"
                      }`}
                      aria-label={
                        lesson
                          ? `${lesson.name} ${day} ${period.label}`
                          : `${period.label} on ${day} empty`
                      }
                    >
                      {lesson
                        ? `${lesson.name}`
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {DAYS.map((day) => (
          <div
            key={day}
            className={`bg-[var(--bg-card)] rounded-[var(--radius)] p-4 border ${
              day === today ? "ring-2 ring-[var(--color-secondary)]" : ""
            }`}
          >
            <h2 className="font-semibold text-[var(--color-primary)] mb-2">
              {day}
            </h2>
            <div className="space-y-2">
              {PERIODS.map((period) => {
                const lesson = scheduleMap[day][period.label];
                return (
                  <div
                    key={period.id}
                    className="flex justify-between items-center bg-slate-100 p-2 rounded-md"
                  >
                    <span className="font-medium">{period.label}</span>
                    <span className="text-[var(--text-muted)]">
                      {lesson
                        ? `${lesson.name}`
                        : "-"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <CreateLessonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        teachers={teachers}
        classes={classes}
        onCreated={() => dispatch(fetchLessons())}
      />
    </div>
  );
}

export default Schedule;
