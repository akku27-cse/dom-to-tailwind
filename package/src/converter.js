"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomToTailwind = void 0;
var jsdom_1 = require("jsdom");
var postcss_1 = require("postcss");
var postcss_js_1 = require("postcss-js");
var DomToTailwind = /** @class */ (function () {
    function DomToTailwind(options) {
        if (options === void 0) { options = {}; }
        this.options = __assign({ includeComments: false, usePrefix: false, prefix: 'tw-', remInPx: 16, ignoreClasses: [], customUtilityMap: {} }, options);
    }
    DomToTailwind.prototype.convert = function (html) {
        return __awaiter(this, void 0, void 0, function () {
            var dom, document, elements, _i, _a, element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dom = new jsdom_1.JSDOM(html);
                        document = dom.window.document;
                        elements = document.body.querySelectorAll('*');
                        _i = 0, _a = Array.from(elements);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        return [4 /*yield*/, this.processElement(element)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, document.body.innerHTML];
                }
            });
        });
    };
    DomToTailwind.prototype.processElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var style, tailwindClasses, existingClasses, allClasses;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        style = element.getAttribute('style');
                        if (!style)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.cssToTailwind(style)];
                    case 1:
                        tailwindClasses = _b.sent();
                        if (tailwindClasses.length === 0)
                            return [2 /*return*/];
                        existingClasses = ((_a = element.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
                        allClasses = __spreadArray(__spreadArray([], existingClasses, true), tailwindClasses, true);
                        element.setAttribute('class', allClasses.join(' ').trim());
                        // Remove style attribute if option is set
                        element.removeAttribute('style');
                        return [2 /*return*/];
                }
            });
        });
    };
    DomToTailwind.prototype.cssToTailwind = function (css) {
        return __awaiter(this, void 0, void 0, function () {
            var root, cssObj, tailwindClasses, _i, _a, _b, property, value, utilityClass;
            return __generator(this, function (_c) {
                try {
                    root = postcss_1.default.parse("div { ".concat(css, " }"));
                    cssObj = postcss_js_1.default.objectify(root);
                    tailwindClasses = [];
                    for (_i = 0, _a = Object.entries(cssObj['div'] || {}); _i < _a.length; _i++) {
                        _b = _a[_i], property = _b[0], value = _b[1];
                        if (typeof value === 'string' || typeof value === 'number') {
                            utilityClass = this.mapPropertyToUtility(property, String(value));
                            if (utilityClass) {
                                tailwindClasses.push(utilityClass);
                            }
                        }
                    }
                    return [2 /*return*/, tailwindClasses];
                }
                catch (error) {
                    console.error('Error converting CSS to Tailwind:', error);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    DomToTailwind.prototype.mapPropertyToUtility = function (property, value) {
        var _this = this;
        var _a;
        // Check custom mappings first
        if ((_a = this.options.customUtilityMap) === null || _a === void 0 ? void 0 : _a["".concat(property, "-").concat(value)]) {
            return this.options.customUtilityMap["".concat(property, "-").concat(value)];
        }
        // Common property mappings
        var mappings = {
            'margin': function (val) { return "m-".concat(_this.parseSpacing(val)); },
            'margin-top': function (val) { return "mt-".concat(_this.parseSpacing(val)); },
            'margin-right': function (val) { return "mr-".concat(_this.parseSpacing(val)); },
            'margin-bottom': function (val) { return "mb-".concat(_this.parseSpacing(val)); },
            'margin-left': function (val) { return "ml-".concat(_this.parseSpacing(val)); },
            'padding': function (val) { return "p-".concat(_this.parseSpacing(val)); },
            'padding-top': function (val) { return "pt-".concat(_this.parseSpacing(val)); },
            'padding-right': function (val) { return "pr-".concat(_this.parseSpacing(val)); },
            'padding-bottom': function (val) { return "pb-".concat(_this.parseSpacing(val)); },
            'padding-left': function (val) { return "pl-".concat(_this.parseSpacing(val)); },
            'width': function (val) { return _this.parseSize(val, 'w'); },
            'height': function (val) { return _this.parseSize(val, 'h'); },
            'color': function (val) { return _this.parseColor(val, 'text'); },
            'background-color': function (val) { return _this.parseColor(val, 'bg'); },
            'font-size': function (val) { return _this.parseFontSize(val); },
            'font-weight': function (val) { return "font-".concat(value); },
            'text-align': function (val) { return "text-".concat(value); },
            'display': function (val) {
                var map = {
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
            'flex-direction': function (val) {
                var map = {
                    'row': 'flex-row',
                    'row-reverse': 'flex-row-reverse',
                    'column': 'flex-col',
                    'column-reverse': 'flex-col-reverse'
                };
                return map[val] || null;
            },
            'justify-content': function (val) {
                var map = {
                    'flex-start': 'justify-start',
                    'flex-end': 'justify-end',
                    'center': 'justify-center',
                    'space-between': 'justify-between',
                    'space-around': 'justify-around',
                    'space-evenly': 'justify-evenly'
                };
                return map[val] || null;
            },
            'align-items': function (val) {
                var map = {
                    'flex-start': 'items-start',
                    'flex-end': 'items-end',
                    'center': 'items-center',
                    'baseline': 'items-baseline',
                    'stretch': 'items-stretch'
                };
                return map[val] || null;
            },
            'border-radius': function (val) { return "rounded-".concat(_this.parseSpacing(val)); },
            'border-width': function (val) { return "border-".concat(_this.parseSpacing(val)); },
            'border-color': function (val) { return _this.parseColor(val, 'border'); },
            'position': function (val) { return val === 'static' ? null : val; },
            'top': function (val) { return "top-".concat(_this.parseSpacing(val)); },
            'right': function (val) { return "right-".concat(_this.parseSpacing(val)); },
            'bottom': function (val) { return "bottom-".concat(_this.parseSpacing(val)); },
            'left': function (val) { return "left-".concat(_this.parseSpacing(val)); },
            'z-index': function (val) { return "z-".concat(value); },
            'opacity': function (val) { return "opacity-".concat(Math.round(Number(val) * 100)); }
        };
        var mapper = mappings[property];
        if (mapper) {
            var result = mapper(value);
            if (result) {
                return this.options.usePrefix ? "".concat(this.options.prefix).concat(result) : result;
            }
        }
        return null;
    };
    DomToTailwind.prototype.parseSpacing = function (value) {
        if (value === '0')
            return '0';
        if (value === 'auto')
            return 'auto';
        // Handle rem values (common in Tailwind)
        if (value.endsWith('rem')) {
            var num = parseFloat(value);
            if (num === 0.25)
                return '1';
            if (num === 0.5)
                return '2';
            if (num === 0.75)
                return '3';
            if (num === 1)
                return '4';
            if (num === 1.25)
                return '5';
            if (num === 1.5)
                return '6';
            if (num === 1.75)
                return '7';
            if (num === 2)
                return '8';
            if (num === 2.25)
                return '9';
            if (num === 2.5)
                return '10';
            if (num === 2.75)
                return '11';
            if (num === 3)
                return '12';
            if (num === 3.5)
                return '14';
            if (num === 4)
                return '16';
            if (num === 5)
                return '20';
            if (num === 6)
                return '24';
            if (num === 7)
                return '28';
            if (num === 8)
                return '32';
            if (num === 9)
                return '36';
            if (num === 10)
                return '40';
            if (num === 11)
                return '44';
            if (num === 12)
                return '48';
            if (num === 14)
                return '56';
            if (num === 16)
                return '64';
            if (num === 20)
                return '80';
            if (num === 24)
                return '96';
        }
        // Handle px values
        if (value.endsWith('px')) {
            var px = parseInt(value);
            var rem = px / (this.options.remInPx || 16);
            return this.parseSpacing("".concat(rem, "rem"));
        }
        // Handle other units or named values
        return value.replace(/[^a-z0-9-]/gi, '-');
    };
    DomToTailwind.prototype.parseSize = function (value, prefix) {
        if (value === 'auto')
            return "".concat(prefix, "-auto");
        if (value === '100%')
            return "".concat(prefix, "-full");
        if (value === '50%')
            return "".concat(prefix, "-1/2");
        if (value === '33.333333%')
            return "".concat(prefix, "-1/3");
        if (value === '66.666667%')
            return "".concat(prefix, "-2/3");
        if (value === '25%')
            return "".concat(prefix, "-1/4");
        if (value === '75%')
            return "".concat(prefix, "-3/4");
        if (value === '20%')
            return "".concat(prefix, "-1/5");
        if (value === '40%')
            return "".concat(prefix, "-2/5");
        if (value === '60%')
            return "".concat(prefix, "-3/5");
        if (value === '80%')
            return "".concat(prefix, "-4/5");
        // Handle fixed sizes
        return "".concat(prefix, "-").concat(this.parseSpacing(value));
    };
    DomToTailwind.prototype.parseColor = function (value, prefix) {
        // Basic color mapping
        var colorMap = {
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
        var lowerValue = value.toLowerCase();
        if (colorMap[lowerValue]) {
            return "".concat(prefix, "-").concat(colorMap[lowerValue]);
        }
        // Handle rgba, hsl, etc.
        if (lowerValue.startsWith('rgb') || lowerValue.startsWith('hsl')) {
            return "".concat(prefix, "-[").concat(value.replace(/\s+/g, ''), "]");
        }
        // Handle hex values not in the map
        if (lowerValue.startsWith('#')) {
            return "".concat(prefix, "-[").concat(value, "]");
        }
        // Assume it's a named color
        return "".concat(prefix, "-").concat(value);
    };
    DomToTailwind.prototype.parseFontSize = function (value) {
        if (value.endsWith('rem')) {
            var num = parseFloat(value);
            if (num === 0.75)
                return 'text-xs';
            if (num === 0.875)
                return 'text-sm';
            if (num === 1)
                return 'text-base';
            if (num === 1.125)
                return 'text-lg';
            if (num === 1.25)
                return 'text-xl';
            if (num === 1.5)
                return 'text-2xl';
            if (num === 1.875)
                return 'text-3xl';
            if (num === 2.25)
                return 'text-4xl';
            if (num === 3)
                return 'text-5xl';
            if (num === 3.75)
                return 'text-6xl';
            if (num === 4.5)
                return 'text-7xl';
            if (num === 6)
                return 'text-8xl';
            if (num === 8)
                return 'text-9xl';
        }
        // Handle px values
        if (value.endsWith('px')) {
            var px = parseInt(value);
            var rem = px / (this.options.remInPx || 16);
            return this.parseFontSize("".concat(rem, "rem"));
        }
        return "text-[".concat(value, "]");
    };
    return DomToTailwind;
}());
exports.DomToTailwind = DomToTailwind;
