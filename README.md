# Best Practices and Workflow Optimization with AI – Pricing Card Fix & Refactor

This mini-project fixes a broken pricing card snippet, then refactors it into a reusable, accessible Web Component you can drop into any page.

## Files

- `before/pricing-card-broken.html` – The original, broken snippet (as provided).
- `src/components/pricing-card.js` – Reusable `<pricing-card>` Web Component with Shadow DOM.
- `public/index.html` – Demo page showing multiple cards in a responsive grid.
- `PROMPT.md` – The AI prompt used to perform the fix and refactor.

## What was fixed

- Corrected CSS typos (e.g., `box-shdow` → `box-shadow`).
- Closed unclosed tags (`<h2>` → `</h2>`).
- Improved layout by removing fixed width and using max-width for responsiveness.
- Added hover/focus states and made the button interactive (clicks emit a custom event and can optionally navigate via `cta-url`).
- Improved accessibility (semantics, focus styles, `aria-label`, color contrast).

## Reusable Component API

Custom Element: `<pricing-card>`

Attributes:
- `title` (string)
- `price` (string)
- `interval` (string, e.g., "/month")
- `features` (JSON array string or comma-separated string)
- `cta-text` (string, default: "Start Trial")
- `cta-url` (string, optional – if present, clicking will navigate)
- `disabled` (boolean attribute)

Slots:
- `slot="tag"` – Optional small label badge in the header (e.g., "Most Popular").

Events:
- `pricing-card:cta` – Bubbles; `detail` has `{ title, price, interval, features }`.

## Quick start

Open the demo locally:

```bash
# From the repo root
python3 -m http.server 8000
# Then open http://localhost:8000/public/index.html
```

Or use any static server / VS Code Live Server extension.

## Example usage

```html
<script type="module" src="/src/components/pricing-card.js"></script>

<pricing-card
  title="Pro"
  price="$29.99"
  interval="/month"
  features='["100 GB Storage", "Priority Support", "Advanced Analytics"]'
  cta-text="Upgrade"
  cta-url="/checkout"
>
  <span slot="tag">Most Popular</span>
</pricing-card>

<script>
  document.addEventListener('pricing-card:cta', (e) => {
    console.log('CTA clicked:', e.detail);
  });
</script>
```

## Before vs After (high level)

- Before: fixed 300px width, misspelled `box-shadow`, unclosed `<h2>`, basic styles, non-interactive button.
- After: responsive, accessible Web Component with theming via CSS variables, keyboard-friendly button, custom event, and demo.

## Notes

- The component supports light/dark mode automatically via `prefers-color-scheme`.
- You can theme it by overriding CSS vars on the host (e.g., `--accent`, `--radius`).
