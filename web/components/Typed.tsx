import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds before typing starts. */
  delay?: number;
  /** Typing duration in seconds. */
  duration?: number;
  /** Number of "keystrokes"; roughly the character count. */
  steps?: number;
  /** Keep the blinking caret after typing (last line). */
  keepCaret?: boolean;
  /** Mask color, must match what is behind the text. */
  mask?: string;
};

/**
 * Text that types itself in: a mask the color of the background slides off the
 * line in steps, and its left edge blinks like a caret. Pure CSS, so the text is
 * in the HTML from the start and stays visible without JS or with reduced motion.
 */
export function Typed({ children, delay = 0, duration = 0.9, steps = 18, keepCaret, mask }: Props) {
  const style = {
    "--delay": `${delay}s`,
    "--dur": `${duration}s`,
    "--steps": steps,
    ...(mask ? { "--mask": mask } : {}),
  } as CSSProperties;
  return (
    <span className="typed">
      {children}
      <span aria-hidden className="typed-mask" style={style} data-keep-caret={keepCaret ? "" : undefined} />
    </span>
  );
}
