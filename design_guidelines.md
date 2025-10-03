# Design Guidelines: Labor Replacement Management App

## Design Approach
**Selected Approach**: Minimalist Design System
- **Rationale**: Utility-focused productivity tool requiring efficiency, clarity, and mobile-first optimization
- **Inspiration**: Material Design principles with enhanced minimalism for faster task completion
- **Core Principle**: Maximum clarity with minimum visual noise - every element serves a functional purpose

## Color Palette

### Primary Colors
- **Primary (Pastel Blue)**: 210 45% 75% - Main actions, active states, primary buttons
- **Primary Dark**: 210 50% 60% - Hover states, emphasis
- **Primary Light**: 210 40% 85% - Subtle backgrounds, badges

### Neutral Scale
- **Background**: 0 0% 96% (light gray) - Main app background
- **Surface**: 0 0% 100% (white) - Cards, forms, elevated content
- **Border**: 0 0% 88% - Subtle dividers and field borders
- **Text Primary**: 0 0% 15% - Headings, labels
- **Text Secondary**: 0 0% 45% - Supporting text, placeholders

### Status Colors
- **Success (Approved)**: 142 55% 65% - Green for approved replacements
- **Error (Rejected)**: 0 70% 65% - Red for rejected items
- **Warning (Pending)**: 38 90% 65% - Amber for pending approvals
- **Info**: 210 45% 75% - Uses primary color for informational states

## Typography

### Font Family
- **Primary**: 'Inter' or 'System UI' - Clean, highly legible sans-serif optimized for mobile screens
- **Weights**: Regular (400) for body, Medium (500) for labels, Semibold (600) for headings

### Type Scale (Mobile-Optimized)
- **H1**: 28px/32px - Screen titles
- **H2**: 22px/28px - Section headers
- **H3**: 18px/24px - Card titles, form groups
- **Body**: 16px/24px - Form labels, list items
- **Small**: 14px/20px - Helper text, timestamps
- **Button Text**: 16px/20px Medium - All CTAs

## Layout System

### Spacing Primitives
**Core Units**: Tailwind scale of 4, 6, 8, 12, 16 (1rem = 16px)
- **Component padding**: p-4 to p-6 (16-24px)
- **Section spacing**: py-8 to py-12 (32-48px)
- **Form field gaps**: gap-4 (16px)
- **Card margins**: m-4 (16px)

### Mobile Grid
- **Single column primary layout** for forms and lists
- **Container**: max-w-md (448px) centered with px-4 side padding
- **Cards**: Full width with 16px horizontal margins
- **Touch targets**: Minimum 44px height for all interactive elements

## Component Library

### Navigation
- **Top Bar**: Fixed header (h-16) with screen title, back button when needed, logout in corner
- **Bottom Tab Bar** (for multi-role apps): 4 fixed tabs with icons and labels, 64px height

### Forms (Supervisor Replacement Form)
- **Dropdowns**: Full-width, 56px height, rounded-lg borders, clear chevron indicators
- **Text Input**: 56px height, rounded-lg, border-2 on focus with primary color
- **Labels**: 14px medium weight, 8px margin bottom, text-secondary color
- **Validation Messages**: 14px, error color, 4px top margin

### Buttons
- **Primary CTA**: Full-width or min-w-32, h-12, rounded-lg, primary blue background, white text
- **Secondary**: h-12, rounded-lg, border-2 primary, primary text, white background
- **Approve**: h-10, rounded-md, success color background
- **Reject**: h-10, rounded-md, error color background
- **Touch-friendly spacing**: 12px minimum between buttons

### Cards (Replacement History, Pending Items)
- **Container**: White background, rounded-xl, shadow-sm, p-4 to p-6
- **Header**: Flex row with title and status badge
- **Content**: 12px gap between rows
- **Actions**: Flex row gap-3, placed at card bottom
- **Status Badges**: Inline-flex, px-3 py-1, rounded-full, status color background with white text

### Lists
- **Item Height**: 72-88px for adequate touch area
- **Dividers**: 1px border-b in border color
- **Item Padding**: px-4 py-3
- **Multi-line layout**: Name bold on top, details text-secondary below

### Login Screen
- **Centered card**: max-w-sm, white surface, rounded-2xl, shadow-lg
- **Logo area**: 80px height, centered, mb-8
- **Input stack**: gap-4 vertical spacing
- **Submit button**: Primary, full-width, mt-6

## Screen-Specific Layouts

### Supervisor Dashboard
- **Header**: Screen title "Create Replacement" with logout
- **Form Card**: Single white card containing all form fields with 16px gaps
- **Field Order**: Absent Worker → Replacement Worker → Extra Amount → Work Site
- **Submit Button**: Fixed bottom with safe area padding or at form end

### HR Dashboard
- **Tab Filter**: Pill toggles (All/Pending/Approved/Rejected) below header
- **List**: Scrollable cards with replacement details and action buttons
- **Empty State**: Centered icon + message when no items

### History Screen
- **Timeline Style**: Cards with left border accent showing status color
- **Sort Controls**: Dropdown for date/status sorting
- **Infinite Scroll**: Load more as user scrolls

## Interactions & States

### Micro-interactions (Minimal)
- **Button Press**: Scale 0.98 on active
- **Card Tap**: Subtle shadow increase
- **Form Focus**: Border color transition to primary (200ms)
- **Status Change**: Color fade transition (300ms)

### Loading States
- **Skeleton Screens**: Gray pulse animation for lists/cards while loading
- **Button Loading**: Spinner replacing text, disabled state
- **Pull to Refresh**: Native mobile pattern on lists

## Images
No hero images needed - this is a utility app focused on form completion and data display. Only use:
- **Login Logo**: Company branding, centered, 120x120px max
- **Empty State Icons**: Simple line illustrations, 120x120px, text-secondary color
- **Status Icons**: 20x20px icons in badges (checkmark, X, clock)