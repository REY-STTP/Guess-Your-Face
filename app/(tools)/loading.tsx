/**
 * Loading skeleton for the /detect, /compare, /analyze routes.
 * Mirrors the real ToolNav + ToolTldr + page header structure so the
 * soft-navigation transition feels instantaneous instead of a blank flash.
 */
export default function ToolsLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      {/* ToolNav skeleton — matches the 3-tab segmented control */}
      <div
        role="presentation"
        className="mb-8 grid grid-cols-3 gap-1 rounded-2xl border border-line bg-surface2 p-1"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 rounded-xl px-3 py-2.5"
          >
            <div className="h-4 w-12 animate-pulse rounded bg-line/60" />
            <div className="hidden h-2.5 w-20 animate-pulse rounded bg-line/40 sm:block" />
          </div>
        ))}
      </div>

      {/* Page title skeleton */}
      <div className="mb-8">
        <div className="h-7 w-40 animate-pulse rounded bg-line/60 sm:h-8" />
        <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-line/40" />
      </div>

      {/* TL;DR card skeleton */}
      <div className="mb-10 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-12 animate-pulse rounded bg-line/60" />
          <div className="h-px flex-1 bg-line/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-line/50" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-line/50" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-line/50" />
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <div className="h-3 w-24 animate-pulse rounded bg-line/40" />
          <ul className="mt-3 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex gap-3">
                <div className="h-5 w-5 animate-pulse rounded-md bg-line/40" />
                <div className="h-4 flex-1 animate-pulse rounded bg-line/40" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tool area skeleton — dropzone + action row */}
      <div>
        <div className="flex h-48 animate-pulse items-center justify-center rounded-2xl border-2 border-dashed border-line bg-surface sm:h-56">
          <div className="h-3 w-44 rounded bg-line/40" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="h-10 animate-pulse rounded-full bg-line/40" />
          <div className="h-10 animate-pulse rounded-full bg-line/40" />
        </div>
      </div>
    </div>
  );
}
