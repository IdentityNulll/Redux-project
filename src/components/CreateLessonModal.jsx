import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import api from "../api/axios";

const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
];

const PERIODS = [
  { value: "FIRST", label: "Period 1" },
  { value: "SECOND", label: "Period 2" },
  { value: "THIRD", label: "Period 3" },
  { value: "FOURTH", label: "Period 4" },
  { value: "FIFTH", label: "Period 5" },
];

function CreateLessonModal({ open, onClose, teachers, classes, onCreated }) {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const teacherOptions = teachers.map((t) => ({
    value: t.id,
    label: `${t.firstName} ${t.lastName}`,
  }));

  const classOptions = classes.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/lessons", {
        classId,
        name,
        teacherId,
        dayOfWeek,
        period,
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="w-full max-w-md rounded-xl p-6"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          Create Lesson
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Lesson name */}
          <input
            type="text"
            placeholder="Lesson name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "var(--border-color)" }}
            required
          />

          {/* Teacher */}
          <CustomSelect
            value={teacherId}
            onChange={setTeacherId}
            options={teacherOptions}
            placeholder="Select Teacher"
          />

          {/* Class */}
          <CustomSelect
            value={classId}
            onChange={setClassId}
            options={classOptions}
            placeholder="Select Class"
          />

          {/* Day */}
          <CustomSelect
            value={dayOfWeek}
            onChange={setDayOfWeek}
            options={DAYS}
            placeholder="Select Day"
          />

          {/* Period */}
          <CustomSelect
            value={period}
            onChange={setPeriod}
            options={PERIODS}
            placeholder="Select Period"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: "var(--border-color)" }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-white"
              style={{ background: "var(--color-primary)" }}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLessonModal;