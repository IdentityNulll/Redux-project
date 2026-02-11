import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get("q")?.toLowerCase() || "";

  const users = useSelector((state) => state.users.list);
  const classes = useSelector((state) => state.classes.list);

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      u.mail.toLowerCase().includes(query)
    );
  });

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
          Search Results
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Showing results for "{query}"
        </p>
      </div>

      <section className="bg-[var(--bg-card)] rounded-[var(--radius)] p-6 border border-[var(--border-color)]">
        <h2 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
          Users ({filteredUsers.length})
        </h2>

        {filteredUsers.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            No users found
          </p>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-medium">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {u.mail}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 bg-slate-200 rounded-full">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CLASSES */}
      <section className="bg-[var(--bg-card)] rounded-[var(--radius)] p-6 border border-[var(--border-color)]">
        <h2 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
          Classes ({filteredClasses.length})
        </h2>

        {filteredClasses.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            No classes found
          </p>
        ) : (
          <div className="space-y-3">
            {filteredClasses.map((cls) => (
              <div
                key={cls.uuid}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {cls.studentCount} students
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Search;
