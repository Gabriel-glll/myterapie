import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- Button */
type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-hover hover:-translate-y-0.5",
  secondary: "bg-secondary-soft text-primary hover:brightness-95",
  outline: "border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-surface-muted",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------- Badge */
export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "primary" | "accent";
}) {
  const tones = {
    default: "bg-surface-muted text-muted-foreground",
    primary: "bg-secondary-soft text-primary",
    accent: "bg-accent/15 text-accent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- Stars */
export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={
            i <= Math.round(value)
              ? "fill-accent text-accent"
              : "fill-transparent text-border"
          }
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ Card */
export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
