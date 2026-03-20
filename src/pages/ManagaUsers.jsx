import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FiEdit2, FiTrash2, FiKey } from "react-icons/fi";
import AddUserModal from "../components/AddUserModal";
import CustomSelect from "../components/CustomSelect";
import Loading from "../components/Loading";
import { fetchUsers } from "../features/users/usersSlice";
import Tooltip from "../components/Tooltip";
import { toast } from "react-toastify";
import api from "../api/axios";

function ManageUsers() {
  const {
    list: users,
    loading,
    totalElements,
    totalPages,
    page,
    size,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    mail: "",
    role: "",
  });
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers({ page: 0, size }));
  }, [dispatch, size]);

  useEffect(() => {
    if (page + 2 < totalPages) {
      dispatch(fetchUsers({ page: page + 1, size }));
    }
  }, [page, totalPages, size, dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        u.mail.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter ? u.role === roleFilter : true;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleNext = () => {
    if (page + 1 < totalPages) {
      dispatch(fetchUsers({ page: page + 1, size }));
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      dispatch(fetchUsers({ page: page - 1, size }));
    }
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username || "",
      mail: user.mail || "",
      role: user.role || "",
    });
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!selectedUser?.id) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      setSubmittingEdit(true);

      const payload = {
        firstName: editForm.firstName.trim(),
        lastName: editForm.lastName.trim(),
        username: editForm.username.trim(),
        mail: editForm.mail.trim(),
        role: editForm.role,
      };

      await api.put(`/user/update/${selectedUser.id}`, payload);

      toast.success("User updated successfully!");
      setOpenEdit(false);
      setSelectedUser(null);

      dispatch(fetchUsers({ page, size }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update user.");
    } finally {
      setSubmittingEdit(false);
    }
  };

  const getDeleteEndpoint = (user) => {
    console.log(user.id)
    switch (user.role) {
      case "TEACHER":
        return `/teachers/${user.id}`;
      case "STUDENT":
        return `/student/${user.id}`;
      case "ADMIN":
        return `/admin/${user.id}`;
      default:
        return null;
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );

    if (!confirmed) return;

    const endpoint = getDeleteEndpoint(user);

    if (!endpoint) {
      toast.error("Unknown user role. Cannot delete.");
      return;
    }

    try {
      setDeletingId(user.id);

      await api.delete(endpoint);

      toast.success("User deleted successfully!");

      const nextPage =
        users.length === 1 && page > 0 ? page - 1 : page;

      dispatch(fetchUsers({ page: nextPage, size }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleResetPassword = () => {
    toast.info("Reset password endpoint is not available yet.");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
          className="flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:opacity-90"
        >
          <IoMdAdd />
          Add User
        </button>
      </div>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:w-64"
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

      <div className="space-y-4 md:hidden">
        {filteredUsers.length === 0 ? (
          <p className="p-4 text-center text-slate-400">No users found</p>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u.id}
              className="flex flex-col gap-2 rounded-2xl border bg-[var(--bg-card)] p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)] font-semibold uppercase text-white">
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

              <div className="flex flex-col gap-1 text-sm text-[var(--text-muted)]">
                <span>Email: {u.mail}</span>
                <span>Role: {u.role}</span>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  title="Reset password"
                  className="cursor-pointer text-amber-600 hover:text-amber-800"
                  onClick={handleResetPassword}
                >
                  <FiKey />
                </button>
                <button
                  title="Edit user"
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => handleOpenEdit(u)}
                >
                  <FiEdit2 />
                </button>
                <button
                  className="cursor-pointer text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteUser(u)}
                  disabled={deletingId === u.id}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border bg-[var(--bg-card)] md:block">
        <table className="min-w-[600px] w-full text-sm">
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
              filteredUsers.map((u) => (
                <tr key={u.id} className="border-t transition hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-secondary)] font-semibold uppercase text-white">
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

                  <td className="p-4">{u.mail}</td>

                  <td className="p-4">
                    <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <Tooltip text="Reset password">
                        <button
                          aria-label="Reset Password"
                          className="cursor-pointer text-amber-600 hover:text-amber-800"
                          onClick={handleResetPassword}
                        >
                          <FiKey />
                        </button>
                      </Tooltip>

                      <Tooltip text="Edit user">
                        <button
                          aria-label="Edit user"
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={() => handleOpenEdit(u)}
                        >
                          <FiEdit2 />
                        </button>
                      </Tooltip>

                      <Tooltip text="Delete user">
                        <button
                          className="cursor-pointer text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteUser(u)}
                          disabled={deletingId === u.id}
                        >
                          <FiTrash2 />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
        <span>
          Page {page + 1} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="rounded-lg border px-3 py-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={handleNext}
            disabled={page + 1 === totalPages}
            className="rounded-lg border px-3 py-1 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {openAdd && <AddUserModal onClose={() => setOpenAdd(false)} />}

      {openEdit && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                Edit User
              </h2>
              <button
                onClick={() => setOpenEdit(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditChange}
                  placeholder="First name"
                  className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditChange}
                  placeholder="Last name"
                  className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>

              <input
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                placeholder="Username"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <input
                type="email"
                name="mail"
                value={editForm.mail}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />

              <select
                name="role"
                value={editForm.role}
                onChange={handleEditChange}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">Select role</option>
                <option value="ADMIN">Admin</option>
                <option value="TEACHER">Teacher</option>
                <option value="STUDENT">Student</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEdit}
                  className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
                >
                  {submittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;