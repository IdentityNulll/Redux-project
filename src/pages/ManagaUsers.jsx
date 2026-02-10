import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FiEdit2, FiTrash2, FiKey } from "react-icons/fi";
import AddUserModal from "../components/AddUserModal";
import CustomSelect from "../components/CustomSelect";

function ManageUsers() {
  const {
    list: users,
    loading,
    totalElements,
    totalPages,
    page,
  } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      u.mail.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <p className="text-sm text-[var(--text-muted)]">Loading users…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            User Management
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {totalElements} users total
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm hover:opacity-90"
        >
          <IoMdAdd />
          Add User
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <CustomSelect
          className="w-28"
          value={roleFilter}
          onChange={setRoleFilter}
          options={[
            { value: "", label: "All roles" },
            { value: "ADMIN", label: "Admin" },
            { value: "TEACHER", label: "Teacher" },
            { value: "STUDENT", label: "Student" },
          ]}
        />
      </div>

      <div className="bg-[var(--bg-card)] rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4 text-left">User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u, i) => (
                <tr key={i} className="border-t hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-semibold">
                      {u.firstName[0]}
                      {u.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium">
                        {u.firstName} {u.lastName}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        @{u.username}
                      </p>
                    </div>
                  </td>

                  <td>{u.mail}</td>

                  <td>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                      {u.role}
                    </span>
                  </td>

                  <td className="text-right p-4 space-x-3">
                    <button className="text-amber-600 hover:text-amber-800">
                      <FiKey />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-slate-600">
        <span>
          Page {page + 1} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-slate-100">
            Prev
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-slate-100">
            Next
          </button>
        </div>
      </div>

      {openAdd && <AddUserModal onClose={() => setOpenAdd(false)} />}
    </div>
  );
}

export default ManageUsers;
