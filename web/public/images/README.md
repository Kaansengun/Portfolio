# Images

| File | Source | Used in |
|---|---|---|
| `kaan.jpg` | Portrait Kaan provided (circular crop, 900×900) | About, process story avatar |
| `projects/dishcover-1.webp` | Dishcover home screen (thesis folder `figures/ekran_ana_sayfa.png`) | Story 05–06 (center), Dishcover card |
| `projects/dishcover-2.webp` | Dishcover recipe screen (`figures/ekran_tarif_malzeme.png`) | Story 05–06, Dishcover card |
| `projects/dishcover-3.webp` | Dishcover Ask AI screen (`figures/ekran_ask_ai.png`) | Story 05–06 |
| `projects/dishcover-4.webp` | Dishcover recipe steps (`figures/ekran_tarif_adim.png`) | Story 07–08 |
| `store/smart-beauty-1.webp` | App Store screenshot "Anında cilt sonuçları" | Case study, Smart Beauty card |
| `store/smart-beauty-2.webp` | App Store screenshot "Sana özel cilt rutini" | Case study, Smart Beauty card |
| `store/smart-beauty-3.webp` | App Store screenshot (change tracking) | Case study |

## Conventions

- `projects/`: raw app screenshots (portrait, ~9:19.5). They are drawn inside a phone frame.
- `store/`: App Store marketing images that already contain a device and caption. They are shown as-is in a rounded card.
- Paths live in `content/projects.ts` (cards) and `content/media.ts` (story stages, case study).
- Export at ~780px wide as WebP; `next/image` serves smaller sizes automatically.
