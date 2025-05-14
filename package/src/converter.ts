import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import tailwindcss from 'tailwindcss';
import { ConversionOptions } from './types';

export class DomToTailwind {
  private options: ConversionOptions;

  constructor(options: ConversionOptions = {}) {
    this.options = {
      includeComments: false,
      usePrefix: false,
      prefix: 'tw-',
      remInPx: 16,
      ignoreClasses: [],
      customUtilityMap: {},
      ...options
    };
  }

  public async convert(html: string): Promise<string> {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Process each element in the DOM
    const elements = document.body.querySelectorAll('*');
    for (const element of Array.from(elements)) {
      await this.processElement(element);
    }

    return document.body.innerHTML;
  }

  private async processElement(element: Element): Promise<void> {
    const style = element.getAttribute('style');
    if (!style) return;

    // Convert inline styles to Tailwind classes
    const tailwindClasses = await this.cssToTailwind(style);
    if (tailwindClasses.length === 0) return;

    // Get existing class list
    const existingClasses = element.getAttribute('class')?.split(' ') || [];

    // Add new Tailwind classes
    const allClasses = [...existingClasses, ...tailwindClasses];
    element.setAttribute('class', allClasses.join(' ').trim());

    // Remove style attribute if option is set
    element.removeAttribute('style');
  }

  private async cssToTailwind(css: string): Promise<string[]> {
    try {
      // Parse CSS to JS object
      const root = postcss.parse(`div { ${css} }`);
      const cssObj = postcssJs.objectify(root);

      // Convert CSS properties to Tailwind classes
      const tailwindClasses: string[] = [];
      
      for (const [property, value] of Object.entries(cssObj['div'] || {})) {
        if (typeof value === 'string' || typeof value === 'number') {
          const utilityClass = this.mapPropertyToUtility(property, String(value));
          if (utilityClass) {
            tailwindClasses.push(utilityClass);
          }
        }
      }

      return tailwindClasses;
    } catch (error) {
      console.error('Error converting CSS to Tailwind:', error);
      return [];
    }
  }

  private mapPropertyToUtility(property: string, value: string): string | null {
    // Check custom mappings first
    if (this.options.customUtilityMap?.[`${property}-${value}`]) {
      return this.options.customUtilityMap[`${property}-${value}`];
    }

    // Common property mappings
    const mappings: Record<string, (val: string) => string | null> = {
      'margin': (val) => `m-${this.parseSpacing(val)}`,
      'margin-top': (val) => `mt-${this.parseSpacing(val)}`,
      'margin-right': (val) => `mr-${this.parseSpacing(val)}`,
      'margin-bottom': (val) => `mb-${this.parseSpacing(val)}`,
      'margin-left': (val) => `ml-${this.parseSpacing(val)}`,
      'padding': (val) => `p-${this.parseSpacing(val)}`,
      'padding-top': (val) => `pt-${this.parseSpacing(val)}`,
      'padding-right': (val) => `pr-${this.parseSpacing(val)}`,
      'padding-bottom': (val) => `pb-${this.parseSpacing(val)}`,
      'padding-left': (val) => `pl-${this.parseSpacing(val)}`,
      'width': (val) => this.parseSize(val, 'w'),
      'height': (val) => this.parseSize(val, 'h'),
      'color': (val) => this.parseColor(val, 'text'),
      'background-color': (val) => this.parseColor(val, 'bg'),
      'font-size': (val) => this.parseFontSize(val),
      'font-weight': (val) => `font-${value}`,
      'text-align': (val) => `text-${value}`,
      'display': (val) => {
        const map: Record<string, string> = {
          'flex': 'flex',
          'inline-flex': 'inline-flex',
          'block': 'block',
          'inline-block': 'inline-block',
          'inline': 'inline',
          'grid': 'grid',
          'none': 'hidden'
        };
        return map[val] || null;
      },
      'flex-direction': (val) => {
        const map: Record<string, string> = {
          'row': 'flex-row',
          'row-reverse': 'flex-row-reverse',
          'column': 'flex-col',
          'column-reverse': 'flex-col-reverse'
        };
        return map[val] || null;
      },
      'justify-content': (val) => {
        const map: Record<string, string> = {
          'flex-start': 'justify-start',
          'flex-end': 'justify-end',
          'center': 'justify-center',
          'space-between': 'justify-between',
          'space-around': 'justify-around',
          'space-evenly': 'justify-evenly'
        };
        return map[val] || null;
      },
      'align-items': (val) => {
        const map: Record<string, string> = {
          'flex-start': 'items-start',
          'flex-end': 'items-end',
          'center': 'items-center',
          'baseline': 'items-baseline',
          'stretch': 'items-stretch'
        };
        return map[val] || null;
      },
      'border-radius': (val) => `rounded-${this.parseSpacing(val)}`,
      'border-width': (val) => `border-${this.parseSpacing(val)}`,
      'border-color': (val) => this.parseColor(val, 'border'),
      'position': (val) => val === 'static' ? null : val,
      'top': (val) => `top-${this.parseSpacing(val)}`,
      'right': (val) => `right-${this.parseSpacing(val)}`,
      'bottom': (val) => `bottom-${this.parseSpacing(val)}`,
      'left': (val) => `left-${this.parseSpacing(val)}`,
      'z-index': (val) => `z-${value}`,
      'opacity': (val) => `opacity-${Math.round(Number(val) * 100)}`
    };

    const mapper = mappings[property];
    if (mapper) {
      const result = mapper(value);
      if (result) {
        return this.options.usePrefix ? `${this.options.prefix}${result}` : result;
      }
    }

    return null;
  }

