import { links } from "./links";

/**
 * Language-independent project data. Title, description and link label
 * live in messages/{tr,en}.json under `projects.items.<id>`.
 * To add a project: append an entry here and add its texts to both message files.
 */
export type Project = {
  id: "smartBeauty" | "dishcover";
  tech: string[];
  /**
   * Two screenshots shown on the card (paths under /public).
   * Raw screenshots go in /images/projects (drawn inside a phone frame);
   * App Store marketing images that already include a device go in /images/store (shown as-is).
   */
  images: [string, string];
  href: string;
  /** Card background (Tailwind gradient classes). */
  tint: string;
};

export const projects: Project[] = [
  {
    id: "smartBeauty",
    tech: ["Swift", "SwiftUI", "Firebase", "SceneKit", "Core ML"],
    images: [
      "/images/store/smart-beauty-1.webp",
      "/images/store/smart-beauty-2.webp",
    ],
    href: links.smartBeautyAppStore,
    tint: "from-blush via-accent-soft to-periwinkle/50",
  },
  {
    id: "dishcover",
    tech: ["Swift", "SwiftUI"],
    images: [
      "/images/projects/dishcover-1.webp",
      "/images/projects/dishcover-2.webp",
    ],
    href: links.dishcoverTestFlight,
    tint: "from-mint via-surface to-blush",
  },
];
