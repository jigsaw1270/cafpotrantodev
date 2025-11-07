# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a production-grade Next.js frontend application built with TypeScript, Tailwind CSS, and modern React patterns. The project follows a feature-based architecture with responsive design and SEO optimization.

## Technology Stack

- **Framework**: Next.js 15 with App Router (SSR + ISR + SSG)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with mobile-first approach
- **Components**: Radix UI primitives for accessibility
- **Animation**: Framer Motion
- **State Management**: Zustand
- **SEO**: next-seo with structured data
- **Development**: ESLint + Prettier + Husky + Lint-Staged

## Code Standards

- Use TypeScript strict mode
- Follow mobile-first responsive design
- Implement proper accessibility patterns
- Use semantic HTML elements
- Follow Tailwind CSS utility-first approach
- Use Framer Motion for smooth animations
- Implement proper SEO meta tags for each page
- Support dark mode throughout the application

## Architecture Guidelines

- Feature-based folder structure
- Reusable component library
- Custom hooks for business logic
- Server and client components separation
- Proper error boundaries and loading states
- SEO-optimized routing and meta tags

## Component Patterns

- Use compound components for complex UI
- Implement proper TypeScript interfaces
- Use className utilities (clsx, tailwind-merge)
- Follow accessibility best practices
- Include proper loading and error states

## File Naming Conventions

- Use PascalCase for React components (e.g., `UserProfile.tsx`)
- Use kebab-case for pages and API routes (e.g., `user-profile.tsx`)
- Use camelCase for utilities and hooks (e.g., `useUserData.ts`)
- Use UPPERCASE for constants and environment variables
- Prefix custom hooks with 'use' (e.g., `useAuth.ts`)

## API & Data Patterns

- Use SWR for client-side data fetching
- Implement proper error handling with try-catch blocks
- Use TypeScript interfaces for API responses
- Follow RESTful naming conventions for API routes
- Implement proper validation using Zod or similar
- Use environment variables for configuration
- Cache API responses when appropriate

## Testing Guidelines

- Write unit tests for utility functions
- Test React components with React Testing Library
- Mock external dependencies in tests
- Use meaningful test descriptions
- Test both happy path and error scenarios
- Maintain test coverage above 80%

## Performance Optimization

- Use Next.js Image component for optimized images
- Implement proper code splitting with dynamic imports
- Use React.memo for expensive components
- Optimize bundle size with tree shaking
- Implement proper caching strategies
- Use loading skeletons for better UX

## Internationalization (i18n)

- Support multiple languages (Italian, English, etc.)
- Use translation keys consistently
- Implement RTL support where needed
- Handle locale-specific formatting (dates, numbers)
- Provide fallback content for missing translations

## Security Best Practices

- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS for all external requests
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Use secure headers and CSP policies

## Project-Specific Context

- This is a consulting/services website with admin functionality
- Support for WhatsApp integration and contact forms
- Multi-language support with translation features
- Image optimization for service galleries
- SEO optimization for service pages
- Admin panel for content management
