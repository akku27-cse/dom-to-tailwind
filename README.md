# DOM to Tailwind Converter

Convert Raw HTML+CSS into Tailwind CSS Utility Classes - available as both an NPM package and VS Code extension.

![Demo GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDl6Y2RjZnBkZGJ1Y2Q4eWZ3b2ZzZ3V5dGJ6a2RjZzV0ZzB5dWZ6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/example.gif)

## Features

- **NPM Package**:
  - Convert HTML strings with inline styles to Tailwind classes programmatically
  - Customizable conversion options
  - Comprehensive CSS property coverage

- **VS Code Extension**:
  - Convert selections or entire files with a single command
  - Right-click context menu integration
  - Progress notifications
  - Configurable settings

## Installation

### NPM Package

```bash
npm install dom-to-tailwind
# or
yarn add dom-to-tailwind
VS Code Extension
Open VS Code

Go to Extensions view (Ctrl+Shift+X)

Search for "DOM to Tailwind Converter"

Click Install

Or install from the VS Code Marketplace

Usage
NPM Package
javascript
import { convertToTailwind } from 'dom-to-tailwind';

const html = `
  <div style="margin: 1rem; padding: 0.5rem; background-color: #f3f4f6;">
    <p style="font-size: 1.125rem; color: #1f2937;">Hello World</p>
  </div>
`;

const options = {
  usePrefix: true,
  prefix: 'tw-',
  remInPx: 16
};

const converted = await convertToTailwind(html, options);
console.log(converted);
Output:

html
<div class="tw-m-4 tw-p-2 tw-bg-gray-100">
  <p class="tw-text-lg tw-text-gray-800">Hello World</p>
</div>
VS Code Extension
Open an HTML file

Select the HTML you want to convert (or nothing to convert the whole file)

Use one of these methods:

Right-click and select "Convert Selection to Tailwind"

Use the command palette (Ctrl+Shift+P) and search for "Convert to Tailwind"

Use the dedicated keyboard shortcut (if configured)

Configuration
NPM Package Options
typescript
interface ConversionOptions {
  includeComments?: boolean;     // Include conversion comments
  usePrefix?: boolean;          // Add a prefix to all classes
  prefix?: string;              // Prefix to use (default: 'tw-')
  remInPx?: number;             // Base rem value in pixels (default: 16)
  ignoreClasses?: string[];     // Classes to ignore
  customUtilityMap?: Record<string, string>; // Custom CSS to Tailwind mappings
}
VS Code Extension Settings
json
{
  "domToTailwind.usePrefix": false,
  "domToTailwind.prefix": "tw-",
  "domToTailwind.remInPx": 16,
  "domToTailwind.ignoreClasses": [],
  "domToTailwind.customUtilityMap": {},
  "domToTailwind.includeComments": false
}
Supported CSS Properties
Margin, padding, width, height

Colors (background, text, border)

Typography (font size, weight, alignment)

Flexbox and Grid

Positioning

Borders and border radius

Z-index and opacity

And many more...

Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -am 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

License
MIT - See LICENSE for more information.

```
## Npm package avaliable in npmjs
![image](https://github.com/user-attachments/assets/a079f419-c6d9-4492-907e-26c938655f4f)

## VS extension
![image](https://github.com/user-attachments/assets/4cc122fa-b819-486a-b942-2acfc1ea4603)
