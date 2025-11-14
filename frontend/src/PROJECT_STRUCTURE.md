# Modeshworld E-commerce Website

A responsive React.js e-commerce website built from Figma designs, featuring a sidebar navigation, login page, and home page.

## Project Structure

```
/
├── App.tsx                 # Main application with routing
├── components/
│   ├── Layout.tsx         # Layout wrapper with responsive sidebar
│   ├── Sidebar.tsx        # Navigation sidebar component
│   ├── HomePage.tsx       # Home page with products and banners
│   └── LoginPage.tsx      # Login/Registration page
├── imports/               # Figma imported assets and SVGs
└── styles/
    └── globals.css        # Global styles and Tailwind config
```

## Features

### Responsive Design
- **Desktop (1024px+)**: Sidebar is always visible on the left
- **Mobile/Tablet**: Sidebar is hidden by default, accessible via hamburger menu
- All components are fully responsive with mobile-first approach

### Pages

#### Home Page (`/`)
- Hero banner with "NEW COLLECTION" promotion
- New Arrivals product grid (4 products)
- Category navigation
- Multiple promotional banners
- Responsive product cards with hover effects

#### Login Page (`/login`)
- Mobile number input with country code selector
- OTP sending options (WhatsApp/SMS)
- Fully responsive form layout
- Footer with contact information and social links

#### Sidebar Navigation
- User profile section
- Login/Register button
- Navigation menu:
  - Switch to DreamDubai
  - Home
  - Women
  - Men
  - Kids
  - Stationery
- App download section
- Currency selector (AED)
- Language selector (English)
- Closeable on mobile with X button

## Components

### Sidebar
**File**: `/components/Sidebar.tsx`
- Fixed width: 390px
- Scrollable content area
- Yellow header with profile
- Menu items with icons
- Footer with currency/language selectors
- Props:
  - `onClose?: () => void` - Callback for closing sidebar on mobile

### HomePage
**File**: `/components/HomePage.tsx`
- Header with navigation and cart
- Hero banner section
- New Arrivals grid
- Category showcase
- Promotional banners
- Props:
  - `onMenuClick?: () => void` - Callback to open mobile menu

### LoginPage
**File**: `/components/LoginPage.tsx`
- Sign-up/Login form
- Mobile number input
- Country code dropdown
- OTP delivery options
- Footer with links and contact info
- Fully self-contained page

### Layout
**File**: `/components/Layout.tsx`
- Wrapper component for consistent layout
- Manages sidebar visibility
- Props:
  - `children: ReactNode`
  - `showSidebar?: boolean`
  - `onCloseSidebar?: () => void`

## Technologies

- **React 18** - UI framework
- **TypeScript/JavaScript** - Programming language
- **React Router DOM** - Client-side routing
- **Tailwind CSS v4** - Styling framework
- **Lucide React** - Icon library
- **Figma Assets** - Images and SVG paths from Figma imports

## Routing

- `/` - Home page (default route)
- `/login` - Login/Registration page

## Responsive Breakpoints

- **Mobile**: < 768px
  - Sidebar hidden by default
  - Hamburger menu to toggle sidebar
  - Single column product grid
  - Stacked navigation

- **Tablet**: 768px - 1023px
  - Sidebar accessible via menu
  - Two-column product grid
  - Horizontal navigation

- **Desktop**: ≥ 1024px
  - Sidebar always visible
  - Four-column product grid
  - Full navigation visible

## Key Features

1. **Modular Architecture**: Each page and component is in its own file
2. **Responsive Navigation**: Sidebar adapts to screen size
3. **Preserved Figma Design**: All original styling and layouts maintained
4. **Clean Routing**: React Router for seamless navigation
5. **Interactive Elements**: Hover effects, clickable products, form inputs
6. **Mobile-First**: Optimized for mobile devices with desktop enhancements

## Usage

Navigate between pages:
- Click "Login / Register" in sidebar to go to `/login`
- Click "Home" in sidebar or logo to return to `/`
- On mobile, tap hamburger menu to open/close sidebar
- Tap outside sidebar overlay to close on mobile

## Customization

All components accept props for easy customization:
- Pass `onMenuClick` to HomePage to control sidebar behavior
- Pass `onClose` to Sidebar to handle close actions
- Modify Layout to change sidebar positioning or behavior

## Assets

All images and SVG paths are imported from Figma exports located in `/imports/`:
- Product images
- Banner images
- Icons and logos
- Navigation icons
- Social media icons

## Notes

- The design preserves the exact Tailwind classes from Figma
- All fonts use Nunito family as specified in Figma
- Colors match the original design (yellow #FFE600, blue #00A8E3, etc.)
- Layout maintains Figma spacing and sizing
