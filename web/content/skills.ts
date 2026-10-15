/**
 * Skill rows on the About section. `icon` is a simple-icons slug that
 * components/SkillIcon.tsx knows about; anything else renders a monogram.
 */
export type Skill = { name: string; icon?: string };

export type SkillGroup = {
  id: "mobile" | "web" | "design";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "mobile",
    skills: [
      { name: "Swift", icon: "swift" },
      { name: "SwiftUI" },
      { name: "UIKit" },
      { name: "Xcode", icon: "xcode" },
      { name: "Firebase", icon: "firebase" },
      { name: "Core ML" },
    ],
  },
  {
    id: "web",
    skills: [
      { name: "TypeScript", icon: "typescript" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "Vue.js", icon: "vuedotjs" },
      { name: "Nuxt", icon: "nuxt" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "openjdk" },
      { name: "SQL Server" },
      { name: "Supabase", icon: "supabase" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    id: "design",
    skills: [{ name: "UI/UX" }, { name: "Figma", icon: "figma" }],
  },
];
