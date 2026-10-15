/**
 * The 01–10 story. The page is split into five stages; each stage owns two
 * numbered lines (texts in messages under `story.lines.<nn>`) that type into
 * the fixed heading while that stage is on screen.
 */
export const stages = [
  { id: "story-idea", lines: ["01", "02"] },
  { id: "story-analysis", lines: ["03", "04"] },
  { id: "story-design", lines: ["05", "06"] },
  { id: "story-build", lines: ["07", "08"] },
  { id: "story-launch", lines: ["09", "10"] },
] as const;

export type StageId = (typeof stages)[number]["id"];
