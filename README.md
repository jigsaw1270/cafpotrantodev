# CafPotranto Dev - Modern Web Development

A production-grade Next.js frontend boilerplate built with modern technologies and best practices. This project serves as a foundation for building scalable, performant, and SEO-optimized web applications.

## 🚀 Features

- **Framework**: Next.js 15 with App Router (SSR + ISR + SSG)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with utility-first approach
- **Components**: Radix UI primitives for accessibility
- **Animation**: Framer Motion for smooth interactions
- **State Management**: Zustand for global state
- **SEO**: next-seo with structured data and meta tags
- **Development**: ESLint + Prettier + Husky + Lint-Staged
- **Dark Mode**: System preference and manual toggle support
- **Responsive**: Mobile-first design with modern breakpoints
- **Icons**: Lucide React for consistent iconography

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── globals.css        # Global styles with theme
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── error.tsx          # Error boundary
├── components/            # Reusable components
│   ├── ui/                # UI components (Button, etc.)
│   ├── layout/            # Layout components
│   └── seo.tsx            # SEO component
├── lib/                   # Utility functions
└── store/                 # Zustand store
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cafpotrantodev
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Theme Configuration

The project uses Tailwind CSS v4 with CSS variables for theming. Customize the theme in `src/app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #171717;
  /* Add your custom colors */
}
```

### Component Library

Built with Radix UI primitives and custom variants using `class-variance-authority`. Components are located in `src/components/ui/`.

### SEO Configuration

SEO is handled by the `SEO` component using `next-seo`. Update the default configuration in `src/app/layout.tsx`.

## 🔧 Development Tools

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Code formatting with Tailwind CSS class sorting
- **Husky**: Git hooks for pre-commit checks
- **Lint-Staged**: Run linters on staged files

### Pre-commit Hooks

The project automatically runs the following on commit:

- ESLint with auto-fix
- Prettier formatting
- Type checking

## 📱 Responsive Design

Built with a mobile-first approach using Tailwind CSS breakpoints:

- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

## 🌙 Dark Mode

Dark mode is implemented using CSS variables and system preferences. Toggle manually via the theme store or automatically detect system preference.

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For questions or support, please contact us at hello@cafpotranto.dev or visit our [website](https://cafpotranto.dev).

---

**Last Updated**: September 21, 2025

Built with ❤️ by [CafPotranto Dev](https://cafpotranto.dev)
