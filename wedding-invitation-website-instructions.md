# Build Brief: One-Page Indian Wedding Invitation Website

## Your role
Act as a senior UI/UX designer and frontend engineer. Build a polished, responsive, one-page Indian wedding invitation website from the supplied photos and JSON data. Treat this brief as the source of truth. The result should feel like a bespoke digital wedding invitation: romantic, Indian, elegant, warm, editorial, and modern—not a generic event landing page or an admin dashboard.

## Main objective
Create one continuous, beautifully art-directed page that introduces the couple, presents the wedding events and their dates, lets guests filter a location/event directory by category, shows nearby places on an interactive map within an **8 km radius**, and includes a live countdown to the wedding ceremony.

Use the existing app/framework if one already exists. Do not replace a working stack unnecessarily. If starting from scratch, choose a lightweight modern frontend approach. Keep the experience as a **single page** with smooth in-page navigation; do not create separate pages for events, locations, or the couple. Keep the event and location content data-driven from the supplied JSON rather than hardcoding it into the UI.

---

## 1. Supplied assets and data

Expect these inputs (actual filenames may differ; map the available files to their purpose):

1. **Groom square portrait** — use for the groom’s profile/card and smaller decorative portrait placements.
2. **Bride square portrait** — use for the bride’s profile/card and smaller decorative portrait placements.
3. **Couple landscape photo, 16:9** — use for the hero/banner or a wide editorial photo panel.
4. **Couple portrait photo, 2:3** — use for a tall, intimate couple feature lower on the page or as a responsive mobile hero alternative.
5. **JSON data file** — supplies event details, locations, and both families’ information.

Use the supplied photos as the real couple imagery. Do not generate replacement faces, alter identities, or use unrelated stock couples. Preserve natural aspect ratios and crop with `object-fit: cover` only where needed. Add meaningful alt text using names from the data when available.

### Expected JSON contract
Adapt to the exact property names in the provided JSON if they differ from these examples. Do not require the user to rename valid existing fields just to match this brief.

```json
{
  "events": [
    {
      "name": "Wedding Ceremony",
      "date": "2026-11-30",
      "day": "Monday",
      "time": "10:00 PM",
      "venue": "Bride's location"
    }
  ],
  "locations": [
    {
      "name": "Groom",
      "category": "House",
      "coordinates": {
        "latitude": 22.70775,
        "longitude": 85.53519
      }
    }
  ],
  "groom": {
    "name": "Groom's full name",
    "relation": "Son of",
    "parents": {
      "father": "Father's name",
      "mother": "Mother's name"
    }
  },
  "bride": {
    "name": "Bride's full name",
    "relation": "Daughter of",
    "parents": {
      "father": "Father's name",
      "mother": "Mother's name"
    }
  }
}
```

The JSON above is illustrative only. Use the actual supplied data in the finished UI. If a field is missing, gracefully omit that line or show a tasteful fallback; never render `undefined`, `null`, `Invalid Date`, or broken coordinate values. Dates should be parsed as calendar dates, not accidentally shifted by UTC conversion. Treat wedding event times as India Standard Time (`Asia/Kolkata`) unless the source data explicitly specifies another timezone.

### Coordinate handling
- Prefer decimal latitude and longitude values.
- If the source contains DMS strings (degrees/minutes/seconds), convert them safely to decimal coordinates before using them on the map.
- Validate latitude and longitude ranges before plotting a marker.
- If the center point or coordinates cannot be resolved, show a helpful empty state rather than a misleading map.

---

## 2. Visual direction: Indian romantic editorial

### Overall mood
Think contemporary Indian wedding stationery blended with a premium editorial website: soft blush paper, warm ivory panels, delicate botanical line art, traditional gold detailing, graceful typography, and a distinctive blue–purple–lavender floral glow. The design should feel celebratory but restrained. Let whitespace, large photography, fine borders, and typography do most of the work.

