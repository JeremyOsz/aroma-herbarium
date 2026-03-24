## Learned User Preferences

- Place tab-specific search and filters under the tab bar, scoped to the tab they affect; avoid global-looking controls that only apply to one tab.
- Prefer hero and marketing copy that does not spell out notebook or pressed-plant metaphors; let layout and imagery carry the theme and keep functional perfumery language in headlines and body.
- Prefer the label "Herbal Teas" over clinical phrasing like "tea therapy" for that section when naming UI.
- When moving away from a dashboard-like look toward editorial or artistic layout, keep strong hover, focus, and selected states so interactions stay obvious.
- When simplifying color, keep warm cream, tan, and brown tones rather than cold grey-green minimalism.
- Tab triggers should show a pointer cursor on hover.
- Seasonal flora features should frame seasonal markers around learning local flora, not primarily around pollen or allergies.

## Learned Workspace Facts

- Use `next/image` with `unoptimized` (or equivalent) for Wikimedia and archive.org remote URLs so the browser loads them; the default optimizer can hit rate limits or failed server-side fetches.
- Favicon and app icons are wired through `public/icon.svg` and Next.js `metadata`, with matching references in the web manifest and static HTML as needed.
- Explorer navigation uses `?tab=`; the herbal teas tab may keep the URL value `tea-therapy` for backward compatibility while displaying "Herbal Teas" in the UI.
