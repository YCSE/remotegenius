# COMPONENTS.md

This file provides a detailed breakdown of design components from the Chargezoom landing page for reference when building the Remote Genius landing page.

## 🎨 Color Scheme

### Primary Colors
- **Primary Blue**: `#0078FF` / `#66AEFF` (highlights, CTAs)
- **Teal**: `#62BFAD` (accent color for cards)
- **Purple**: `#9C88EA` (accent color for cards)
- **Orange**: `#EA9A88` (accent color for cards)

### Neutral Colors
- **Text Primary**: `#000000` (main text)
- **Text Secondary**: Gray variations (muted text)
- **Background**: `#FFFFFF` (white)
- **Border/Divider**: `#E4E2DF`

## 📐 Layout Structure

### Global Container System
```css
.container-large { /* Main content container */ }
.padding-global { /* Global padding wrapper */ }
.padding-section-medium { /* Medium section spacing */ }
.padding-section-large { /* Large section spacing */ }
```

### Responsive Grid System
- **3-Column Grid**: `._3col_layout` for feature cards
- **Flex Layouts**: Button groups, navigation items
- **CSS Grid**: Footer menu structure

## 🧩 Core Components

### 1. Navigation Bar
```html
<!-- Sticky navigation with mobile hamburger menu -->
<nav class="nav_component">
  - Logo (left aligned)
  - Menu items with dropdowns
  - CTA buttons (Log In, Sign Up Free, See Demo)
  - Mobile menu toggle
</nav>
```

**Features:**
- Dropdown menus on hover
- Mobile-responsive hamburger menu
- Sticky positioning
- Transparent to solid background on scroll

### 2. Hero Section
```html
<section class="section_header">
  - Headline with animated underline
  - Subheadline text
  - Dual CTA buttons
  - Lottie animation (right side)
</section>
```

**Key Elements:**
- Split layout (text left, image right)
- Animated text decorations (underline SVG)
- Highlighted keywords with color change
- Button group with primary/secondary actions

### 3. Logo Bar
```html
<section class="section_logos">
  - Trust indicators
  - Client logos in horizontal scroll
  - "5M+ Companies trust..." headline
</section>
```

### 4. Problem/Solution Section
```html
<section class="section_home-headaches">
  - Centered headline with animated circle
  - 3-column grid of pain points
  - Icon + title + description format
</section>
```

### 5. Feature Cards Grid
```html
<div class="card_component">
  - Colored background cards
  - Icon + title + description
  - Hover state with "Learn more →"
  - 6-card grid layout
</div>
```

**Card Colors:**
- Blue: `#66AEFF`
- Teal: `#62BFAD`
- Orange: `#EA9A88`
- Purple: `#9C88EA`

### 6. Process Steps Section
```html
<div class="points_component">
  - Left: Numbered steps with checkmarks
  - Right: Lottie animation
  - Green checkmark icons
</div>
```

### 7. Testimonial Carousel
```html
<section class="section_testimonial">
  - Slider with navigation arrows
  - Quote text
  - Client name and position
  - Decorative doodles (arrow, star, wavy line)
</section>
```

### 8. CTA Section
```html
<section class="section_cta">
  - Centered headline
  - Description text
  - Dual button group
  - Full-width colored background option
</section>
```

### 9. Footer
```html
<footer class="footer_component">
  - Logo and social icons (left)
  - 4-column link grid
  - Bottom copyright and legal links
</footer>
```

## 🎭 Interactive Elements

### Button Variations
```css
.button { /* Primary button */ }
.button.is-secondary { /* Secondary outlined button */ }
.button.is-white { /* White button on dark bg */ }
.button.is-secondary-white { /* White outlined button */ }
```

### Hover States
- Cards: Lift effect with shadow
- Buttons: Color transitions
- Links: Underline animations
- Icons: Color changes

## 🎬 Animations

### Scroll-Triggered Animations
```javascript
// GSAP ScrollTrigger for staggered card reveals
gsap.from(items, {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.3
});
```

### Text Reveal Effects
- Clip-path animations for underlines
- Color transitions for highlighted text
- Intersection Observer for trigger points

### Lottie Animations
- Hero section illustration
- Process visualization
- Work-life balance animation

## 📏 Spacing System

### Spacer Utilities
```css
.spacer-24 { /* 24px spacing */ }
.spacer-32 { /* 32px spacing */ }
.spacer-60 { /* 60px spacing */ }
.spacer-96 { /* 96px spacing */ }
.spacer-120 { /* 120px spacing */ }
```

## 📝 Typography

### Heading Styles
```css
.heading-style-h1 { /* Main headlines */ }
.heading-style-h2 { /* Section headlines */ }
.heading-style-h3 { /* Sub-headlines */ }
.heading-style-h4 { /* Card titles */ }
.heading-style-kicker-line { /* Small uppercase labels */ }
.heading-style-label { /* Form labels, categories */ }
```

### Font Stack
- **Primary Font**: Asta Sans (300-800 weights)
  - Import: `@import url('https://fonts.googleapis.com/css2?family=Asta+Sans:wght@300..800&display=swap');`
  - Usage:
    ```css
    .asta-sans {
      font-family: "Asta Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: 400; /* 300-800 available */
      font-style: normal;
    }
    ```
  - Weight variations:
    - 300: Light (body text)
    - 400: Regular (default)
    - 500: Medium (subheadings)
    - 600: Semi-bold (emphasis)
    - 700: Bold (headings)
    - 800: Extra-bold (hero text)

## 🎨 Decorative Elements

### SVG Doodles
- Underline curves
- Circle animations
- Arrow illustrations
- Star decorations
- Wavy lines

### Background Patterns
- Gradient overlays
- Blob shapes with blur effects
- Geometric patterns

## 📱 Responsive Breakpoints

```css
@media (max-width: 1440px) { /* Large desktop */ }
@media (max-width: 991px) { /* Tablet */ }
@media (max-width: 767px) { /* Mobile landscape */ }
@media (max-width: 479px) { /* Mobile portrait */ }
```

## 🔧 Utility Classes

### Display Utilities
```css
.hide { display: none !important; }
.hide-tablet { /* Hidden on tablet */ }
.hide-mobile { /* Hidden on mobile */ }
.text-align-center { /* Center text */ }
```

### Layout Utilities
```css
.margin-0 { margin: 0 !important; }
.padding-0 { padding: 0 !important; }
.spacing-clean { /* No margin/padding */ }
```

## 💡 Implementation Notes

### Performance Optimizations
- Lazy loading for images
- AVIF/WebP image formats
- Deferred script loading
- CSS containment for animations

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Focus states for keyboard navigation
- Color contrast compliance

### SEO Considerations
- Structured data markup
- Meta descriptions
- Open Graph tags
- Semantic heading hierarchy

## 🚀 Key Takeaways for Remote Genius

1. **Clear Value Proposition**: Lead with cost savings (1/5 to 1/2 pricing)
2. **Trust Indicators**: Client logos, testimonials, statistics
3. **Problem-Solution Format**: Address pain points explicitly
4. **Multiple CTAs**: Provide various entry points for conversion
5. **Visual Hierarchy**: Use color, size, and spacing to guide attention
6. **Micro-interactions**: Subtle animations enhance engagement
7. **Mobile-First**: Ensure all components work on small screens
8. **Social Proof**: Testimonials and client success stories
9. **Clear Process**: Step-by-step how it works section
10. **Urgency Elements**: Limited time offers, scarcity messaging