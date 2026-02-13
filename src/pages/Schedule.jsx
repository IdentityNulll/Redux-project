{/* ===== Timetable ===== */}
<section aria-label="Weekly timetable">
  {/* ===== Desktop Table ===== */}
  <div className="hidden md:block bg-[var(--bg-card)] rounded-[var(--radius)] border border-[var(--border-color)] overflow-x-auto">
    <table className="w-full text-sm">
      <caption className="sr-only">
        Weekly school lesson schedule by day and period
      </caption>

      <thead className="bg-slate-100 text-slate-600">
        <tr>
          <th scope="col" className="p-4 text-left">
            Period
          </th>
          {DAYS.map((day) => (
            <th key={day} scope="col" className="p-4 text-left">
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {PERIODS.map((period) => (
          <tr
            key={period.id}
            className="border-t border-[var(--border-color)]"
          >
            <th
              scope="row"
              className="p-4 font-medium text-[var(--color-primary)]"
            >
              {period.label}
            </th>

            {DAYS.map((day) => {
              const lesson = lessonMap[`${day}-${period.id}`];

              return (
                <td key={day} className="p-4">
                  {lesson ? (
                    <div className="bg-[var(--color-secondary)] text-white p-2 rounded-md">
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-xs opacity-80">
                        {lesson.teacher}
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs text-[var(--text-muted)]">
                      —
                    </span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ===== Mobile View ===== */}
  <div className="md:hidden space-y-4">
    {DAYS.map((day) => (
      <div
        key={day}
        className="bg-[var(--bg-card)] rounded-[var(--radius)] border border-[var(--border-color)] p-4"
      >
        <h2 className="font-semibold text-[var(--color-primary)] mb-3">
          {day}
        </h2>

        <div className="space-y-3">
          {PERIODS.map((period) => {
            const lesson = lessonMap[`${day}-${period.id}`];

            return (
              <div
                key={period.id}
                className="flex justify-between items-center border-b border-[var(--border-color)] pb-2 last:border-none"
              >
                <span className="text-sm font-medium">
                  {period.label}
                </span>

                {lesson ? (
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--color-secondary)]">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {lesson.teacher}
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-[var(--text-muted)]">
                    —
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
</section>
