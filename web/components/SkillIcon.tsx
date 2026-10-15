import {
  siFigma,
  siFirebase,
  siGit,
  siMongodb,
  siNextdotjs,
  siNuxt,
  siOpenjdk,
  siPython,
  siReact,
  siSupabase,
  siSwift,
  siTypescript,
  siVuedotjs,
  siXcode,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  figma: siFigma,
  firebase: siFirebase,
  git: siGit,
  mongodb: siMongodb,
  nextdotjs: siNextdotjs,
  nuxt: siNuxt,
  openjdk: siOpenjdk,
  python: siPython,
  react: siReact,
  supabase: siSupabase,
  swift: siSwift,
  typescript: siTypescript,
  vuedotjs: siVuedotjs,
  xcode: siXcode,
};

/** Brand icon from simple-icons, or a mono monogram when there is no open-licensed mark. */
export function SkillIcon({ name, icon }: { name: string; icon?: string }) {
  const si = icon ? icons[icon] : undefined;
  if (si) {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill={`#${si.hex}`} aria-hidden focusable={false}>
        <path d={si.path} />
      </svg>
    );
  }
  const initials = name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2);
  return (
    <span aria-hidden className="grid size-5 place-items-center rounded-[5px] bg-ink font-mono text-[9px] leading-none font-semibold text-white">
      {initials}
    </span>
  );
}
