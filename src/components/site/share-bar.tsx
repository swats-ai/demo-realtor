"use client";

import { useState } from "react";

/**
 * ShareBar — "Share this" en una sola fila: Facebook, X, LinkedIn, Reddit,
 * copiar enlace y email. Iconos SVG inline con aria-label; "copy" confirma
 * con un aria-live.
 */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.6v7h2.9Z" />,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: <path d="M17.6 3h3l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.2 21h-3l7.2-8.2L1.9 3h6.3l4.4 5.8L17.6 3Zm-1.1 16.2h1.7L7.5 4.7H5.7l10.8 14.5Z" />,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: <path d="M6.4 8.6H3.2V21h3.2V8.6ZM4.8 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM21 13.4c0-3.4-1.8-5-4.3-5-2 0-2.9 1.1-3.4 1.9V8.6H10V21h3.2v-6.2c0-1.6.3-3.2 2.3-3.2s2.1 1.9 2.1 3.3V21H21v-7.6Z" />,
    },
    {
      label: "Share on Reddit",
      href: `https://www.reddit.com/submit?url=${u}&title=${t}`,
      icon: <path d="M22 12.1a2.2 2.2 0 0 0-3.7-1.6c-1.5-1-3.5-1.7-5.7-1.8l1-4.5 3.1.7a1.6 1.6 0 1 0 .2-1l-3.6-.8a.5.5 0 0 0-.6.4l-1.1 5.2c-2.3.1-4.3.7-5.8 1.8A2.2 2.2 0 1 0 3.4 14a4 4 0 0 0 0 .6c0 3.2 3.8 5.9 8.6 5.9s8.6-2.6 8.6-5.9v-.6a2.2 2.2 0 0 0 1.4-1.9ZM7 13.6a1.6 1.6 0 1 1 3.2 0 1.6 1.6 0 0 1-3.2 0Zm8.8 4.2c-1.1 1.1-3.1 1.2-3.8 1.2s-2.7-.1-3.8-1.2a.4.4 0 0 1 .6-.6c.7.7 2.1.9 3.2.9s2.5-.2 3.2-.9a.4.4 0 0 1 .6.6Zm-.3-2.6a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z" />,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard bloqueado: el enlace sigue en la barra de direcciones */
    }
  };

  const btn =
    "flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-bone";

  return (
    <div>
      <p className="font-display text-lg italic text-amber-deep">Share this</p>
      <ul className="mt-3 flex items-center gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
              <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
                {l.icon}
              </svg>
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={btn + " cursor-pointer"}>
            {copied ? (
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                <path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </li>
        <li>
          <a href={`mailto:?subject=${t}&body=${t}%0A${u}`} aria-label="Share by email" className={btn}>
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <path d="M3.5 6.5h17v11h-17v-11Zm0 0 8.5 6.5 8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </li>
      </ul>
      <p aria-live="polite" className="sr-only">{copied ? "Link copied to clipboard" : ""}</p>
    </div>
  );
}
