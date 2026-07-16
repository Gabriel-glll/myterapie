import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 21s-6.5-4.35-9-8.5C1.5 9.5 3 6 6.2 6c1.9 0 3.1 1 3.8 2 .7-1 1.9-2 3.8-2 3.2 0 4.7 3.5 3.2 6.5C18.5 16.65 12 21 12 21z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        My<span className="text-primary">Terapie</span>
      </span>
    </Link>
  );
}
