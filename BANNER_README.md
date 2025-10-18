# Banner Image Implementation

## 🖼️ Banner Image Setup

The home page now features a dynamic hero banner with the legal services background image.

### Files Modified/Created:

1. **`src/app/page.tsx`** - Updated home page with HeroBanner component
2. **`src/components/ui/hero-banner.tsx`** - New reusable banner component
3. **`public/images/banner.webp`** - Banner image location (needs to be manually added)

### Image Requirements:

- **Location**: `public/images/banner.webp`
- **Recommended Size**: 1920x600px (3.2:1 ratio)
- **Format**: WebP (preferred) or JPG
- **File Size**: < 150KB for optimal performance
- **Quality**: 85%

### Features Implemented:

✅ **Responsive Design** - Adapts to mobile, tablet, and desktop
✅ **Next.js Image Optimization** - Automatic format selection and lazy loading
✅ **Error Handling** - Fallback gradient if image fails to load
✅ **Performance Optimized** - Priority loading for above-the-fold content
✅ **Accessibility** - proper alt text and semantic structure
✅ **SEO Friendly** - Structured data and meta information

### Usage:

```tsx
<HeroBanner
  imageUrl="/images/banner.webp"
  imageAlt="Legal Services Banner"
  title="Your Title"
  subtitle="Your Subtitle"
  description="Your Description"
>
  <CTAButton>Call to Action</CTAButton>
</HeroBanner>
```

### Manual Steps Required:

1. **Save the banner image** as `banner.webp` in the `public/images/` directory
2. **Restart the development server** to see changes
3. **Test on different devices** to ensure responsive behavior

### Performance Notes:

- Image is loaded with `priority={true}` for above-the-fold content
- Next.js automatically generates optimized versions for different screen sizes
- Fallback gradient ensures the page works even if image fails to load
- Dark overlay (50% opacity) ensures text readability over the image

### Customization:

To customize the banner appearance, edit:

- Colors in the overlay (currently `bg-black/50`)
- Text colors and styles in the component
- Animation timing and effects
- Responsive breakpoints for different screen sizes