Use Indian-inspired decorative cues respectfully and sparingly: fine mandala or jaali-like linework, delicate floral vines, lotus-inspired geometry, miniature paisley details, and ornamental dividers. Prefer elegant line art or low-opacity texture over heavy clip-art, crowded motifs, or competing patterns.

### Required design tokens
Use these colours consistently throughout the website. Define them as CSS custom properties/design tokens rather than scattering raw hex values everywhere.

| Token | Hex | Intended use |
|---|---|---|
| Peach Blush | `#FBE5E0` | Main page background; warm blush canvas |
| Coral Rose | `#F39E99` | Hero accents, primary buttons, selected emphasis and soft accent panels |
| Warm Ivory | `#FFFCF7` | Invitation cards, content surfaces and readable text panels |
| Royal Cobalt Blue | `#2273B3` | Floral highlights, selected controls and select interactive details |
| Soft Periwinkle | `#658FCB` | Gradient transitions and secondary accents |
| Lavender Mist | `#D6B9D9` | Decorative highlights and floral accents |
| Periwinkle Lavender | `#A9A4DB` | Gradient midpoint and subtle ornaments |
| Dusty Mauve | `#C8A2B8` | Secondary flowers, small decorative marks and supporting accents |
| Champagne Gold | `#B5A88B` | Fine borders, traditional ornaments, dividers and tiny highlights |
| Dark Olive Grey | `#444842` | Primary text, headings and readable body copy |

Approximate colour distribution: **35% Peach Blush, 30% Warm Ivory, 15% Coral Rose, 12% Blue/Lavender, 8% Gold and other details.** These are visual guidelines, not rigid quotas. Keep body text readable against every surface. Do not use pale lavender or gold for long paragraphs.

### Signature blue–purple–lavender gradient
This is a key visual identity element. Reuse this exact gradient as the starting point, then tune opacity and blending to suit each component:

```css
linear-gradient(
  115deg,
  #2273B3 0%,
  #658FCB 28%,
  #A9A4DB 55%,
  #D6B9D9 75%,
  #F3B9B5 100%
)
```

Use it selectively for floral artwork, a soft hero glow, ornamental dividers, active/selected states, thin borders, and a small number of decorative accents. The transition should be soft, romantic, and fluid. Avoid neon blue, oversaturated purple, hard colour bands, or large areas of loud gradient. For pastel effects, layer this gradient behind a white/blush translucent veil or use it at low opacity.

### Typography
- Pair a refined **editorial serif** for the couple’s names, section titles, and invitation statements with a clean, highly legible sans-serif for details and controls.
- A graceful italic serif may be used for short phrases such as “Together with our families” or “joyfully invite you”.
- Keep event dates and times easy to scan; decorative type must never reduce legibility.
- Use restrained letter spacing for small uppercase eyebrow labels.
- Use fluid responsive type (`clamp()`) for the main heading and large names.
- If external fonts are unavailable, use a compatible serif/sans-serif fallback with the same visual character.

### Surface and ornament styling
- Prefer warm, lightly textured backgrounds, fine champagne-gold rules, soft shadows, curved corners, and double-line invitation borders.
- Use subtle translucent panels or barely visible botanical patterns—not heavy glassmorphism.
- Add tiny ornamental separators between selected sections.
- Use rounded corners consistently; do not make every element a pill.
- Buttons and controls should feel like part of the invitation stationery, not a SaaS dashboard.

---

## 3. One-page information architecture

Build the page in the following order. The design can flex responsively, but all of these content areas must exist.

### A. Minimal top navigation
- A small monogram, floral mark, or couple-name lockup on the left.
- In-page links such as **The Couple**, **Celebrations**, **Places**, and **Our Invitation**.
- A subtle “Save the Date” or “View Events” action that scrolls to the relevant section.
- Keep navigation lightweight and discreet. It may become sticky after the hero, with a warm ivory translucent background and a fine gold divider.
- On mobile, use a compact accessible menu or a simple horizontally scrollable navigation; avoid crowding.

