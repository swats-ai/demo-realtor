# Sabine & Oak — demo realtor

Sitio brochure demo de una brokerage inmobiliaria boutique en Austin, TX.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · framer-motion.

```bash
npm run dev     # http://localhost:3000
npm run build   # 24 rutas estáticas (SSG)
npm run lint
```

## Qué hay

| Ruta | Contenido |
|---|---|
| `/` | Hero slider 100vh, marquee de barrios, about, cifras animadas, listings apilados (StackingCards), barrios (ExpandingCards), video en lightbox, galería de ladrillo en parallax a sangre (BrickParallaxGallery, con lightbox), proceso, testimonios, blog, newsletter, formulario |
| `/listings`, `/listings/[slug]` | Grid con filtros y orden · ficha con carrusel + lightbox, datos, video tour, agente y formulario sticky |
| `/neighborhoods` | Bento con reveal al hover + ficha larga por barrio (anclas `#slug`) |
| `/gallery` | Parallax de ladrillo + 5 galerías masonry **balanceadas** (todas las columnas cierran en la misma línea, sin huecos al pie) con lightbox a pantalla completa |
| `/blog`, `/blog/[slug]` | Journal · post a 2 columnas: índice sticky que sigue el scroll + "Share this" (Facebook, X, LinkedIn, Reddit, copiar, email) |
| `/about`, `/contact` | Equipo, valores, manifiesto con scroll, oficina en video · formulario, mapa, FAQ |

## Estructura

```
src/
  app/                    rutas (App Router) + globals.css (tokens, fuentes, utilidades)
  components/library/     componentes copiados de ~/Projects/ComponentsLibrary y adaptados
  components/site/        header, footer, logo, lightbox, video-poster, forms, blog (toc, share, body)…
  data/                   contenido: images, listings, neighborhoods, agents, testimonials, posts, galleries
  lib/site.ts             identidad, nav, contacto
public/brand/             mark.svg (header/favicon) y emblem.svg (footer), generados con Recraft V3 SVG vía Replicate
public/video/             mp4 de muestra para el video local
```

## Convenciones

- **Ancho de contenido 1600px** (`max-w-[100rem]`). Header y footer son full-width; su contenido respeta ese ancho. Las bandas con fondo van a sangre y el contenido dentro respeta el ancho.
- **Tokens**: los componentes de la librería usan `ink / paper / bone / amber…`; en `globals.css` se remapean a la paleta del proyecto (pino, caliza, río). No inventar colores nuevos.
- `.eyebrow` está remapeado a cursiva Fraunces (en la librería es mono en mayúsculas).
- **Imágenes**: Unsplash vía `remotePatterns` (solo demo). Todos los IDs de `src/data/images.ts` están verificados.
- **Marca**: los SVG de `public/brand` se usan como `mask-image` con `currentColor` (`.brand-mark`, `.brand-emblem`), así sirven en claro y oscuro con un solo archivo.
- **Accesibilidad**: contrastes AA verificados en los tokens, skip link, foco visible, lightboxes con `role="dialog"` + foco atrapado + Escape, labels sr-only en formularios, `prefers-reduced-motion` desactiva autoplay, marquee y parallax.
- **MasonryGallery** reparte las fotos en columnas flex con heurística LPT: el conjunto forma siempre un rectángulo completo; cada foto se estira como máximo un ~5 % respecto a su proporción declarada.
- **Video**: `VideoPoster` acepta `{ provider: "youtube" | "vimeo" | "file" }`; siempre poster + botón de play custom, reproduce en lightbox.
- Los formularios son solo UI (muestran confirmación); conectar un backend en `src/components/site/forms.tsx`.
