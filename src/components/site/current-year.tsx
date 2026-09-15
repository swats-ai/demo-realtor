"use client";

import { useEffect, useState } from "react";

/** Current year resolved on the client, so the footer stays fully static while
 *  never showing a stale year after the calendar rolls over. */
export function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year ?? new Date().getFullYear()}</span>;
}