### B. Hero / invitation cover
- Use the supplied **16:9 couple photo** as the main editorial photograph, preferably in a wide framed layout with intentional whitespace.
- Show a small invitation line, the couple’s names prominently, and a short family invitation statement.
- Present the main wedding date attractively and clearly, derived from the event JSON (prefer the event named “Wedding Ceremony”).
- Include a clear **Explore Celebrations** button that scrolls smoothly to the event section.
- Add understated Indian botanical or mandala line art around the frame, a fine gold border, and one selective blue–lavender gradient accent.
- Give the hero visual breathing room. Do not cover the couple’s faces with text, particles, or ornaments.
- If an especially wide desktop composition would crop faces, use `object-position` thoughtfully and consider a layered layout with the photo beside the text rather than forcing a full-bleed crop.

### C. Countdown to the wedding
Create a prominent but elegant countdown module, visually integrated with the invitation—not an oversized digital timer widget.

- Countdown units: **Days, Hours, Minutes, Seconds**.
- Update once per second with a stable interval and clean up the timer on unmount/destroy.
- Target the date/time of the event whose name most closely identifies the actual **Wedding Ceremony**. Do not target the reception or first pre-wedding event if a wedding ceremony event exists.
- If the source only provides a date and no reliable time, count down to a documented default such as 00:00 IST on that date, and label that choice clearly or configure the target explicitly. Prefer the actual ceremony time whenever provided.
- If the target is in the past, replace a negative timer with a graceful state such as **“The celebrations have begun”** or **“With love, from our wedding day”**. Never show negative numbers.
- Keep the countdown accurate across midnight and daylight/date boundaries. Use the intended timezone (`Asia/Kolkata` by default).
- Style the digits in a refined serif or tabular numeral face, with small uppercase unit labels and fine separators.
- Add an optional quiet floral accent near the countdown, without distracting from the numbers.

### D. Couple and family introduction
- Feature the groom and bride as two balanced profiles, using their respective square portrait images.
- Show each person’s full name, relation label, and parents’ names from JSON.
- Use elegant name typography, small floral details, and a fine divider between profiles on desktop; stack gracefully on mobile.
- Use respectful wording from the data, such as “Son of” and “Daughter of”, rather than hardcoding these phrases if the JSON already defines them.
- Include the supplied **2:3 portrait couple image** in a tall editorial photo composition, either beside the family details or in a separate “A little about us” moment. Avoid repeating the exact same image crop in adjacent sections.

### E. Celebrations / event timeline
Make this a visual highlight of the page. Guests must quickly understand **what is happening, on which date, at what time, and where**.

- Create a vertical timeline or elegant event-card sequence with fine gold connectors and restrained botanical markers.
- Render events from the JSON in chronological order when dates/times are parseable. If order cannot be resolved, preserve source order.
- Every event item must display: **event name, date, day, time, and venue**.
- Format dates in a warm editorial style (for example, `MONDAY · 30 NOVEMBER 2026`) while retaining the original data’s meaning. Avoid fabricating a day if it is missing; derive it from the date only when safe.
- Give the principal **Wedding Ceremony** a modest visual emphasis, such as a gradient edge, larger date, or champagne-gold ornament. Do not turn every event into a competing hero.
- Pre-wedding functions should still be easy to browse and understand.
- On small screens, make cards comfortably readable and avoid tiny timeline labels.

### F. Places directory with category filters and interactive map
This section is a core functional requirement. It must contain both a **filterable directory/table** and an **interactive map**.

#### Filter controls
- Provide category tabs/chips including **All** plus every distinct category found in the locations JSON.
- The **All** tab must be selected by default and must show every valid location in the directory.
- Clicking a category filters both the directory and, preferably, the visible map markers so the two views stay in sync.
- Clearly style the selected category using the signature blue–purple–lavender gradient sparingly, with accessible text contrast.
- Include a live result count (for example, “8 places”) that updates as filters change.
- If there are many locations, add a small search input that filters by location name and category. Search and category selection should work together.
- Include an obvious “Reset” or “All places” way to clear filtering if a search field is present.

