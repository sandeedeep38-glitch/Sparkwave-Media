# Design Guidelines for Sparkwave Media Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern digital marketing agencies like DigitalShout, focusing on clean professionalism with strategic use of vibrant accent colors for impact.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Deep Navy: 220 85% 15% (main brand color)
- Pure White: 0 0% 100% (clean backgrounds)
- Charcoal: 220 15% 20% (dark mode primary)

**Accent Colors:**
- Electric Blue: 210 100% 60% (CTA buttons, links)
- Vibrant Teal: 180 85% 45% (service card highlights)

**Background Treatments:**
- Hero: Subtle gradient from deep navy to charcoal with blue accent overlay
- Service cards: Clean white with teal accent borders
- Contact section: Light gray background with geometric patterns

### B. Typography
**Primary Font:** Inter (Google Fonts) - Clean, modern sans-serif
**Secondary Font:** Space Grotesk (Google Fonts) - For headings and brand elements
- Hero headline: 48px bold
- Section headers: 32px medium
- Body text: 16px regular
- Mobile scales: 75% of desktop sizes

### C. Layout System
**Spacing Primitives:** Tailwind units of 4, 8, 16, and 24
- Component padding: p-8
- Section margins: m-16
- Element spacing: gap-4
- Mobile: Reduce by 50% (p-4, m-8, gap-2)

### D. Component Library

**Navigation:**
- Fixed header with logo left, menu items right
- Mobile: Hamburger menu with slide-out panel
- Background: Semi-transparent white with blur effect

**Hero Section:**
- Full viewport height with centered content
- Large headline + tagline + prominent CTA button
- Background: Gradient with subtle animated particles

**Service Cards:**
- 4-column grid (2x2 on mobile)
- Clean white cards with subtle shadows
- Icon + title + description + "Learn More" link
- Hover: Gentle lift animation with teal accent

**Contact Form:**
- Clean, minimal design with floating labels
- Form fields: Name, Email, Message (textarea)
- Submit button: Electric blue with white text
- Formspree integration for backend handling

**Footer:**
- Simple layout with company info and social links
- Dark background with white text

### E. Animations
**Minimal and Professional:**
- Smooth scroll between sections (1s ease)
- Hero elements: Gentle fade-in on load
- Service cards: Hover lift effect (0.3s ease)
- Form: Focus state animations on inputs
- NO complex animations or distracting effects

## Images
**Hero Background:** Large, professional image of a modern workspace or abstract geometric pattern (1920x1080). Should be dark-toned to contrast with white text overlay.

**Service Icons:** Simple, professional icons for each service (SEO, Social Media, Branding, Content Marketing). Use Heroicons for consistency.

**About Section:** Optional team photo or office environment image (800x600) to add personality while maintaining professionalism.

## Mobile Responsiveness
- Breakpoints: 768px for tablet, 480px for mobile
- Hero: Stack elements vertically, reduce text sizes
- Services: 2x2 grid becomes single column
- Navigation: Hamburger menu with slide-out
- Forms: Full-width inputs with larger touch targets
- Maintain 16px minimum text size for readability

## Key Design Principles
1. **Professional First:** Clean, trustworthy aesthetic for B2B clients
2. **Strategic Color:** Use vibrant accents sparingly for maximum impact
3. **Content Hierarchy:** Clear visual flow from hero to services to contact
4. **Mobile Excellence:** Touch-friendly design with optimized layouts
5. **Performance Focus:** Fast loading with minimal animation overhead