/**
 * Marquee — franja de barrios en loop continuo bajo el hero. Dos copias del
 * contenido; la animación se desactiva con prefers-reduced-motion (en
 * globals.css) y el contenido sigue legible en una fila con scroll.
 */
export function Marquee({ items, label }: { items: string[]; label?: string }) {
  const row = (ariaHidden: boolean) => (
    <ul aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((it) => (
        <li key={it} className="flex items-center">
          <span className="font-display px-6 text-[1.35rem] italic text-bone/90 sm:px-8 sm:text-[1.6rem]">{it}</span>
          <span aria-hidden className="size-1.5 rounded-full bg-amber-soft" />
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-label={label} className="overflow-hidden border-y border-bone/10 bg-ink-2 py-4 text-bone motion-reduce:overflow-x-auto">
      <div className="flex w-max animate-marquee [--marquee-duration:60s] motion-reduce:w-auto">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
