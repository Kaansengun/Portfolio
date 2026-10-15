"use client";

import type { ReactNode } from "react";
import { useContact } from "./ContactProvider";

/** Any button that opens the contact panel (used from server components). */
export function ContactButton({ className, children }: { className?: string; children: ReactNode }) {
  const { openContact } = useContact();
  return (
    <button type="button" onClick={openContact} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