  private parseSpacing(value: string): string {
    if (value === '0') return '0';
    if (value === 'auto') return 'auto';

    // Handle rem values (common in Tailwind)
    if (value.endsWith('rem')) {
      const num = parseFloat(value);
      if (num === 0.25) return '1';
      if (num === 0.5) return '2';
      if (num === 0.75) return '3';
      if (num === 1) return '4';
      if (num === 1.25) return '5';
      if (num === 1.5) return '6';
      if (num === 1.75) return '7';
      if (num === 2) return '8';
      if (num === 2.25) return '9';
      if (num === 2.5) return '10';
      if (num === 2.75) return '11';
      if (num === 3) return '12';
      if (num === 3.5) return '14';
      if (num === 4) return '16';
      if (num === 5) return '20';
      if (num === 6) return '24';
      if (num === 7) return '28';
      if (num === 8) return '32';
      if (num === 9) return '36';
      if (num === 10) return '40';
      if (num === 11) return '44';
      if (num === 12) return '48';
      if (num === 14) return '56';
      if (num === 16) return '64';
      if (num === 20) return '80';
      if (num === 24) return '96';
    }

    // Handle px values
    if (value.endsWith('px')) {
      const px = parseInt(value);
      const rem = px / (this.options.remInPx || 16);
      return this.parseSpacing(`${rem}rem`);
    }

    // Handle other units or named values
    return value.replace(/[^a-z0-9-]/gi, '-');
  }

  private parseSize(value: string, prefix: string): string | null {
    if (value === 'auto') return `${prefix}-auto`;
    if (value === '100%') return `${prefix}-full`;
    if (value === '50%') return `${prefix}-1/2`;
    if (value === '33.333333%') return `${prefix}-1/3`;
    if (value === '66.666667%') return `${prefix}-2/3`;
    if (value === '25%') return `${prefix}-1/4`;
    if (value === '75%') return `${prefix}-3/4`;
    if (value === '20%') return `${prefix}-1/5`;
    if (value === '40%') return `${prefix}-2/5`;
    if (value === '60%') return `${prefix}-3/5`;
    if (value === '80%') return `${prefix}-4/5`;

    // Handle fixed sizes
    return `${prefix}-${this.parseSpacing(value)}`;
  }

  private parseColor(value: string, prefix: string): string | null {
    // Basic color mapping
    const colorMap: Record<string, string> = {
      '#000000': 'black',
      '#ffffff': 'white',
      '#f8fafc': 'slate-50',
      '#f1f5f9': 'slate-100',
      '#e2e8f0': 'slate-200',
      '#cbd5e1': 'slate-300',
      '#94a3b8': 'slate-400',
      '#64748b': 'slate-500',
      '#475569': 'slate-600',
      '#334155': 'slate-700',
      '#1e293b': 'slate-800',
      '#0f172a': 'slate-900',
      '#f9fafb': 'gray-50',
      '#f3f4f6': 'gray-100',
      '#e5e7eb': 'gray-200',
      '#d1d5db': 'gray-300',
      '#9ca3af': 'gray-400',
      '#6b7280': 'gray-500',
      '#4b5563': 'gray-600',
      '#374151': 'gray-700',
      '#1f2937': 'gray-800',
      '#111827': 'gray-900',
      // Add more colors as needed
    };

    const lowerValue = value.toLowerCase();
    if (colorMap[lowerValue]) {
      return `${prefix}-${colorMap[lowerValue]}`;
    }

    // Handle rgba, hsl, etc.
    if (lowerValue.startsWith('rgb') || lowerValue.startsWith('hsl')) {
      return `${prefix}-[${value.replace(/\s+/g, '')}]`;
    }

    // Handle hex values not in the map
    if (lowerValue.startsWith('#')) {
      return `${prefix}-[${value}]`;
    }

    // Assume it's a named color
    return `${prefix}-${value}`;
  }

  private parseFontSize(value: string): string | null {
    if (value.endsWith('rem')) {
      const num = parseFloat(value);
      if (num === 0.75) return 'text-xs';
      if (num === 0.875) return 'text-sm';
      if (num === 1) return 'text-base';
      if (num === 1.125) return 'text-lg';
      if (num === 1.25) return 'text-xl';
      if (num === 1.5) return 'text-2xl';
      if (num === 1.875) return 'text-3xl';
      if (num === 2.25) return 'text-4xl';
      if (num === 3) return 'text-5xl';
      if (num === 3.75) return 'text-6xl';
      if (num === 4.5) return 'text-7xl';
      if (num === 6) return 'text-8xl';
      if (num === 8) return 'text-9xl';
    }

    // Handle px values
    if (value.endsWith('px')) {
      const px = parseInt(value);
      const rem = px / (this.options.remInPx || 16);
      return this.parseFontSize(`${rem}rem`);
    }

    return `text-[${value}]`;
  }
}