#### Directory/table
- On desktop, use a clean table or carefully aligned list with at least **Name** and **Category**, plus an action such as **View on map** or **Directions** when coordinates are valid.
- A compact mobile card/list layout may replace the table on smaller screens; do not force users to pan a wide table horizontally unless absolutely necessary.
- Clicking “View on map” should focus/open the corresponding marker or scroll/focus the map. Clicking “Directions” should open a map service with the selected destination coordinates in a new tab.
- Use the categories as actual data values, not a hardcoded short list.
- Provide a gentle empty state when no locations match the current filter/search.

#### Interactive map and 8 km radius
- Use a real interactive map library such as **Leaflet with OpenStreetMap tiles**, unless the existing project already has a suitable map integration. Avoid requiring a paid map API key for the base implementation.
- Plot every location that has valid coordinates and visually distinguish marker categories where practical. Marker colours or small icons should harmonize with the supplied palette and remain distinguishable.
- Determine the **8 km radius centre** in this priority order:
  1. Coordinates of the event venue for the **Wedding Ceremony**, if that venue can be matched to a location record.
  2. The primary wedding venue or designated central/groom location configured in the data.
  3. The first valid location as a documented fallback.
- Draw a subtle **8 km circle** around that centre, with a pale blue/lavender stroke/fill and enough transparency that map labels remain visible.
- Calculate the distance from the centre to each valid location using the **Haversine formula** (or a reliable geospatial equivalent). Identify which locations are within or equal to 8 km.
- The default map view should emphasize locations **within the 8 km radius**. Use a compact legend or short explanatory label such as “Nearby places · within 8 km of [centre name]”.
- Do not silently discard valid locations outside the radius. Either show them using a muted/outside-radius style with a clear legend, or provide a simple “Within 8 km / All locations” control. The selected category filter must continue to behave predictably in both modes.
- Show useful marker popups with the place name, category, and calculated distance from the centre when available. Do not invent distances.
- Fit the map bounds to the 8 km circle or the in-radius markers while keeping the centre and nearby places visible. Ensure the map resizes correctly when its container changes size.
- Add a visible attribution for the map and tile provider as required by the provider’s terms.
- If no valid center/coordinates exist, render an informative map placeholder with a message explaining that location coordinates are needed; do not show fabricated pins.

#### Location privacy and fallback
This is a wedding guest guide, so only plot coordinates intentionally present in the supplied JSON. Do not infer a private address from a name. For missing coordinates, keep the place in the directory if its name/category are valid, but disable map/directions actions and mark its location as unavailable.

### G. Closing invitation / RSVP-style ending
- Finish with a warm closing statement inviting guests to celebrate with the couple.
- Repeat the main wedding date and an optional link/button to jump back to events or open directions to the ceremony venue if coordinate data is available.
- A full RSVP workflow is not required unless an RSVP link or data is supplied. Do not create a fake RSVP submission form or claim a response was sent.
- End with a delicate ornamental divider, couple-name lockup, or small floral illustration.

### H. Footer
- Keep it minimal: couple names, wedding date, and a small “Made with love” sentiment if appropriate.
- Do not clutter it with generic social links, copyright boilerplate, or unrelated content.

---

## 4. Subtle animation and ambience

Animation should create a soft celebratory feeling, never compete with the photographs, text, or event information.

### Falling flower petals
- Add a small, lightweight layer of falling flower petals on the hero and/or as a fixed decorative layer across the page.
- Use a restrained mixture of petal silhouettes in soft blush, ivory, pale coral, and occasional low-opacity lavender. The blue–purple gradient may appear on only a few petals or ornaments.
- Animate drifting and falling with CSS keyframes or an equally lightweight method. Vary start position, duration, size, rotation, and delay so the movement feels natural rather than synchronized.
- Keep the overall quantity low. Petals should be sparse, slow, translucent, and behind the content. They must never obscure faces, cover controls, reduce text contrast, or intercept pointer/touch input (`pointer-events: none`).
- Prefer CSS shapes or tiny inline SVG petal silhouettes to large animation libraries. Clean up any generated animation nodes if a JavaScript approach is used.
- Ensure petals do not cause horizontal overflow, layout shifts, or excessive CPU usage on low-powered phones.

