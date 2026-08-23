# Design QA — Orbital Sphere Background

**Findings**

- No actionable P0/P1/P2 findings remain.
- [P3] The portfolio intentionally renders the sphere larger and at lower opacity than the isolated ThreeUI demo. This is an acceptable adaptation: the background remains recognizable while the portfolio copy keeps visual priority.

**Evidence**

- Source visual truth: `/tmp/threeui-orbital-sphere-reference.png`
- Desktop implementation: `/tmp/portfolio-orbital-1280x720.png`
- Mobile implementation: `/tmp/portfolio-orbital-mobile-final.png`
- Full-view comparison: `/tmp/orbital-reference-comparison.png`
- Focused effect comparison: `/tmp/orbital-focused-comparison.png`
- Route and state: `http://localhost:3000/pt`, dark theme, page at scroll position 0, default animation state.
- Viewport: desktop `1280 × 720` CSS px; mobile `390 × 844` CSS px.
- Pixel dimensions: source `1280 × 720`; desktop implementation `1265 × 712`; mobile implementation `375 × 844`. The in-app browser capture excludes its scrollbar/gutter from the bitmap.
- Density normalization: source and desktop captures were resized to `640 × 360` for the full-view comparison. Focused source and implementation crops were independently normalized to `640 × 360` before being placed side by side.

**Required Fidelity Surfaces**

- Fonts and typography: the portfolio's existing JetBrains Mono family, weights, hierarchy, wrapping, and line heights remain unchanged and readable over the new effect.
- Spacing and layout rhythm: existing content width and section rhythm are preserved. The sphere is peripheral on desktop and partially cropped on mobile, matching its role as a background rather than content.
- Colors and visual tokens: the violet reference was adapted to the portfolio's blue accent family (`#93a8ff`, `#6d8cff`, `#2445a6`) over a neutral blue-black base. No green CRT treatment remains.
- Image quality and asset fidelity: the effect is rendered natively with Three.js particles, additive lines, halos, and nodes. There are no raster placeholders, stretched assets, or visible compression artifacts.
- Copy and content: portfolio text and navigation labels are unchanged.

**Responsive and Runtime Checks**

- Desktop and mobile each render exactly one canvas.
- Mobile body width stays within the viewport; no horizontal overflow was found.
- The canvas is fixed, pointer-events are disabled, and content remains interactive above it.
- Animation pauses when the tab is hidden or the background leaves the viewport, and respects `prefers-reduced-motion` with a static render.
- Browser console checked after the final desktop render: no errors or warnings.
- Production build and TypeScript validation pass.

**Comparison History**

- Initial mobile pass — P2: the sphere was positioned too low and was effectively absent above the fold (`/tmp/portfolio-orbital-mobile.png`).
- Fix: moved the compact-layout sphere from `(0.65, -1.55, -3)` at scale `1` to `(1.45, -0.25, -3)` at scale `0.92`.
- Post-fix evidence: `/tmp/portfolio-orbital-mobile-final.png` shows the sphere at the lower-right edge without reducing text readability. No P0/P1/P2 issue remains.

**Implementation Checklist**

- [x] Remove the CRT text background.
- [x] Rebuild the Orbital Sphere effect directly in the existing Next.js application.
- [x] Match the site's blue visual language.
- [x] Protect text contrast on desktop and mobile.
- [x] Add responsive positioning, lifecycle cleanup, visibility pausing, and reduced-motion support.
- [x] Validate TypeScript, production build, responsive layout, browser console, and visual comparison.

**Follow-up Polish**

- Optional P3 tuning: adjust only the sphere opacity/scale after subjective review on the user's usual monitor.

final result: passed
