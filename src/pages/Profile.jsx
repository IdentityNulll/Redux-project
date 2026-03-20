import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMail,
  FiUser,
  FiCalendar,
  FiImage,
  FiShield,
  FiEdit2,
} from "react-icons/fi";
import EditProfileModal from "../components/EditProfileModal";
import { setUserProfile } from "../features/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { profile, avatarUrl, loading } = useSelector((state) => state.user);

  const [openEdit, setOpenEdit] = useState(false);

  const formatDate = (date) => {
    if (!date) return "Not provided";
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = () => {
    const first = profile?.firstName?.[0] || "";
    const last = profile?.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  const fullName = useMemo(() => {
    return (
      `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
      "Unknown User"
    );
  }, [profile]);

  const infoCards = [
    {
      label: "First Name",
      value: profile?.firstName || "Not provided",
      icon: <FiUser />,
    },
    {
      label: "Last Name",
      value: profile?.lastName || "Not provided",
      icon: <FiUser />,
    },
    {
      label: "Email Address",
      value: profile?.mail || "Not provided",
      icon: <FiMail />,
    },
    {
      label: "Birthday",
      value: formatDate(profile?.birthday),
      icon: <FiCalendar />,
    },
    {
      label: "Avatar Status",
      value: avatarUrl ? "Uploaded" : "No avatar uploaded",
      icon: <FiImage />,
    },
    {
      label: "Account Type",
      value: authUser?.role || "Administrator",
      icon: <FiShield />,
    },
  ];

  const handleProfileUpdated = (updatedData) => {
    dispatch(
      setUserProfile({
        ...profile,
        ...updatedData,
      })
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-40 rounded-3xl border border-[var(--border-color)] bg-white" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="h-72 rounded-3xl border border-[var(--border-color)] bg-white" />
            <div className="h-72 rounded-3xl border border-[var(--border-color)] bg-white lg:col-span-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header */}
          <section className="overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm">
            <div className="h-28 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] sm:h-36" />

            <div className="px-5 pb-6 sm:px-8">
              <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-100 text-2xl font-bold text-[var(--color-primary)] shadow-md sm:h-28 sm:w-28 sm:text-3xl">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials()
                    )}
                  </div>

                  <div className="pt-1">
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                      {fullName}
                    </h1>
                    <p className="mt-1 text-sm text-[var(--text-muted)] sm:text-base">
                      {authUser?.role || "Administrator"} Profile
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      Manage your account details and personal information.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex w-fit items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                    Active Account
                  </div>

                  <button
                    onClick={() => setOpenEdit(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <FiEdit2 />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Main content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left panel */}
            <aside className="space-y-6">
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                  Profile Summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-[var(--bg-main)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Full Name
                    </p>
                    <p className="mt-1 break-words text-sm font-medium text-[var(--text-main)]">
                      {fullName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[var(--bg-main)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Email
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-[var(--text-main)]">
                      {profile?.mail || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[var(--bg-main)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Birthday
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-main)]">
                      {formatDate(profile?.birthday)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                  Account Notes
                </h2>
                <div className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                  <p>
                    This profile page shows the information currently stored in
                    your account.
                  </p>
                  <p>
                    Missing fields are displayed clearly so they can be updated
                    later if needed.
                  </p>
                </div>
              </div>
            </aside>

            {/* Right panel */}
            <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm sm:p-6 lg:col-span-2">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[var(--color-primary)] sm:text-xl">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Review your account details below.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {infoCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[var(--border-color)] bg-white p-4 transition hover:shadow-sm sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-[var(--color-secondary)]">
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                          {item.label}
                        </p>
                        <p className="mt-1 break-words text-sm font-medium text-[var(--text-main)] sm:text-base">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        profile={profile}
        userId={authUser?.id}
        onUpdated={handleProfileUpdated}
      />
    </>
  );
}

export default Profile;