### Other motion
- Use gentle opacity/translate entrances for section headings and cards as they enter the viewport, if supported cleanly. Respect reduced-motion preferences.
- Apply small hover transitions to buttons, location rows, category tabs, and event cards—around 150–300 ms, with no dramatic scaling.
- Decorative flowers may drift slightly or softly rotate, but avoid constant attention-grabbing motion.
- Smooth-scroll for in-page navigation where supported. Avoid parallax that makes text or the map difficult to use.
- Do not animate every component independently. The whole page should feel calm and intentional.

### Accessibility and reduced motion
- Respect `prefers-reduced-motion: reduce`: stop or greatly reduce falling petals, scroll behavior, and entrance animations while preserving all information and functionality.
- Decorative layers must be hidden from assistive technologies (`aria-hidden="true"`).
- Never convey event status, selection, or map radius only by colour; pair colour with text, shape, or an accessible state.

---

## 5. Interaction requirements

All of the following should work, not merely look interactive:

1. Navigation links scroll to the correct section.
2. Countdown updates live and handles past/missing dates gracefully.
3. Event cards render from JSON and show all required fields.
4. Event ordering is chronological where the dates are valid.
5. Location tabs include **All** and dynamically generated categories.
6. Search (if included) combines correctly with the category filter.
7. Directory and map markers stay synchronized with filters and radius mode.
8. A directory action can focus the related marker or open directions for that specific place.
9. The map displays the 8 km radius circle and distances when valid data is available.
10. Missing fields, an empty category, or invalid coordinates do not break the page.
11. Mobile navigation and interactive controls are keyboard-accessible and touch-friendly.
12. Animations do not block clicks, scrolling, selection, or map controls.

---

## 6. Responsive layout requirements

Design mobile-first and verify at narrow phone, standard phone, tablet, laptop, and large desktop sizes.

- **Desktop:** balanced editorial composition, spacious two-column areas where appropriate, timeline and map clearly composed, restrained maximum content width.
- **Tablet:** reduce oversized spacing and switch complex multi-column blocks to simpler grids as needed.
- **Mobile:** stack the hero, couple profiles, event cards, and map/directory naturally; keep key dates visible; ensure map height remains usable; show category chips that can wrap or scroll horizontally.
- Use generous touch targets (ideally around 44 × 44 CSS pixels for primary interactive controls).
- Prevent horizontal overflow, clipped names, overlapped text, and awkward portrait crops.
- Use fluid spacing and type scales rather than device-specific hacks wherever possible.

---

## 7. Accessibility, semantics, and performance

- Use semantic landmarks and a logical heading hierarchy. There should be one main page heading.
- All controls need visible keyboard focus, descriptive labels, and keyboard operation.
- Use sufficient contrast for body text and controls. Decorative champagne gold should not be used as small text on ivory/blush backgrounds.
- Add alt text to meaningful photographs; mark ornamental SVGs and petal layers as decorative.
- Provide accessible names for category filters and communicate selected state using a suitable attribute/state.
- Avoid relying on hover as the only way to reveal essential information.
- Lazy-load below-the-fold photography where sensible, but do not lazy-load the primary hero image if it harms the initial visual impression.
- Size and compress images appropriately; preserve image quality for portraits.
- Avoid large animation, icon, or UI dependencies for effects that can be created with CSS.
- Clean up intervals, observers, event listeners, map instances, and generated nodes when components are destroyed/unmounted.
- Handle font/image/map loading gracefully and prevent layout shifts where reasonable.

---

## 8. Implementation guidance

