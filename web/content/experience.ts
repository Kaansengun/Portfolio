/**
 * Language-independent experience data. Description and location live in
 * messages/{tr,en}.json under `experience.items.<id>`.
 * Dates are "YYYY-MM"; `end: null` means "present".
 * Set `isInternship: true` to show the "Intern" badge on a row.
 */
export type ExperienceKind = "ios" | "freelance";

export type Experience = {
  id: "bluesense" | "orion" | "quantumcode" | "alignerr" | "outlier";
  title: string;
  company: string;
  start: string;
  end: string | null;
  kind: ExperienceKind;
  isInternship: boolean;
};

export const experience: Experience[] = [
  {
    id: "bluesense",
    title: "Native iOS Engineer",
    company: "Bluesense AI",
    start: "2026-07",
    end: "2026-09",
    kind: "ios",
    isInternship: false,
  },
  {
    id: "orion",
    title: "Native iOS Engineer",
    company: "Orion Innovation Turkey",
    start: "2025-10",
    end: "2026-02",
    kind: "ios",
    isInternship: false,
  },
  {
    id: "quantumcode",
    title: "Native iOS Engineer",
    company: "QuantumCode Technology",
    start: "2025-07",
    end: "2025-09",
    kind: "ios",
    isInternship: false,
  },
  {
    id: "alignerr",
    title: "Software Engineer for AI Training",
    company: "Alignerr",
    start: "2026-09",
    end: null,
    kind: "freelance",
    isInternship: false,
  },
  {
    id: "outlier",
    title: "Software Engineer for AI Training",
    company: "Outlier",
    start: "2025-04",
    end: null,
    kind: "freelance",
    isInternship: false,
  },
];
