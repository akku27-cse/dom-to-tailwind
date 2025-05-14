# DOM to Tailwind Converter

[![npm version](https://img.shields.io/npm/v/dom-to-tailwind.svg)](https://www.npmjs.com/package/dom-to-tailwind)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/dom-to-tailwind.svg)](https://npm-stat.com/charts.html?package=dom-to-tailwind)

Convert raw HTML with inline CSS into Tailwind CSS utility classes programmatically.

## Features

- 🛠️ Convert inline styles to Tailwind utility classes
- 🎨 Supports common CSS properties (margin, padding, colors, typography, etc.)
- ⚙️ Customizable conversion options
- 🏗️ TypeScript support with included type definitions
- 🧪 Comprehensive test coverage

## Installation

```bash
npm install dom-to-tailwind
# or
yarn add dom-to-tailwind
# or
pnpm add dom-to-tailwind
Basic Usage
typescript
import { convertToTailwind } from 'dom-to-tailwind';

const html = `
  <div style="margin: 1rem; padding: 0.5rem; background-color: #f3f4f6;">
    <p style="font-size: 1.125rem; color: #1f2937;">Hello World</p>
  </div>
`;

const convertedHtml = await convertToTailwind(html);
console.log(convertedHtml);
Output:

html
<div class="m-4 p-2 bg-gray-100">
  <p class="text-lg text-gray-800">Hello World</p>
</div>
API Reference
convertToTailwind(html: string, options?: ConversionOptions): Promise<string>
Converts HTML with inline styles to Tailwind CSS utility classes.

Parameters:
html: The HTML string to convert

options: Optional configuration object (see below)

ConversionOptions Interface
typescript
interface ConversionOptions {
  /** Include conversion comments in output */
  includeComments?: boolean;
  /** Add a prefix to all utility classes */
  usePrefix?: boolean;
  /** Prefix to use when usePrefix is true (default: 'tw-') */
  prefix?: string;
  /** Base rem value in pixels (default: 16) */
  remInPx?: number;
  /** Array of classes to ignore */
  ignoreClasses?: string[];
  /** Custom CSS property to Tailwind class mappings */
  customUtilityMap?: Record<string, string>;
}
Advanced Usage
With Custom Options
typescript
const options = {
  usePrefix: true,
  prefix: 'tw-',
  remInPx: 16,
  ignoreClasses: ['existing-class'],
  customUtilityMap: {
    'margin-2px': 'm-0.5',
    'custom-bg-color': 'bg-custom'
  }
};

const converted = await convertToTailwind(html, options);
Using the DomToTailwind Class
For more control, use the class directly:

typescript
import { DomToTailwind } from 'dom-to-tailwind';

const converter = new DomToTailwind({
  usePrefix: true,
  prefix: 'tw-'
});

const converted = await converter.convert(html);
Supported CSS Properties
CSS Property	Tailwind Equivalent
margin, padding	m-, p-, mx-, py-, etc.
width, height	w-, h-
colors	bg-, text-, border-*
typography	text-, font-, leading-*
flexbox/grid	flex-, grid-, gap-*
positioning	absolute, relative, etc.
borders	border-, rounded-
z-index, opacity	z-, opacity-
And many more...	
Examples
Converting a Button
typescript
const buttonHtml = `
  <button style="
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 0.25rem;
    font-weight: 600;
  ">
    Click Me
  </button>
`;

const convertedButton = await convertToTailwind(buttonHtml);
Output:

html
<button class="px-4 py-2 bg-blue-500 text-white rounded font-semibold">
  Click Me
</button>
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -am 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
For issues or feature requests, please open an issue on GitHub.


This README includes:

1. **Badges** for version, license, and downloads
2. **Clear installation instructions**
3. **Basic and advanced usage examples**
4. **Complete API documentation**
5. **Supported CSS properties table**
6. **Real-world examples**
7. **Contribution guidelines**
8. **License and support information**

The documentation is structured to:
- Help users get started quickly
- Provide comprehensive API details
- Show practical examples
- Encourage contributions
- Maintain professional presentation

You should:
1. Replace `yourusername` with your actual GitHub username
2. Add a real demo GIF if available
3. Update the supported properties table as you add more features
4. Consider adding a "Changelog" section for version updates