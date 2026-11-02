"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, read on the client so the page can stay prerendered. */
export function CurrentYear({ fallback = "Now" }: { fallback?: string }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => null);
  return <>{year ?? fallback}</>;
}
