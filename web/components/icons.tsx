import type { SVGProps } from "react";
import { siGithub } from "simple-icons";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const ArrowRight = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);
export const ArrowDown = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);
export const ArrowUpRight = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const HomeIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
  </svg>
);
export const GridIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </svg>
);
export const UserIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" />
  </svg>
);
export const MenuIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const MailIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const PhoneIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.7 20 4 13.3 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  </svg>
);
export const MoonIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />
  </svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const PinIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const CapIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5z" />
    <path d="M6.5 11v4.5c1.5 1.5 3.5 2.3 5.5 2.3s4-.8 5.5-2.3V11M21.5 9v5" />
  </svg>
);
export const ChatIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M5 18.5 3.5 21l.5-4A8 8 0 1 1 7 19.5" />
  </svg>
);
export const SparkIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </svg>
);
export const TagIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9z" />
    <circle cx="8.5" cy="8.5" r="1.5" />
  </svg>
);

export const AlertIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M12 4 2.8 19.5h18.4z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
);
export const PhotoIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <rect x="3" y="4.5" width="18" height="15" rx="3" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="m4 18 5.5-5 4 3.5 2.5-2 4 3.5" />
  </svg>
);
export const SunIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);
export const LayersIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);
export const FlaskIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M9.5 3h5M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3" />
    <path d="M7 15h10" />
  </svg>
);
export const LoopIcon = (p: IconProps) => (
  <svg {...stroke(p)}>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5" />
  </svg>
);

export const GithubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d={siGithub.path} />
  </svg>
);

/** LinkedIn isn't in simple-icons anymore; a neutral "in" mark in a rounded square. */
export const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2Zm1.8 7.6V18h2.8V9.6H6.3Zm1.4-4.3a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm3.6 4.3V18h2.8v-4.4c0-1.2.4-2 1.5-2s1.4.9 1.4 2V18h2.8v-5c0-2.5-1.3-3.6-3.2-3.6-1.3 0-2.1.6-2.5 1.3V9.6h-2.8Z" />
  </svg>
);
