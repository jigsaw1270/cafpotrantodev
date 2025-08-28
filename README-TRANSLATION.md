# 🌍 Translation System

## Overview

Simple translation system that detects Italian content and offers Google Translate integration.

## Components

### TranslationBanner

- Shows at the top of pages with Italian content
- Appears after 3 seconds
- Options to translate, dismiss, or remind later
- Remembers user preferences

### FloatingTranslateButton

- Always-available floating button in bottom-right corner
- Click to expand translation options
- One-click translation to English

## How it works

1. **Automatic Detection**: Scans page for Italian words
2. **User Choice**: Shows banner if Italian content detected
3. **Translation**: Opens Google Translate in new tab
4. **Memory**: Remembers if user dismissed permanently

## Features

- ✅ Simple and lightweight
- ✅ No external dependencies for detection
- ✅ Privacy-friendly (only localStorage)
- ✅ Mobile responsive
- ✅ Accessible with keyboard navigation
- ✅ Google Translate integration

## Files

- `src/components/TranslationBanner.tsx` - Top banner component
- `src/components/FloatingTranslateButton.tsx` - Floating button
- `src/utils/translation.ts` - Detection utilities

## Usage

Components are automatically included in the layout. No additional setup required.

## Customization

To modify the detection sensitivity, edit the Italian words list in `src/utils/translation.ts`.

To change the appearance delay, modify the timeout in the components.
