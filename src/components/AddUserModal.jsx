import React, { useState } from "react";
import api from "../api/axios";
import CustomSelect from "./CustomSelect";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";


function AddUserModal({ onClose }) {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    birthday: "",
    password: "",
    classId: "",
  });

  const dispath = useDispatch()
  const {page, size} = useSelector((state) => state.users)

  const { list: classes, loading } = useSelector((state) => state.classes);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getEndpoint = () => {
    if (role === "ADMIN") return "/admin";
    if (role === "TEACHER") return "/teachers";
    if (role === "STUDENT") return "/student";
  };

  const handleSubmit = async () => {
    const payload = { ...form, role };
    await api.post(getEndpoint(), payload);

    dispath(fetchUsers({page,size}))

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add User</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <CustomSelect
          className="w-full"
          value={role}
          onChange={setRole}
          options={[
            { value: "ADMIN", label: "Admin" },
            { value: "TEACHER", label: "Teacher" },
            { value: "STUDENT", label: "Student" },
          ]}
        />

        {role && (
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              className="border px-3 py-2 rounded-xl"
            />
            <input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              className="border px-3 py-2 rounded-xl"
            />
            <input
              name="mail"
              placeholder="Email"
              onChange={handleChange}
              className="border px-3 py-2 rounded-xl col-span-2"
            />
            <input
              name="birthday"
              placeholder="Birthday"
              onChange={handleChange}
              className="border px-3 py-2 rounded-xl"
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              className="border px-3 py-2 rounded-xl"
            />
            {role === "STUDENT" && (
              <CustomSelect
                className="w-full"
                value={form.classId}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, classId: value }))
                }

                options={classes.map((cls) => ({
                  value: cls.uuid,
                  label : cls.name
                }))}
              />
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!role}
            className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
