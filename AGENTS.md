<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Demo Realtor (Sabine & Oak)

Sitio brochure demo. Ver `README.md` para rutas, estructura y convenciones.

- npm · Next.js 16 App Router · TypeScript · Tailwind 4 · framer-motion.
- Contenido máx. 1600px (`max-w-[100rem]`); header/footer full-width con contenido al mismo ancho.
- Los componentes de `src/components/library/` vienen de `~/Projects/ComponentsLibrary`; usan solo los tokens de `globals.css` (remapeados a la paleta del proyecto). Los propios del sitio van en `src/components/site/`.
- Todo el contenido vive en `src/data/`. Imágenes Unsplash solo para demo.
- Galerías → lightbox fullscreen; videos → poster + play custom → lightbox (YouTube, Vimeo o mp4 local).
- No commitear ni pushear sin OK explícito.