- First inspect the existing codebase and the exact JSON/assets supplied. Reuse the existing framework, project conventions, and styling approach unless there is a strong reason not to.
- Build one continuous page and keep content data-driven. Use a small data-adapter/normalization layer if the source JSON field names or date formats vary.
- Centralize the design palette, typography, spacing, radii, shadows, and motion durations as CSS variables/design tokens.
- Keep date parsing/timezone handling, Haversine distance calculation, category filtering, map updates, and countdown logic in clear reusable functions rather than embedding complex calculations in templates.
- If a framework template is used, avoid inline filtering or assignment expressions that the template parser does not support; precompute filtered collections in code.
- For the map, invalidate/recalculate map size after layout changes and ensure markers/layers are updated rather than duplicated on every filter change.
- Do not use fake hardcoded map markers or distances. Valid locations should come from the provided JSON.
- Do not add a backend, login, database, analytics, RSVP submission, or external tracking unless the existing project already requires it.
- Do not invent personal details, family names, event times, venue addresses, or ceremony locations that are not in the supplied data.

### Suggested design tokens beyond the supplied palette
Define a small, consistent set of additional variables for layout and motion, for example:

```css
:root {
  --color-peach-blush: #FBE5E0;
  --color-coral-rose: #F39E99;
  --color-warm-ivory: #FFFCF7;
  --color-royal-cobalt: #2273B3;
  --color-soft-periwinkle: #658FCB;
  --color-lavender-mist: #D6B9D9;
  --color-periwinkle-lavender: #A9A4DB;
  --color-dusty-mauve: #C8A2B8;
  --color-champagne-gold: #B5A88B;
  --color-dark-olive-grey: #444842;

  --gradient-signature: linear-gradient(
    115deg,
    #2273B3 0%,
    #658FCB 28%,
    #A9A4DB 55%,
    #D6B9D9 75%,
    #F3B9B5 100%
  );

  --font-display: Georgia, "Times New Roman", serif;
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --content-max: 1180px;
  --section-space: clamp(4rem, 8vw, 7.5rem);
  --radius-card: 1.25rem;
  --shadow-soft: 0 14px 40px rgb(68 72 66 / 8%);
  --motion-fast: 180ms;
  --motion-standard: 260ms;
}
```

Treat these additional values as a starting point and refine them to match the design. Do not alter the required palette without a clear usability reason.

---

## 9. Acceptance checklist

Before calling the implementation complete, verify each item:

- [ ] The page reads as a cohesive Indian wedding invitation, not a generic template.
- [ ] All four supplied images are used in appropriate compositions, with no distorted aspect ratios.
- [ ] Couple names, relationships, and parents are read from JSON.
- [ ] Every event displays name, date, day, time, and venue when those fields are available.
- [ ] The wedding countdown targets the actual Wedding Ceremony event and displays Days / Hours / Minutes / Seconds.
- [ ] The page contains an **All** locations filter and one filter per JSON category.
- [ ] Category filtering, optional search, result count, and empty states work correctly.
- [ ] The map uses real coordinates from the JSON and displays an 8 km radius around the documented centre.
- [ ] The distance calculation is correct and locations outside the radius are handled transparently.
- [ ] Selecting a place in the directory focuses its marker or opens correct directions.
- [ ] Petal animations are subtle, performant, behind content, and disabled/reduced for reduced-motion users.
- [ ] The page is responsive, keyboard-usable, and has sensible contrast and focus styles.
- [ ] No console errors, broken images, invalid dates, duplicate map markers, or fabricated data remain.
- [ ] The finished output contains no placeholder text where supplied data is available.

## Final design principle
**Make it feel like opening a lovingly crafted Indian wedding invitation, then discovering a practical guest guide inside it.** The photography and names should carry the emotion; the Peach Blush and Warm Ivory should make the page feel warm; the selective blue–purple–lavender gradient should be the distinctive signature; the gold and traditional ornament should provide a fine stationery finish. Keep every animation subtle, every date clear, and every location useful.
