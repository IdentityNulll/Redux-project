import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FiEdit2, FiTrash2, FiKey } from "react-icons/fi";
import AddUserModal from "../components/AddUserModal";
import CustomSelect from "../components/CustomSelect";
import Loading from "../components/Loading";

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
    return <Loading/>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
            User Management
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {totalElements} users total
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm hover:opacity-90"
        >
          <IoMdAdd />
          Add User
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <CustomSelect
          className="w-full sm:w-28"
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

      {/* MOBILE LIST */}
      {/* MOBILE LIST */}
      <div className="md:hidden space-y-4">
        {filteredUsers.length === 0 ? (
          <p className="p-4 text-center text-slate-400">No users found</p>
        ) : (
          filteredUsers.map((u, i) => (
            <div
              key={i}
              className="bg-[var(--bg-card)] border rounded-2xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
            >
              {/* USER INFO */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-semibold uppercase">
                  {u.firstName?.[0]}
                  {u.lastName?.[0]}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[var(--color-primary)]">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    @{u.username}
                  </p>
                </div>
              </div>

              {/* EMAIL & ROLE */}
              <div className="flex flex-col gap-1 text-sm text-[var(--text-muted)]">
                <span>Email: {u.mail}</span>
                <span>Role: {u.role}</span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 mt-2 justify-end">
                <button
                  title="Reset password"
                  className="text-amber-600 hover:text-amber-800"
                >
                  <FiKey />
                </button>
                <button
                  title="Edit user"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit2 />
                </button>
                <button
                  title="Delete user"
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-[var(--bg-card)] rounded-2xl border overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-right">Actions</th>
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
                  {/* USER */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-semibold uppercase">
                        {u.firstName?.[0]}
                        {u.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-medium">
                          {u.firstName} {u.lastName}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          @{u.username}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="p-4">{u.mail}</td>

                  {/* ROLE */}
                  <td className="p-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                      {u.role}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button
                        title="Reset password"
                        aria-label="Reset Password"
                        className="text-amber-600 hover:text-amber-800"
                      >
                        <FiKey />
                      </button>
                      <button
                        title="Edit user"
                        aria-label="Edit user"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        title="Delete user"
                        aria-label="Delete User"
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-slate-600 flex-wrap gap-2">
        <span>
          Page {page + 1} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-slate-100" aria-label="Previous">
            Prev
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-slate-100" aria-label="Next">
            Next
          </button>
        </div>
      </div>

      {openAdd && <AddUserModal onClose={() => setOpenAdd(false)} />}
    </div>
  );
}

export default ManageUsers;
