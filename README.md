# Stylish iOS Calculator

A calculator featuring 3D effects using Three.js and smooth animations with GSAP. The calculator includes server-side calculations using PHP for precision and security.

## Features

- smooth animations
- Responsive layout
- Server-side calculations
- SCSS styling with modern design principles
- Interactive button feedback
- Support for basic mathematical operations

## Prerequisites

- PHP 7.4 or higher
- Node.js and npm (for SCSS compilation)
- Web server (Apache, Nginx, etc.)

## Installation

1. Clone or download this repository to your web server directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile SCSS to CSS:
   ```bash
   npm run sass:build
   ```
4. For development with auto-compilation of SCSS:
   ```bash
   npm run sass:watch
   ```

## Usage

1. Access the calculator through your web server (e.g., `http://localhost/calculator`)
2. Use the calculator like a standard iOS calculator:
   - Basic operations: +, -, ×, ÷
   - Clear (AC): Reset calculator
   - Toggle sign (±): Change between positive and negative
   - Percentage (%): Convert to percentage
   - Decimal point (.): For decimal numbers

## Development

- The SCSS files are in the `css` directory
- JavaScript logic is in the `js` directory
- PHP calculation handler is in `calculate.php`
- Three.js creates the 3D particle effect background
- GSAP handles all animations

## File Structure

```
├── index.php           # Main HTML structure
├── calculate.php       # Server-side calculation handler
├── css/
│   └── style.scss     # SCSS styles
├── js/
│   └── calculator.js   # Calculator logic and animations
├── package.json       # Node.js dependencies
└── README.md         # This file
```