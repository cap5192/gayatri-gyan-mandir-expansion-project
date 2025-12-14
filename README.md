# Gayatri Gyan Mandir Expansion Project

A fundraising and information website for the Gayatri Gyan Mandir temple expansion project in Itasca, Illinois.

## About

Gayatri Gyan Mandir is a spiritual center founded on the teachings of Pandit Shriram Sharma Acharya and Mata Bhagwati Devi. This website supports the temple's expansion campaign to build a new 16,000 sq. ft. facility with capacity for 260 people.

Part of the worldwide [World Gayatri Pariwar](https://www.awgp.org/) family.

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

## Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # All styles with CSS custom properties
├── script.js       # Interactive features (no dependencies)
└── images/         # Logo and founder images
```

## Features

### CSS (`styles.css`)
- CSS custom properties in `:root` define the design system (colors, typography, spacing, shadows)
- Color palette: saffron/gold (primary), maroon (secondary), neutral grays
- Font families: Playfair Display (headings), Inter (body)
- Mobile-first responsive design with breakpoints at 1024px, 768px, and 480px

### JavaScript (`script.js`)
- All features initialize from `DOMContentLoaded` event
- Navbar scroll behavior with background transition
- Mobile hamburger menu
- Scroll reveal animations
- Parallax effects
- Counter animations
- No external dependencies

### Page Sections
1. Fixed navigation with mobile hamburger menu
2. Hero section with animated temple SVG illustration and key stats
3. About section (founders with photos, mission cards)
4. Mission section with Gayatri Mantra display
5. Project timeline and feature showcase
6. Donate section with donation portal link
7. Pledge form section with Google Form integration
8. Footer

## External Integrations

- **Donation Portal** - Links to app.gayatrigyanmandir.org for donations
- **Google Forms** - Pledge form integration
- **Google Fonts** - Playfair Display and Inter font families

## Security

The site includes security headers via meta tags:
- Content Security Policy (CSP)
- X-Content-Type-Options
- Referrer Policy

## Deployment

The site is deployed via GitHub Pages with a custom domain configured in the `CNAME` file.

## License

All rights reserved. Gayatri Gyan Mandir, Itasca IL.
