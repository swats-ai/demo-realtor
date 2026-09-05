import Image from "next/image";
import type { Block } from "@/data/posts";

/** PostBody — renderiza los bloques tipados del post (estilos en .prose-post). */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-post">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id}>
                {b.text}
              </h3>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-10 border-l-2 border-amber-deep pl-6 sm:my-12 sm:pl-8">
                <p className="font-display text-pretty text-[1.6rem] italic leading-[1.3] text-ink sm:text-[1.9rem]">{b.text}</p>
                {b.cite ? <footer className="mt-3 text-[0.95rem] text-ink-soft">{b.cite}</footer> : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-10 sm:my-12">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-ink-2">
                  <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                </div>
                {b.caption ? <figcaption className="mt-3 text-[0.92rem] italic text-ink-soft">{b.caption}</figcaption> : null}
              </figure>
            );
        }
      })}
    </div>
  );
}
