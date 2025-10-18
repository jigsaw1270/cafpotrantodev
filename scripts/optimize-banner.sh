#!/bin/bash

# Banner Image Optimization Script
# This script helps optimize the banner image for web use

echo "Banner Image Optimization Instructions"
echo "======================================"
echo ""
echo "To manually save and optimize the banner image:"
echo ""
echo "1. Save the banner image as 'banner.webp' in:"
echo "   d:\\projects2\\cafpotrantodev\\public\\images\\banner.webp"
echo ""
echo "2. For optimal performance, the image should be:"
echo "   - Format: WebP (preferred) or JPG"
echo "   - Desktop size: 1920x600px (recommended)"
echo "   - File size: < 150KB"
echo "   - Quality: 85%"
echo ""
echo "3. If you have ImageMagick or similar tools, you can optimize with:"
echo "   convert input.jpg -resize 1920x600^ -gravity center -extent 1920x600 -quality 85 banner.webp"
echo ""
echo "4. The image will be automatically optimized by Next.js for different screen sizes"
echo ""
echo "Current banner image status:"
if [ -f "../public/images/banner.webp" ]; then
    echo "✅ Banner image found!"
    ls -lh ../public/images/banner.webp
else
    echo "❌ Banner image not found. Please save it as instructed above."
fi