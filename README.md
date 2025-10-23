# Pricing Card Web Component

A reusable, accessible, and responsive pricing card Web Component built with Shadow DOM.

## Issues Fixed from Original Snippet

1. **CSS Typo**: Fixed `box-shdow` → `box-shadow`
2. **HTML Structure**: Fixed unclosed `<h2>` tag
3. **Semantic HTML**: Improved structure with proper headings and lists
4. **Accessibility**: Added ARIA labels, focus styles, and semantic roles
5. **Responsiveness**: Added mobile-first responsive design
6. **Theming**: Implemented CSS custom properties for easy theming
7. **Interactivity**: Added proper event handling and navigation

## Component API

### Attributes
- `title` - Plan title (default: "Plan")
- `price` - Price value (default: "$0")                features='["100 MB Storage", "Community Support", "Basic Features"]'
                cta-text="Get Started"
                disabled>
            </pricing-card>
        </div>
<br><br>
        <div class="event-log">
            <h3>Event Log</h3>
            <div id="event-list">
                <div class="event-item">Ready to receive pricing card events...</div>
            </div>
        </div>
    </div>

- `interval` - Billing interval (default: "month")
- `features` - JSON array or comma-separated features list
- `cta-text` - Button text (default: "Start Trial")
- `cta-url` - Optional URL for navigation
- `disabled` - Boolean attribute to disable the button

### Slots
- `slot="tag"` - Optional header badge/tag

### Events
- `pricing-card:cta` - Dispatched when CTA button is clicked
  - Event detail: `{ title, price, interval, features }`

## Usage

```html
<!-- Basic usage -->
<pricing-card 
  title="Basic Plan"
  price="$9.99"
  interval="month"
  features='["1 GB Storage", "Basic Support", "All Core Features"]'
  cta-text="Start Trial">
</pricing-card>

<!-- With tag and navigation -->
<pricing-card 
  title="Pro Plan"
  price="$29.99"
  interval="month"
  features='["10 GB Storage", "Priority Support", "Advanced Features"]'
  cta-text="Go Pro"
  cta-url="/signup/pro">
  <span slot="tag">Popular</span>
</pricing-card>

<!-- Disabled state -->
<pricing-card 
  title="Free Plan"
  price="$0"
  interval="month"
  features='["100 MB Storage", "Community Support"]'
  disabled>
</pricing-card>
```

## Theming

The component supports theming via CSS custom properties:

```css
pricing-card {
  --card-bg: #ffffff;
  --card-border: #e1e5e9;
  --text-primary: #1f2937;
  --text-accent: #059669;
  --button-bg: #3b82f6;
  --button-bg-hover: #2563eb;
  /* ... and more */
}
```

## Features

- ✅ **Shadow DOM** - Encapsulated styling and behavior
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessibility** - ARIA labels, focus management, semantic HTML
- ✅ **Theming** - CSS custom properties support
- ✅ **Event System** - Custom events with detailed payload
- ✅ **Navigation** - Optional URL-based navigation
- ✅ **Dark Mode** - Automatic dark theme support
- ✅ **Modern CSS** - Flexbox, CSS Grid, custom properties
- ✅ **Cross-browser** - Works in all modern browsers

## Alignment improvements

Cards now align consistently across rows in the demo grid:

- The grid explicitly stretches items so each row has equal-height cards.
- The `pricing-card` host fills its grid cell height, and the internal `.card` uses flex layout with the CTA pinned to the bottom.
- External hover scaling was removed in favor of internal shadow DOM hover effects to avoid visual misalignment.

If you embed the component elsewhere, ensure the parent layout allows items to stretch (e.g., CSS Grid with `align-items: stretch`) and set `pricing-card { height: 100%; }` when you want equal heights.

## Files

- `pricing-card.js` - Web Component implementation
- `demo.html` - Interactive demo with multiple themes
- `original-fixed.html` - Fixed version of the original snippet
- `README.md` - This documentation

## Browser Support

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Demo

Open `demo.html` in a browser to see the component in action with:
- Multiple pricing plans
- Theme switching
- Event logging
- Responsive grid layout
