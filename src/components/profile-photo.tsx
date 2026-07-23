"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

/**
 * Foto de perfil clicável — abre uma visualização ampliada (lightbox).
 */
export function ProfilePhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ampliar foto"
        className={`group relative block shrink-0 overflow-hidden ${className}`}
      >
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
          <ZoomIn className="h-7 w-7" />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Fechar"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill sizes="512px" className="object-cover" priority />
          </div>
        </div>
      )}
    </>
  );
}
