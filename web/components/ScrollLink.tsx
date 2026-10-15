"use client";

import type { CSSProperties, ReactNode } from "react";
import { scrollToSection } from "@/lib/scroll";

type Props = { to: string; className?: string; style?: CSSProperties; children: ReactNode };

export function ScrollLink({ to, className, style, children }: Props) {
  return (
    <a
      href={`#${to}`}
      className={className}
      style={style}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(to);
      }}
    >
      {children}
    </a>
  );
}
