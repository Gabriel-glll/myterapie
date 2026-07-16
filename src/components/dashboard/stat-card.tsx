import type { LucideIcon } from "lucide-react";

/** Presentational stat tile — server-safe so pages can pass icon components. */
export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {trend && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
