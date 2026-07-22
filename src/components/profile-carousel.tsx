"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = { label: string; content: React.ReactNode };

export function ProfileCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const startX = useRef<number | null>(null);
  const total = slides.length;

  const go = (n: number) => setI(Math.max(0, Math.min(total - 1, n)));

  function onDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  }
  function onUp() {
    if (startX.current === null) return;
    if (drag < -60) go(i + 1);
    else if (drag > 60) go(i - 1);
    startX.current = null;
    setDrag(0);
  }

  return (
    <div className="relative">
      {/* Rótulos das informações */}
      <div className="mx-auto mb-5 flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4">
        {slides.map((s, idx) => (
          <button
            key={s.label}
            onClick={() => go(idx)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              idx === i
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                : "bg-surface-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Track — cada informação preenche a tela */}
        <div
          className="overflow-hidden"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${-i * 100}% + ${drag}px))`,
              transition: startX.current === null ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)" : "none",
            }}
          >
            {slides.map((s) => (
              <div key={s.label} className="w-full shrink-0 px-4 sm:px-6">
                <div className="mx-auto flex min-h-[68vh] max-w-4xl select-none flex-col justify-center py-6">
                  {s.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setas */}
        <button
          onClick={() => go(i - 1)}
          disabled={i === 0}
          aria-label="Informação anterior"
          className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-0 sm:left-4"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => go(i + 1)}
          disabled={i === total - 1}
          aria-label="Próxima informação"
          className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-0 sm:right-4"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.label}
            onClick={() => go(idx)}
            aria-label={`Ir para ${s.label}`}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-7 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Use as setas ou arraste para o lado para ver mais.
      </p>
    </div>
  );
}
