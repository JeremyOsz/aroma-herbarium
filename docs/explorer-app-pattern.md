# Explorer App Pattern (Subject-Agnostic)

Reusable structure for apps where users explore a dataset through cards, lists, filters, detail modals, and multiple navigation modes.

## 1) Core Outcome
Build one canonical dataset and expose multiple exploration paths without duplicating logic:
- Fast scan (cards/list)
- Guided filtering (facets + search)
- Deep dive (detail modal/panel)
- Alternate mental models (tabs like items/regions/recipes/timelines)

## 2) Information Architecture
Use this consistent page skeleton:
1. `Hero + framing`:
- Purpose, context, key counts, quick orientation
2. `Control bar`:
- Search + primary filters + reset
3. `Explorer tabs`:
- Different views over same data (not separate apps)
4. `Primary result surface`:
- Card grid or list
5. `Secondary context panels`:
- Guides, maps, recipes, timelines, references
6. `Detail modal/drawer`:
- Rich record view from any surface

## 3) Data Contract
Keep one source-of-truth typed schema plus derived views.

```ts
export type Category = string;
export type Facet = string;

export interface ExplorerItem {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  facets: Facet[];
  tags?: string[];
  summary: string;
  details: string[];
  media?: { src: string; alt: string };
  references?: { label: string; href: string }[];
}
```

Recommended colocated data modules:
- `items`: canonical records
- `taxonomies`: labels for categories/facets/tags
- `altViews`: datasets for alternate tabs (routes, collections, recipes)
- `guides`: helper content (usage tips, glossary, onboarding)

## 4) State Model
Use URL as canonical UI state so views are shareable.

Suggested query params:
- `tab`: active view
- `query`: free text search
- `category`: single-select facet
- `facet`: optional additional facet
- `item`: selected record id (modal open state)
- `sort`: optional sort key

Rules:
- Invalid params gracefully fall back to defaults
- Empty/default states remove param
- Any interaction updates URL (replace, no scroll jump)
- Modal open/close is URL-driven (`item=<id>`)

## 5) Filtering + Search Pipeline
Keep this deterministic order:
1. Start from canonical items
2. Apply facet filters (`AND` logic)
3. Apply query match on preselected fields
4. Apply sort
5. Render

Implementation notes:
- Normalize query tokens once
- Keep filter logic in pure functions
- Memoize derived arrays/maps for large datasets

## 6) Interaction Pattern
- Clicking card/list row opens modal via URL state
- `Esc`, backdrop click, or close button clears `item`
- Switching tabs preserves relevant filters where sensible
- Include clear empty states with recovery actions
- Keep keyboard and focus behavior predictable in modal

## 7) UI Component System
Split by role:
- `ExplorerShell`: URL state + orchestration
- `FilterBar`: controls only
- `ResultsGrid` / `ResultsList`: presentational surfaces
- `DetailModal`: selected record render
- `TabView*`: alternate exploration modes

Prefer these boundaries:
- Business logic in hooks/utilities
- UI components mostly stateless
- Domain data outside component files

## 8) Resilience + Content Quality
- Media fallback chain (`primary -> alternate -> placeholder`)
- Defensive parsing for bad params and missing data
- Lightweight provenance links for trust
- Optional disclosure/compliance area if monetization exists

## 9) Performance Baseline
- Lazy-load heavy media
- Avoid rerender storms by stable handlers/memoized data maps
- Virtualize if lists exceed practical card-grid size
- Keep static data tree-shakeable and split by tab when large

## 10) Reuse Starter Checklist
For a new subject domain, replace only these:
- Dataset (`items`, taxonomies, alt views)
- Copy/tone (hero, labels, helper text)
- Card fields and modal sections
- Facet dimensions and sort options
- Optional domain-specific compliance notes

Keep unchanged:
- URL state contract
- Filter/search pipeline
- Modal interaction model
- Component boundaries

## 11) Suggested File Layout

```txt
src/
  app/
    page.tsx
  components/
    explorer/
      explorer-shell.tsx
      filter-bar.tsx
      results-grid.tsx
      detail-modal.tsx
      tab-view-a.tsx
      tab-view-b.tsx
  data/
    items.ts
    taxonomies.ts
    alt-views.ts
    guides.ts
  lib/
    explorer-state.ts
    explorer-filtering.ts
    explorer-normalize.ts
```

## 12) Definition of Done (Reusable Explorer)
- All key states are deep-linkable
- Keyboard-accessible modal flow works
- Empty, loading, and error states are explicit
- Dataset can be swapped without component rewrites
- At least 2 alternate views use same canonical item model
- README includes domain swap instructions
