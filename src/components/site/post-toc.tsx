"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/**
 * PostToc — índice del post. Sigue el scroll (sticky, lo aplica el padre) y
 * marca la sección activa con IntersectionObserver sobre los headings.
 */
export function PostToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!headings.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="In this article">
      <p className="font-display text-lg italic text-amber-deep">In this article</p>
      <ol className="mt-3 border-l border-ink/10">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 text-[0.92rem] leading-snug transition-colors",
                  it.level === 3 ? "pl-7" : "pl-4",
                  on ? "border-amber-deep font-semibold text-ink" : "border-transparent text-ink-soft hover:border-ink/30 hover:text-ink",
                )}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
