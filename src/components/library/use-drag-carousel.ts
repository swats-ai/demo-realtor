"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useDragCarousel — motor compartido de los carruseles infinitos
 * (EventsCarousel, PosterCarousel). Arquitectura: un contenedor con scroll
 * horizontal NATIVO (el trackpad y el touch scrollean solos) que renderiza 3
 * copias de los slides; el loop es un teletransporte de scrollLeft (±ancho de
 * un set) al cruzar los umbrales, invisible porque el contenido es idéntico.
 * Encima: drag con mouse (pointer capture + supresión del click tras
 * arrastrar), asentado suave al slide más cercano al soltar o al terminar el
 * scroll, flechas y auto-avance opcionales.
 *
 * `visible` = slots visibles (completos + peeks); `full` = slots completos —
 * el resto se reparte en dos peeks laterales iguales.
 *
 * Cópialo junto con cualquier carrusel que lo use.
 */
export function useDragCarousel({
  count,
  visible,
  full,
  intervalMs = 0,
}: {
  count: number;
  visible: number;
  full: number;
  intervalMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const pausedRef = useRef(false);
  const drag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);
  const clickBlock = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slotW = useCallback(
    () => (trackRef.current?.clientWidth ?? 0) / visible,
    [visible],
  );
  // Margen que centra los slots completos (los peeks se reparten a los lados).
  const peek = useCallback(() => {
    const el = trackRef.current;
    return el ? (el.clientWidth - full * slotW()) / 2 : 0;
  }, [full, slotW]);

  // Posición inicial: arranca en la copia central.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = count * slotW() - peek();
  }, [count, slotW, peek]);

  const settle = useCallback(() => {
    const el = trackRef.current;
    if (!el || drag.current) return;
    const target = Math.round((el.scrollLeft + peek()) / slotW()) * slotW() - peek();
    if (Math.abs(target - el.scrollLeft) > 1) {
      el.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [peek, slotW]);

  // Loop infinito + dot activo + asentado al terminar el scroll libre.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const setW = count * slotW();
      // Umbrales con histéresis (0.25/1.75, no 0.5/1.5): el pre-teletransporte
      // de go() salta ±setW, y con umbrales a medio set el punto de aterrizaje
      // caería exactamente en el umbral opuesto → re-teletransporte en pleno
      // smooth scroll (el carrusel se "atoraba" en el último slide).
      if (el.scrollLeft < setW * 0.25) el.scrollLeft += setW;
      else if (el.scrollLeft > setW * 1.75) el.scrollLeft -= setW;
      const idx = Math.round((el.scrollLeft + peek()) / slotW());
      setCur(((idx % count) + count) % count);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(settle, 160);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [count, slotW, peek, settle]);

  const go = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      // Pre-teletransporte: si el smooth scroll fuera a cruzar el umbral del
      // loop, salta primero ±setW en seco (contenido idéntico, invisible).
      // Si el teletransporte ocurriera A MITAD del smooth scroll, el navegador
      // seguiría animando hacia el target absoluto original y el carrusel
      // "rebota" — se veía atorado en el último slide.
      const setW = count * slotW();
      if (dir === 1 && el.scrollLeft + slotW() > 1.5 * setW) el.scrollLeft -= setW;
      else if (dir === -1 && el.scrollLeft - slotW() < 0.5 * setW) el.scrollLeft += setW;
      el.scrollBy({ left: dir * slotW(), behavior: "smooth" });
    },
    [count, slotW],
  );

  // Auto-avance (pausa con hover y durante el drag).
  useEffect(() => {
    if (!intervalMs) return;
    const id = setInterval(() => {
      if (!pausedRef.current && !drag.current) go(1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, go]);

  // Drag con mouse. El touch y el trackpad ya scrollean nativo.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { startX: e.clientX, startLeft: trackRef.current.scrollLeft, moved: false };
    trackRef.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !trackRef.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    if (moved) {
      // Suprime el click fantasma sobre las tarjetas-enlace tras arrastrar.
      clickBlock.current = true;
      setTimeout(() => (clickBlock.current = false), 0);
      settle();
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (clickBlock.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const setPaused = (v: boolean) => {
    pausedRef.current = v;
  };

  return {
    trackRef,
    cur,
    go,
    setPaused,
    trackProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onDragStart: (e: React.DragEvent) => e.preventDefault(),
    },
  };
}

/** Clases del track: scroll nativo sin scrollbar + cursores de drag. */
export const dragTrackClassName =
  "flex cursor-grab select-none overflow-x-auto overscroll-x-contain active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
