class PricingCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'title',
      'price',
      'interval',
      'features',
      'cta-text',
      'cta-url',
      'disabled'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._features = [];
    this._onCtaClick = this._onCtaClick.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'features') {
      this._features = this._parseFeatures(newValue);
      this._render();
      return;
    }

    this._render();
  }

  connectedCallback() {
    // Initialize defaults if not provided
    if (!this.hasAttribute('cta-text')) this.setAttribute('cta-text', 'Start Trial');
    if (!this.hasAttribute('interval')) this.setAttribute('interval', '/month');

    // Parse features once on connect
    this._features = this._parseFeatures(this.getAttribute('features'));

    this._render();
  }

  set features(value) {
    this._features = Array.isArray(value) ? value : this._parseFeatures(value);
    this._render();
  }

  get features() {
    return this._features;
  }

  _parseFeatures(value) {
    if (!value) return [];
    try {
      if (typeof value === 'string') {
        // Support comma-separated or JSON array strings
        const trimmed = value.trim();
        if (trimmed.startsWith('[')) {
          const arr = JSON.parse(trimmed);
          return Array.isArray(arr) ? arr : [];
        }
        return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
      }
      return Array.isArray(value) ? value : [];
    } catch (e) {
      console.warn('[pricing-card] Failed to parse features:', e);
      return [];
    }
  }

  _onCtaClick(e) {
    if (this.hasAttribute('disabled')) {
      e.preventDefault();
      return;
    }
    const url = this.getAttribute('cta-url');
    const detail = {
      title: this.getAttribute('title') || '',
      price: this.getAttribute('price') || '',
      interval: this.getAttribute('interval') || '',
      features: this._features
    };

    this.dispatchEvent(new CustomEvent('pricing-card:cta', { detail, bubbles: true }));

    if (url) {
      window.location.href = url;
    }
  }

  _render() {
    if (!this.shadowRoot) return;

    const title = this.getAttribute('title') || '';
    const price = this.getAttribute('price') || '';
    const interval = this.getAttribute('interval') || '';
    const ctaText = this.getAttribute('cta-text') || 'Start Trial';
    const disabled = this.hasAttribute('disabled');

    const styles = `
      :host {
        --card-bg: #ffffff;
        --card-fg: #0f172a;
        --border: #e5e7eb;
        --muted: #6b7280;
        --accent: #2563eb;
        --accent-hover: #1d4ed8;
        --success: #16a34a;
        --radius: 12px;
        --shadow: 0 10px 20px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.06);
        display: block;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      }

      .card {
        background: var(--card-bg);
        color: var(--card-fg);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        border: 1px solid var(--border);
        padding: 20px;
        max-width: 360px;
      }

      .header { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }

      .title { font-size: 1.125rem; font-weight: 700; margin: 0; }
      .subtitle { margin: 0; font-size: 0.875rem; color: var(--muted); }

      .priceWrap { display: flex; align-items: baseline; gap: 6px; margin-top: 8px; }
      .price { font-size: 2rem; font-weight: 800; color: var(--success); line-height: 1; }
      .interval { color: var(--muted); }

      ul.features { list-style: none; padding: 0; margin: 16px 0 0; }
      ul.features li { display: grid; grid-template-columns: 20px 1fr; align-items: start; gap: 8px; padding: 10px 0; border-top: 1px dashed var(--border); }
      ul.features li:first-child { border-top: none; }
      .check { color: var(--success); font-weight: 700; }

      .actions { margin-top: 16px; }
      .btn {
        background: var(--accent);
        color: white;
        padding: 12px 16px;
        border: none;
        border-radius: 8px;
        width: 100%;
        font-weight: 600;
        cursor: pointer;
        transition: background .15s ease, transform .05s ease;
      }
      .btn:hover { background: var(--accent-hover); }
      .btn:active { transform: translateY(1px); }
      .btn:focus-visible { outline: 3px solid rgba(37,99,235,.35); outline-offset: 2px; }
      .btn[disabled] { opacity: .6; cursor: not-allowed; }

      @media (prefers-color-scheme: dark) {
        :host { --card-bg: #0b1220; --card-fg: #e5e7eb; --border: #1f2937; --muted: #9ca3af; --shadow: 0 10px 20px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2); }
      }
    `;

    const featuresList = this._features.map((f) => `
      <li>
        <span class="check" aria-hidden="true">✓</span>
        <span>${this._escapeHtml(String(f))}</span>
      </li>
    `).join('');

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <article class="card" role="group" aria-label="${this._escapeAttr(title)} plan">
        <header class="header">
          <h3 class="title">${this._escapeHtml(title)}</h3>
          <p class="subtitle"><slot name="tag"></slot></p>
        </header>
        <div class="priceWrap" aria-live="polite">
          <div class="price">${this._escapeHtml(price)}</div>
          <div class="interval">${this._escapeHtml(interval)}</div>
        </div>
        <ul class="features">${featuresList}</ul>
        <div class="actions">
          <button type="button" class="btn" ${disabled ? 'disabled' : ''}>${this._escapeHtml(ctaText)}</button>
        </div>
      </article>
    `;

    const btn = this.shadowRoot.querySelector('.btn');
    if (btn) {
      btn.removeEventListener('click', this._onCtaClick);
      btn.addEventListener('click', this._onCtaClick);
    }
  }

  _escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  _escapeAttr(str) {
    return this._escapeHtml(str).replace(/"/g, '&quot;');
  }
}

customElements.define('pricing-card', PricingCard);
