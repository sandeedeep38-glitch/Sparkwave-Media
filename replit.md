# Sparkwave Media - Digital Marketing Agency Website

## Overview

Sparkwave Media is a modern digital marketing agency website built with React, TypeScript, and Tailwind CSS. The application showcases the agency's services including SEO optimization, social media advertising, brand development, and content marketing. The website features a responsive design with dark/light theme support, smooth scrolling navigation, and a contact form with Formspree integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks and context for local state, TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints and static file serving
- **Development**: Vite middleware integration for hot module replacement in development
- **Storage Interface**: Abstract storage layer with in-memory implementation for user data
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions

### Design System
- **Typography**: Inter and Space Grotesk fonts from Google Fonts
- **Color Palette**: Navy blue primary with electric blue and teal accents
- **Theme Support**: CSS custom properties enabling seamless light/dark mode switching
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Icons**: Lucide React for consistent iconography throughout the application

### Key Features
- **Responsive Navigation**: Fixed header with smooth scroll behavior and mobile hamburger menu
- **Hero Section**: Full viewport height with gradient backgrounds and animated elements
- **Service Showcase**: Card-based layout highlighting four core service areas
- **Contact Form**: Integrated with Formspree for email submissions with fallback demo mode
- **Theme Toggle**: Persistent dark/light mode with system preference detection
- **Smooth Animations**: Intersection Observer for scroll-triggered animations

### Component Architecture
- **Modular Design**: Reusable components with clear separation of concerns
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Performance**: Lazy loading and optimized rendering with React best practices
- **Testing Ready**: Data test IDs on interactive elements for automated testing

## External Dependencies

### Core Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, shadcn/ui components, Tailwind CSS
- **State Management**: TanStack React Query for server state management
- **Icons**: Lucide React for scalable vector icons

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type validation and schema generation

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript for static typing, ESBuild for fast compilation
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Development Experience**: Replit integration plugins for enhanced development workflow

### Third-Party Services
- **Form Handling**: Formspree for contact form submissions (configurable endpoint)
- **Database Hosting**: Neon PostgreSQL (configured but optional)
- **Font Loading**: Google Fonts for typography (Inter, Space Grotesk)
- **Icon Library**: Lucide for consistent iconography across the application

### Configuration & Environment
- **Environment Variables**: VITE_FORMSPREE_ENDPOINT for form submissions, DATABASE_URL for PostgreSQL
- **Deployment Ready**: Production build configuration with static asset optimization
- **Development Mode**: Hot reloading, error overlay, and development banner integration