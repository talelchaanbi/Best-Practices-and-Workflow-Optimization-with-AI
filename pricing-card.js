class PricingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'price', 'interval', 'features', 'cta-text', 'cta-url', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get title() {
    return this.getAttribute('title') || 'Plan';
  }

  get price() {
    return this.getAttribute('price') || '$0';
  }

  get interval() {
    return this.getAttribute('interval') || 'month';
  }

  get features() {
    const featuresAttr = this.getAttribute('features');
    if (!featuresAttr) return [];
    
    try {
      // Try to parse as JSON first
      return JSON.parse(featuresAttr);
    } catch {
      // Fall back to comma-separated values
      return featuresAttr.split(',').map(f => f.trim()).filter(f => f);
    }
  }

  get ctaText() {
    return this.getAttribute('cta-text') || 'Start Trial';
  }

  get ctaUrl() {
    return this.getAttribute('cta-url');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  handleCtaClick() {
    if (this.disabled) return;

    const event = new CustomEvent('pricing-card:cta', {
      detail: {
        title: this.title,
        price: this.price,
        interval: this.interval,
        features: this.features
      },
      bubbles: true
    });

    this.dispatchEvent(event);

    // Navigate if URL is provided
    if (this.ctaUrl) {
      window.location.href = this.ctaUrl;
    }
  }

  render() {
    const featuresHtml = this.features
      .map(feature => `<li>${this.escapeHtml(feature)}</li>`)
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --card-bg: #ffffff;
          --card-border: #e1e5e9;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --card-radius: 12px;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-accent: #059669;
          --button-bg: #3b82f6;
          --button-bg-hover: #2563eb;
          --button-bg-disabled: #9ca3af;
          --button-text: #ffffff;
          --tag-bg: #fef3c7;
          --tag-text: #92400e;
          --border-color: #e5e7eb;
          
          display: block;
          max-width: 100%;
          width: 100%;
          height: 100%;
        }

        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--card-radius);
          box-shadow: var(--card-shadow);
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .card-header {
          margin-bottom: 1.5rem;
        }

        .tag {
          position: absolute;
          top: -0.5rem;
          right: 1rem;
          background: var(--tag-bg);
          color: var(--tag-text);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
        }

        .price-container {
          margin-bottom: 1.5rem;
        }

        .price {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-accent);
          line-height: 1;
          margin: 0;
        }

        .interval {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-left: 0.25rem;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          flex-grow: 1;
        }

        .features li {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          position: relative;
          padding-left: 1.5rem;
        }

        .features li:last-child {
          border-bottom: none;
        }

        .features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--text-accent);
          font-weight: bold;
        }

        .cta-button {
          background: var(--button-bg);
          color: var(--button-text);
          border: none;
          border-radius: 0.5rem;
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
          width: 100%;
          margin-top: auto;
        }

        .cta-button:hover:not(:disabled) {
          background: var(--button-bg-hover);
          transform: translateY(-1px);
        }

        .cta-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .cta-button:disabled {
          background: var(--button-bg-disabled);
          cursor: not-allowed;
          transform: none;
        }

        .cta-button:focus-visible {
          outline: 2px solid var(--button-bg);
          outline-offset: 2px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .card {
            padding: 1.5rem;
          }
          
          .title {
            font-size: 1.25rem;
          }
          
          .price {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 1rem;
          }
          
          .price {
            font-size: 2rem;
          }
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          :host {
            --card-bg: #1f2937;
            --card-border: #374151;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --border-color: #374151;
            --tag-bg: #451a03;
            --tag-text: #fbbf24;
          }
        }
      </style>

      <div class="card">
        <div class="card-header">
          <slot name="tag"></slot>
          <h2 class="title">${this.escapeHtml(this.title)}</h2>
          <div class="price-container">
            <p class="price">
              ${this.escapeHtml(this.price)}
              <span class="interval">/${this.escapeHtml(this.interval)}</span>
            </p>
          </div>
        </div>

        <ul class="features" role="list">
          ${featuresHtml}
        </ul>

        <button 
          class="cta-button" 
          ${this.disabled ? 'disabled' : ''}
          aria-label="Choose ${this.escapeHtml(this.title)} plan"
        >
          ${this.escapeHtml(this.ctaText)}
        </button>
      </div>
    `;

    // Add event listener
    const button = this.shadowRoot.querySelector('.cta-button');
    button.addEventListener('click', () => this.handleCtaClick());
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Register the custom element
customElements.define('pricing-card', PricingCard);
