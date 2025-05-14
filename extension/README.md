DOM to Tailwind - VS Code Extension
Extension Demo

Visual Studio Marketplace Version
Installs
Rating
License

Convert HTML with inline CSS to Tailwind utility classes directly in your VS Code editor.

Features
One-click conversion of selected HTML or entire files

Context menu integration for quick access

Customizable prefixing (e.g., tw- prefix)

Progress indicators during conversion

Comprehensive CSS support including:

Margins, padding, widths

Colors and backgrounds

Typography and text styling

Flexbox and grid layouts

Borders and positioning

Installation
Open Extensions in VS Code (Ctrl+Shift+X / Cmd+Shift+X)

Search for "DOM to Tailwind"

Click Install

Reload VS Code when prompted

Direct install link

Usage
Convert Selection
Select HTML with inline styles in your editor

Right-click and choose Convert Selection to Tailwind

or -

Press Ctrl+Shift+P (Cmd+Shift+P on Mac) and run DOM to Tailwind: Convert Selection

Convert Entire File
Open an HTML file

Press Ctrl+Shift+P (Cmd+Shift+P on Mac)

Run DOM to Tailwind: Convert File

Example
Before:

html
<div style="margin: 1rem; padding: 0.5rem; background-color: #f3f4f6;">
  <p style="font-size: 1.125rem; color: #1f2937;">Hello World</p>
</div>
After conversion:

html
<div class="m-4 p-2 bg-gray-100">
  <p class="text-lg text-gray-800">Hello World</p>
</div>
Configuration
Customize the conversion in VS Code settings (settings.json):

json
{
  "domToTailwind.usePrefix": false,
  "domToTailwind.prefix": "tw-",
  "domToTailwind.remInPx": 16,
  "domToTailwind.ignoreClasses": ["existing-class"],
  "domToTailwind.customUtilityMap": {
    "margin-2px": "m-0.5",
    "custom-bg": "bg-custom"
  },
  "domToTailwind.includeComments": false
}
Settings Explained
Setting	Description	Default
usePrefix	Add prefix to all utility classes	false
prefix	Prefix to use when enabled	"tw-"
remInPx	Base rem value for pixel conversion	16
ignoreClasses	Classes to preserve during conversion	[]
customUtilityMap	Custom CSS to Tailwind mappings	{}
includeComments	Include conversion comments in output	false
Keyboard Shortcuts
Add these to your keybindings.json for quick access:

json
[
  {
    "command": "dom-to-tailwind.convertSelection",
    "key": "ctrl+alt+t",
    "mac": "cmd+alt+t",
    "when": "editorHasSelection"
  },
  {
    "command": "dom-to-tailwind.convertFile",
    "key": "ctrl+alt+shift+t",
    "mac": "cmd+alt+shift+t"
  }
]
Known Limitations
Complex CSS selectors in <style> tags are not supported (inline styles only)

CSS custom properties (var(--color)) are converted as-is

Some edge cases may require manual adjustment

Changelog
See the CHANGELOG.md for version history and updates.

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -am 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

Support
For issues or feature requests:

Open a GitHub Issue

Email: your.email@example.com

License
This extension is licensed under the MIT License.