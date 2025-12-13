# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for the Gayatri Gyan Mandir temple expansion project in Itasca, Illinois. It serves as a fundraising and information site for the temple's expansion campaign.

## Technology Stack

- **HTML5** - Single-page website (`index.html`)
- **CSS3** - Custom styles with CSS variables for theming (`styles.css`)
- **Vanilla JavaScript** - Interactive features (`script.js`)
- **No build system** - Static files served directly

## Development

Open `index.html` directly in a browser or use any local server:
```bash
python3 -m http.server 8000
# or
npx serve .
```

## Architecture

### CSS Structure (`styles.css`)
- CSS custom properties in `:root` define the design system (colors, typography, spacing, shadows)
- Color palette: saffron/gold (primary), maroon (secondary), neutral grays
- Font families: Playfair Display (headings), Inter (body)
- Mobile-first responsive design with breakpoints at 1024px, 768px, and 480px

### JavaScript Structure (`script.js`)
- All features initialize from `DOMContentLoaded` event
- Key components: navbar scroll behavior, mobile menu, donation form, scroll reveal animations, parallax effects, counter animations
- No external dependencies

### Page Sections
1. Fixed navigation with mobile hamburger menu
2. Hero with animated gradient orbs and key stats
3. About section (founders, mission cards)
4. Mission section with Gayatri Mantra display
5. Project timeline and feature showcase
6. Donate section with PayPal integration
7. Footer

## External Integrations

- **PayPal Donate Button** - Links directly to PayPal donation page (token-based URL)
- **Google Fonts** - Playfair Display and Inter font families
