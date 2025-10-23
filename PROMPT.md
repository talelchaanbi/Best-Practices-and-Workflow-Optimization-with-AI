# AI Prompt Used

You are a senior frontend engineer. I have a broken pricing card HTML/CSS snippet with layout issues and an unresponsive button. Please:

1) Identify and fix all layout and semantic bugs.
2) Refactor the solution into a reusable, accessible Web Component named `<pricing-card>` that uses Shadow DOM.
3) Make it responsive and themeable via CSS variables. Add focus-visible styles and suitable color contrast.
4) Add a CTA button that dispatches a custom event and optionally navigates if a `cta-url` attribute is provided.
5) Provide a minimal demo page displaying multiple cards in a responsive grid.

Component API:
- Attributes: `title`, `price`, `interval`, `features` (JSON array or comma-separated), `cta-text` (default "Start Trial"), optional `cta-url`, boolean `disabled`.
- Slots: `slot="tag"` for an optional header badge.
- Events: `pricing-card:cta` with detail `{ title, price, interval, features }`.

Original (broken) snippet:

```html
<!DOCTYPE html>
<html>
<head>
<style>
.pricing {
width: 300px;
margin: auto;
background-color: #fff;
box-shdow: 0 0 10px #ccc;
padding: 10px;
text-align: left;
}

.title {
font-size: 22px;
font-weight: bold;
}

.price {
font-size: 18px;
color: green;
}

.features {
list-style: none;
padding-left: 0;
}

.features li {
padding: 4px;
border-bottom: 1px solid #eee;
}

.btn {
background: blue;
color: white;
padding: 10px 20px;
border: none;
margin-top: 10px;
}

.btn:hover {
background: darkblue;
}
</style>
</head>
<body>

<div class="pricing">
<h2 class="title">Basic Plan<h2>
<p class="price">$9.99 /month</p>

<ul class="features">
<li>1 GB Storage</li>
<li>Basic Support</li>
<li>All Core Features</li>
</ul>

<button class="btn">Start Trial</button>
</div>

</body>
</html>
```
