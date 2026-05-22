# Design System Specification: The Technical Observer

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Observatory"**
This design system moves away from the "SaaS-standard" dashboard. Instead, it adopts the persona of a high-precision scientific instrument. The objective is to provide a "quiet" interface that recedes into the background, allowing the high-stakes environmental data to take center stage.

We break the "template" look by using **intentional asymmetry and tonal depth**. Rather than a rigid, repeating grid of boxes, we use varied card widths and "nested environments" to guide the eye. The aesthetic is "Technical Elegance"—a fusion of industrial reliability and modern digital sophistication. We prioritize high-contrast typography scales and layered surfaces over traditional lines to create an interface that feels like a glass cockpit.

---

## 2. Colors & Surface Philosophy

The palette is rooted in deep slates (`surface`: #0b1326) to reduce eye strain during long-term monitoring, punctuated by high-vibrancy semantic tokens for critical status alerts.

### The "No-Line" Rule

**Explicit Instruction:** Sectioning via 1px solid borders is strictly prohibited.
Structural boundaries must be defined solely through background color shifts. For instance, a side-rail using `surface-container-low` should sit directly against a `surface` background. The transition of color is the boundary.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack of technical glass.

- **Base Layer:** `surface` (#0b1326) – The foundation of the application.
- **Sectioning:** `surface-container-low` (#131b2e) – Used for primary content regions.
- **Interactive/Elevated Elements:** `surface-container-high` (#222a3d) – Used for cards or active modules.
- **Nesting Example:** To highlight a specific metric within a card, place a `surface-container-highest` (#2d3449) small container inside a `surface-container-low` card. This creates a "recessed" or "raised" effect through tone alone.

### The "Glass & Gradient" Rule

To evoke a premium feel, floating menus and modal overlays must use **Glassmorphism**. Use `surface-bright` (#31394d) at 60% opacity with a `20px` backdrop-blur.

- **Signature Textures:** Main Action CTAs or critical "System Healthy" headers should utilize a subtle linear gradient from `primary` (#7bd0ff) to `on_primary_container` (#008abb) at a 135-degree angle to provide a "lithium-ion" glow.

---

## 3. Typography: The Information Hierarchy

We use **Inter** as our typographic engine. It is chosen for its neutral, technical personality and exceptional legibility at small sizes (essential for sensor readings).

- **Display (Large Metrics):** `display-lg` (3.5rem). Use this for "Hero Data" like Current Air Quality Index. It should feel authoritative.
- **The Technical Label:** `label-md` (0.75rem) and `label-sm` (0.6875rem). These are the workhorses. Use them for sensor IDs, timestamps, and units of measurement.
- **Editorial Contrast:** Pair a `headline-sm` (1.5rem) title with a `label-md` (0.75rem) uppercase subtitle to create an "Industrial Manual" aesthetic.

**Hierarchy Tip:** Use `on_surface_variant` (#c6c6cd) for secondary metadata to ensure the primary white-ish text (`on_surface`: #dae2fd) pops against the dark slate backgrounds.

---

## 4. Elevation & Depth

In this system, depth is a functional tool for data organization, not just decoration.

- **The Layering Principle:** Stacking is the primary method of elevation.
    - _Level 0:_ `surface` (Background)
    - _Level 1:_ `surface-container-lowest` (Global Nav)
    - _Level 2:_ `surface-container-low` (Main Workspace)
    - _Level 3:_ `surface-container-high` (Data Cards)
- **Ambient Shadows:** For "floating" elements like Tooltips or Modals, use an extra-diffused shadow: `0px 12px 32px rgba(6, 14, 32, 0.40)`. The shadow color is derived from `surface-container-lowest` to ensure it feels like a natural light occlusion.
- **The "Ghost Border" Fallback:** If a container requires further definition (e.g., in high-density data tables), use a `1px` border using `outline_variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components & Data Visualization

### Cards (The "Modular Unit")

- **Styling:** No borders. Use `surface-container-low` with a `lg` (0.5rem) corner radius.
- **Internal Layout:** Forbid the use of divider lines. Use `1.5rem` (24px) of vertical whitespace to separate header, body, and footer sections.

### Buttons & Inputs

- **Primary Button:** `primary` (#7bd0ff) background with `on_primary` (#00354a) text. Shape: `md` (0.375rem).
- **Input Fields:** Use `surface-container-highest` for the field background. The active state is indicated by a `2px` bottom-bar in `primary`, rather than a full box stroke.

### Semantic Status Indicators

Use the following tokens for status-driven data:

- **Success:** `#10B981` (Success Green) - Used for "Within Safe Limits."
- **Warning:** `#FBBF24` (Warning Yellow) - Used for "Maintenance Required."
- **Danger:** `#EF4444` (Danger Red) - Used for "Threshold Exceeded."

### Precision Chips

Used for filtering sensor types (e.g., "CO2", "Humidity"). Use `surface-container-highest` with a `full` (9999px) radius and `label-md` typography.

### Data Viz Specifics

- **Sparklines:** Use `primary` for the stroke. Fill the area under the curve with a gradient transitioning from `primary` (20% opacity) to `surface` (0% opacity).
- **Axes:** Use `outline` (#909097) for axis labels, but omit the axis lines themselves to keep the charts "breathable."

---

## 6. Do's and Don'ts

### Do

- **Do** use asymmetrical card layouts to prioritize the most critical real-time stream.
- **Do** utilize `on_surface_variant` for all non-essential labels to maintain a clear visual hierarchy.
- **Do** apply `backdrop-filter: blur(12px)` to any overlay to maintain the "frosted glass instrument" feel.
- **Do** ensure that semantic colors (Red/Yellow/Green) are used sparingly so they effectively "scream" against the muted slate foundation.

### Don't

- **Don't** use 1px solid borders to separate sections or cards.
- **Don't** use pure black (#000000) or pure white (#FFFFFF). Use the provided `surface` and `on_surface` tokens to maintain the technical, low-glare aesthetic.
- **Don't** use standard "drop shadows" with high opacity. Stick to Tonal Layering for 90% of the UI.
- **Don't** use "default" icon weights. Use thin-stroke (Light or Regular) icons to match the precision of the Inter typeface.
