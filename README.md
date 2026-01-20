# YNM Mega Industries Global Pvt Ltd - Corporate Website

A modern, responsive, and feature-rich corporate website built for **YNM Mega Industries Global Pvt Ltd**, a leading manufacturer and exporter of premium paints, metal fabrications, and school furniture. This website serves as a comprehensive digital presence showcasing the company's products, services, client portfolio, and provides multiple engagement channels for visitors.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [What We've Built](#what-weve-built)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Routes](#pages--routes)
- [Components Architecture](#components-architecture)
- [API Endpoints](#api-endpoints)
- [Styling & Design System](#styling--design-system)
- [Asset Organization](#asset-organization)
- [Deployment](#deployment)
- [Project Cleanup & Organization](#project-cleanup--organization)
- [Development Guidelines](#development-guidelines)

---

## 🎯 Project Overview

**YNM Mega Industries Global Pvt Ltd** was established in 2013 and has grown to become a trusted manufacturer and exporter serving clients across 15+ countries. This website was built to:

- Showcase the company's extensive product catalog (paints, metal fabrications, school furniture)
- Highlight manufacturing capabilities and export services
- Display client portfolio and testimonials
- Provide easy contact and communication channels
- Support multilingual content (English/Hindi)
- Offer an interactive AI-powered chatbot for customer inquiries

The website is built using **Next.js 15** with React 19, featuring server-side rendering, optimized performance, and a modern, professional design.

---

## 🏗️ What We've Built

### Complete Website Structure

1. **Homepage** - Dynamic landing page with hero section, product showcase, client brands, testimonials, and company highlights
2. **Product Catalog** - Comprehensive product pages with categories, subcategories, and detailed product information
3. **Client Portfolio** - Dedicated page showcasing partnerships and client testimonials
4. **About Us** - Company history, mission, values, and manufacturing facility gallery
5. **Our Team** - Team member profiles and employee testimonials
6. **Careers** - Job listings and application form with resume upload
7. **Contact** - Multiple contact forms and communication channels
8. **Foreign Collaborations** - International partnerships with 6 regions (Germany, Singapore, UAE, Kenya, USA, Australia): partnership types, focus areas, duration, and benefits
9. **Investor Relations** - Corporate information for investors
10. **Legal Pages** - Privacy policy and terms & conditions

### Interactive Features

- **AI-Powered Chatbot** - Google Gemini integration for real-time customer support
- **Interactive Mascot** - Floating mascot with rotating company facts and prompts
- **Language Switcher** - Seamless English/Hindi translation support
- **Floating Social Media** - Quick access to social media profiles
- **Animated Components** - Smooth animations, transitions, and particle effects
- **Audio Feedback** - Web Audio API (tap, hover, swoosh) in CTA buttons for tactile feedback
- **Responsive Design** - Mobile-first approach, optimized for all devices

### Backend Functionality

- **Contact Form API** - Email integration using Nodemailer
- **Career Application API** - Resume upload and email notifications
- **Chat API** - Real-time AI chat using Google Gemini
- **Form Handling** - Secure form data parsing and validation

---

## ✨ Key Features

### 1. **Responsive & Modern Design**
   - Mobile-first responsive design
   - Touch-friendly navigation
   - Optimized for all screen sizes (mobile, tablet, desktop)
   - Fast page loads with optimized images
   - Smooth animations and transitions

### 2. **Multilingual Support**
   - English and Hindi language support
   - Context-based translation system
   - Language switcher component
   - All content dynamically translated

### 3. **AI-Powered Chatbot**
   - Google Gemini AI integration
   - Real-time conversation handling
   - FAQ-based instant answers (`lib/chatbotData.js`): products, contact, certifications, quoting, business hours
   - Product catalog and contact links for recommendations
   - Company information queries
   - Conversation history management

### 4. **Interactive Components**
   - Animated hero section with rotating taglines
   - Client brand showcase with flip cards
   - Product gallery with category filtering
   - Testimonials carousel (client & employee)
   - Floating mascot with company facts
   - Social media integration

### 5. **Contact & Communication**
   - Contact form with email integration
   - Career application form with file upload
   - Multiple contact channels
   - Social media links (LinkedIn, Facebook, Instagram)

### 6. **SEO & Performance**
   - Optimized images using Next.js Image component
   - Meta tags and descriptions
   - Sitemap.xml and robots.txt
   - Fast page loads
   - Server-side rendering (SSR)

### 7. **Visual Design Elements**
   - Custom animations and transitions
   - Neon particle effects
   - Gradient backgrounds
   - Professional color scheme
   - Custom typography (Montserrat font)

---

## 🛠 Tech Stack

### Frontend Technologies
- **Next.js 15.0.4** - React framework with SSR/SSG capabilities
- **React 19.0.0** - Modern UI library with hooks
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Next/Image** - Optimized image component
- **Styled-JSX** - Component-scoped styling

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **Nodemailer 7.0.12** - Email sending service for contact forms
- **Google APIs (Googleapis 170.0.0)** - Gemini AI integration
- **Formidable 3.5.4** - Form data parsing (multipart/form-data)
- **PDF-Parse 2.4.5** - Resume parsing for career applications

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing and optimization
- **Git** - Version control
- **Node.js 18+** - Runtime environment

---

## 📁 Project Structure

```
YNM website/
├── site/                              # Main application directory
│   ├── components/                    # React components
│   │   ├── BrandsSection.jsx         # Client/brand showcase with flip cards
│   │   ├── Chatbot.jsx               # AI chatbot component (Gemini)
│   │   ├── CTAButton.jsx             # Reusable call-to-action button
│   │   ├── EmployeesSection.jsx      # Team member testimonials
│   │   ├── FloatingSocialMedia.jsx   # Floating social media links
│   │   ├── Footer.jsx                # Site footer with links
│   │   ├── Hero.jsx                  # Hero section with animations
│   │   ├── LanguageSelector.jsx     # Language switcher
│   │   ├── Mascot.jsx                # Interactive floating mascot
│   │   ├── MissionSection.jsx        # Company mission section
│   │   ├── Navbar.jsx                # Navigation bar (responsive)
│   │   ├── ProductsSection.jsx      # Product showcase grid
│   │   ├── ServicesSection.jsx      # Services showcase
│   │   ├── TestimonialsSection.jsx  # Client testimonials carousel
│   │   └── USPSection.jsx           # Unique selling points
│   │
│   ├── contexts/                      # React contexts
│   │   └── LanguageContext.jsx       # Language switching context
│   │
│   ├── lib/                           # Utility libraries
│   │   ├── chatbotData.js           # Chatbot FAQ, product catalog, contact links
│   │   ├── sound.js                  # Web Audio API: playTap, playHover, playSwoosh for UI feedback
│   │   └── translations.js          # Translation data (EN/HI)
│   │
│   ├── pages/                         # Next.js pages (file-based routing)
│   │   ├── api/                       # API routes
│   │   │   ├── careers/
│   │   │   │   └── submit.js        # Career form submission API
│   │   │   ├── chat/
│   │   │   │   └── gemini.js         # Chatbot API (Gemini)
│   │   │   └── contact/
│   │   │       └── submit.js         # Contact form API
│   │   │
│   │   ├── about/                     # About page
│   │   │   └── index.jsx
│   │   ├── careers/                   # Careers page
│   │   │   └── index.jsx
│   │   ├── clients/                   # Clients page
│   │   │   └── index.jsx
│   │   ├── contact/                   # Contact page
│   │   │   └── index.jsx
│   │   ├── foreign-collaborations/   # Foreign collaborations (international partnerships)
│   │   │   └── index.jsx
│   │   ├── investor-relations/       # Investor relations page
│   │   │   └── index.jsx
│   │   ├── our-team/                  # Team page
│   │   │   └── index.jsx
│   │   ├── privacy/                   # Privacy policy
│   │   │   └── index.jsx
│   │   ├── products/                  # Products pages
│   │   │   ├── index.jsx             # Product catalog
│   │   │   └── [productId].jsx      # Dynamic product detail page
│   │   ├── terms/                     # Terms & conditions
│   │   │   └── index.jsx
│   │   ├── _app.js                    # App wrapper (global components)
│   │   ├── _document.js               # Custom document (HTML structure)
│   │   ├── _error.js                  # Error page
│   │   ├── 404.js                     # Custom 404 page
│   │   └── index.js                   # Homepage
│   │
│   ├── public/                        # Static assets
│   │   ├── assets/                    # Images and media
│   │   │   ├── client-logo-*.png     # Client logos (8 logos)
│   │   │   ├── gallery-*.jpg         # Gallery images (4 images)
│   │   │   ├── logo-*.jpg             # Brand logos (navbar, footer)
│   │   │   ├── product-*.png         # Product images (10 products)
│   │   │   ├── team-member-*.png     # Team photos (10 members)
│   │   │   ├── hero-image.png        # Hero section image
│   │   │   └── mascot.png            # Mascot image
│   │   │
│   │   ├── fonts/                     # Custom fonts
│   │   │   └── Montserrat[wght].ttf  # Montserrat variable font
│   │   │
│   │   ├── favicon.ico                # Site favicon
│   │   ├── robots.txt                 # SEO robots file
│   │   └── sitemap.xml                # SEO sitemap
│   │
│   ├── styles/                        # Global styles
│   │   ├── globals.css               # Global CSS (10,000+ lines)
│   │   └── theme.js                   # Theme configuration
│   │
│   ├── .gitignore                     # Git ignore rules
│   ├── .env.example                   # Environment variables template
│   ├── jsconfig.json                  # JavaScript configuration
│   ├── next.config.mjs                # Next.js configuration
│   ├── package.json                   # Dependencies and scripts
│   ├── package-lock.json              # Locked dependencies
│   ├── postcss.config.mjs             # PostCSS configuration
│   └── tailwind.config.js             # Tailwind CSS configuration
│
└── README.md                          # This comprehensive documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** (for version control)

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd "YNM website/site"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`.

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your configuration:
   ```env
   # Email Configuration (for contact forms)
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password
   RECIPIENT_EMAIL=recipient@example.com

   # Google Gemini API (for chatbot)
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build production-ready application
- `npm run lint` - Run ESLint to check code quality
- `npx next start` - Start production server (run after `npm run build`)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npx next start
```

The build output will be in the `.next/` directory.

---

## 📄 Pages & Routes

### Public Pages

| Route | Description | Components Used |
|-------|-------------|----------------|
| `/` | Homepage with hero, products, brands, testimonials | Hero, ProductsSection, BrandsSection, USPSection, EmployeesSection, TestimonialsSection, Footer |
| `/about` | Company information, timeline, values, gallery | Navbar, Footer, custom sections |
| `/products` | Product catalog with categories and filters | ProductsSection, Navbar, Footer |
| `/products/[productId]` | Individual product detail page | Dynamic product component |
| `/clients` | Client portfolio and testimonials | Client cards, testimonials |
| `/our-team` | Team member profiles and testimonials | Employee cards, photos |
| `/careers` | Career opportunities and application form | Career form, job listings |
| `/contact` | Contact form and information | Contact form, company details |
| `/foreign-collaborations` | International partnerships (6 regions) | Partnership cards, country flags, focus areas, benefits |
| `/investor-relations` | Investor information and corporate data | Corporate information |
| `/privacy` | Privacy policy page | Legal content |
| `/terms` | Terms and conditions page | Legal content |
| `/404` | Custom 404 error page | Error component |

### API Routes

| Endpoint | Method | Purpose | Request Body |
|----------|--------|---------|--------------|
| `/api/contact/submit` | POST | Contact form submission | `{ name, email, phone, subject, message }` |
| `/api/careers/submit` | POST | Career application submission | `{ name, email, phone, position, experience, resume }` |
| `/api/chat/gemini` | POST | Chatbot API endpoint | `{ message, conversationHistory }` |

---

## 🧩 Components Architecture

### Core Components

1. **Hero** (`components/Hero.jsx`)
   - Main landing section with animated taglines
   - Statistics display (years, projects, countries, clients)
   - Call-to-action buttons
   - Background animations

2. **Navbar** (`components/Navbar.jsx`)
   - Responsive navigation menu
   - Logo with fallback
   - Mobile menu support
   - Active route highlighting

3. **ProductsSection** (`components/ProductsSection.jsx`)
   - Product showcase grid
   - Category filtering
   - Product cards with images and descriptions
   - Hover effects

4. **BrandsSection** (`components/BrandsSection.jsx`)
   - Client/brand logos display
   - Animated flip cards
   - Auto-flip animation when in view
   - Partnership information

5. **Chatbot** (`components/Chatbot.jsx`)
   - AI-powered chat interface
   - Google Gemini integration
   - Conversation history
   - Product recommendations
   - Minimizable interface

6. **Mascot** (`components/Mascot.jsx`)
   - Interactive floating mascot
   - Rotating company facts
   - Minimizable interface
   - Smooth animations

7. **Footer** (`components/Footer.jsx`)
   - Company information
   - Quick links navigation
   - Social media links
   - Contact details
   - Copyright information

8. **EmployeesSection** (`components/EmployeesSection.jsx`)
   - Team member testimonials
   - Employee cards with photos
   - Department information
   - Grid layout

9. **TestimonialsSection** (`components/TestimonialsSection.jsx`)
   - Client testimonials carousel
   - Rating display (stars)
   - Company information
   - Smooth scrolling animation

10. **USPSection** (`components/USPSection.jsx`)
    - Unique selling points
    - Feature highlights
    - Icon-based presentation

11. **ServicesSection** (`components/ServicesSection.jsx`)
    - Services showcase
    - Service cards with descriptions
    - Visual elements

12. **LanguageSelector** (`components/LanguageSelector.jsx`)
    - Language switcher (EN/HI)
    - Context integration
    - Visual indicator

13. **FloatingSocialMedia** (`components/FloatingSocialMedia.jsx`)
    - Floating social media links
    - Fixed position
    - Smooth animations

14. **CTAButton** (`components/CTAButton.jsx`)
    - Reusable call-to-action button
    - Multiple variants
    - Link integration
    - Audio feedback on hover and click (via `lib/sound.js`)

---

## 🔌 API Endpoints

### Contact Form API

**Endpoint:** `/api/contact/submit`  
**Method:** POST  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "I would like to know more about your products."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Career Application API

**Endpoint:** `/api/careers/submit`  
**Method:** POST  
**Content-Type:** `multipart/form-data`

**Request Body:**
- `name` (string)
- `email` (string)
- `phone` (string)
- `position` (string)
- `experience` (string)
- `resume` (file)

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

### Chat API

**Endpoint:** `/api/chat/gemini`  
**Method:** POST  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "message": "Tell me about your products",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help you?" }
  ]
}
```

**Response:**
```json
{
  "response": "We manufacture premium paints, metal fabrications, and school furniture...",
  "conversationHistory": [...]
}
```

---

## 🎨 Styling & Design System

### Color Palette

The website uses a premium color scheme:

- **Primary Red**: `#74060D` - Main brand color
- **Secondary Red**: `#9A1B2E` - Accent color
- **Gold**: `#C9A24D` - Highlight color
- **Light Gold**: `#E6D3A3` - Background accent
- **Cream**: `#F7F3EA` - Background color
- **Dark Maroon**: `#5a0509` - Dark variant

### Typography

- **Primary Font**: Montserrat (variable font, weights 100-900)
- **Fallback Fonts**: Poppins, Inter, sans-serif
- **Font Loading**: Self-hosted for performance

### Theme Module

- **`styles/theme.js`**: JS-accessible theme (colors, fonts, shadows) for programmatic use.

### CSS Architecture

- **Tailwind CSS** - Utility-first classes for rapid development
- **Custom CSS** - `styles/globals.css` for complex animations and custom styles
- **Component-scoped Styles** - Styled-JSX for component-specific styles
- **CSS Variables** - Theme colors defined in `:root`

### Design Features

- Smooth scroll behavior
- Custom animations (fade, slide, rotate)
- Neon particle effects
- Gradient backgrounds
- Box shadows and borders
- Responsive breakpoints

---

## 🖼 Asset Organization

All assets are organized in `site/public/assets/` with consistent, descriptive naming:

### Naming Conventions

- **Products**: `product-{product-name}.png`
  - Example: `product-industrial-paint.png`
  - Example: `product-structural-steel.png`

- **Team Members**: `team-member-{number}.png`
  - Example: `team-member-01.png` through `team-member-10.png`

- **Client Logos**: `client-logo-{client-name}.png`
  - Example: `client-logo-elite-constructions.png`
  - Example: `client-logo-global-exports.png`

- **Gallery Images**: `gallery-{description}.jpg`
  - Example: `gallery-manufacturing-facility.jpg`
  - Example: `gallery-production-line.jpg`

- **Branding**: `logo-{location}.jpg`, `hero-image.png`, `mascot.png`
  - Example: `logo-navbar.jpg`, `logo-footer.jpg`

### Image Guidelines

- All images optimized before adding
- PNG for logos and graphics with transparency
- JPG for photographs
- Consistent dimensions for similar image types
- All references updated when renaming images

### Current Assets

- **10 Product Images** - Various product categories
- **10 Team Member Photos** - Employee testimonials
- **8 Client Logos** - Partner companies
- **4 Gallery Images** - Manufacturing facility, production line, quality control, warehouse
- **2 Logo Variants** - Navbar and footer logos
- **1 Hero Image** - Main landing section
- **1 Mascot Image** - Interactive mascot

---

## 🚢 Deployment

### Build Process

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **The build output** will be in the `.next/` directory.

**Configuration notes** (`next.config.mjs`): Images use `unoptimized: true`. API routes (`/api/contact`, `/api/careers`, `/api/chat/gemini`) require a Node.js server and do not work with static export (`output: 'export'`).

### Deployment Options

#### Vercel (Recommended)
- Optimized for Next.js
- Automatic deployments from Git
- Environment variables configuration
- Free tier available

#### Netlify
- Static site hosting
- Form handling support
- Environment variables
- Free tier available

#### Custom Server
- Node.js server deployment
- PM2 for process management
- Nginx reverse proxy
- SSL certificate required

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:

- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port (usually 587)
- `SMTP_USER` - Email account username
- `SMTP_PASS` - Email account password
- `RECIPIENT_EMAIL` - Email address to receive form submissions
- `GEMINI_API_KEY` - Google Gemini API key for chatbot

---

## 🧹 Project Cleanup & Organization

### Recent Cleanup (Completed)

The project has been cleaned and organized for optimal structure:

#### Files Removed
- ✅ Deleted unused Next.js default SVG files:
  - `next.svg`, `vercel.svg`, `file.svg`, `window.svg`, `globe.svg`
- ✅ Removed unused Geist fonts:
  - `pages/fonts/GeistMonoVF.woff`
  - `pages/fonts/GeistVF.woff`
  - Removed empty `pages/fonts/` directory

#### Files Renamed
- ✅ `env.example` → `.env.example` (standard convention)

#### Code Fixes
- ✅ Fixed broken image references in `pages/index.js`:
  - Updated client logo paths to match actual filenames
  - Replaced missing `pexels-*.jpg` references with existing gallery images
  - All image references now point to existing files

#### Current Status
- ✅ All assets properly organized in `public/assets/`
- ✅ All image references working correctly
- ✅ No broken links or missing files
- ✅ Clean project structure
- ✅ Consistent naming conventions

---

## 👨‍💻 Development Guidelines

### Code Style

- Use functional components with React hooks
- Follow React best practices
- Maintain consistent naming conventions:
  - Components: PascalCase (e.g., `Hero.jsx`)
  - Files: kebab-case or camelCase
  - Variables: camelCase
- Comment complex logic
- Keep components modular and reusable

### File Organization

- Components in `components/` directory
- Pages in `pages/` directory (Next.js routing)
- Utilities in `lib/` directory
- Styles in `styles/` directory
- Assets in `public/assets/` directory

### Git Workflow

- Create feature branches for new work
- Write descriptive commit messages
- Test before merging to main
- Update README when adding features

### Adding New Features

When implementing new features:

1. Create component in `components/` directory
2. Add page in `pages/` directory (if needed)
3. Update translations in `lib/translations.js` (if multilingual)
4. Add styles in `styles/globals.css` or component-scoped
5. Update this README with new features
6. Test on multiple devices and browsers

### Best Practices

- **Performance**: Optimize images, use Next.js Image component
- **Accessibility**: Use semantic HTML, ARIA labels where needed
- **SEO**: Add meta tags, descriptions, alt text for images
- **Security**: Validate form inputs, sanitize user data
- **Responsive**: Test on mobile, tablet, and desktop
- **Browser Support**: Test on Chrome, Firefox, Safari, Edge

---

## 📝 Project Status

### ✅ Completed Features

- [x] Responsive homepage with all sections
- [x] Product catalog with categories
- [x] Client portfolio page
- [x] About us page
- [x] Team page
- [x] Careers page with application form
- [x] Contact page with form
- [x] Investor relations page
- [x] Privacy and Terms pages
- [x] AI-powered chatbot (Gemini) with FAQ instant answers and product catalog
- [x] Multilingual support (EN/HI)
- [x] Interactive mascot
- [x] Foreign collaborations page (international partnerships: Germany, Singapore, UAE, Kenya, USA, Australia)
- [x] Audio feedback on CTA buttons (Web Audio API: tap, hover)
- [x] Social media integration
- [x] Email integration (contact & careers)
- [x] SEO optimization (sitemap, robots.txt)
- [x] Project cleanup and organization

### 🔄 Future Enhancements (Optional)

- [ ] Blog/news section
- [ ] Product comparison feature
- [ ] Live chat support
- [ ] Customer portal/login
- [ ] Order tracking system
- [ ] Multi-currency support
- [ ] Advanced analytics integration
- [ ] Newsletter subscription
- [ ] Video gallery
- [ ] Interactive product configurator

---

## 📞 Support & Contact

For questions, issues, or contributions:

- **Check the code comments** - Most components have inline documentation
- **Review component documentation** - Each component is self-contained
- **Contact the development team** - For project-specific questions

---

## 📄 License

This project is **proprietary and confidential**. All rights reserved by **YNM Mega Industries Global Pvt Ltd**.

---

## 📊 Project Statistics

- **Total Components**: 14 React components
- **Total Pages**: 12 public pages + 3 API routes
- **Total Assets**: 36 images (products, team, clients, gallery)
- **Lines of Code**: ~15,000+ lines
- **Dependencies**: 7 production + 3 development
- **Build Size**: Optimized for production

---

## 🎉 Conclusion

This is a **complete, production-ready corporate website** built with modern web technologies. It features:

- ✅ Full responsive design
- ✅ AI-powered chatbot
- ✅ Multilingual support
- ✅ Contact forms with email integration
- ✅ Professional design and animations
- ✅ SEO optimized
- ✅ Clean, organized codebase
- ✅ Well-documented structure

The website is ready for deployment and can serve as a comprehensive digital presence for YNM Mega Industries Global Pvt Ltd.

---

**Last Updated:** January 2025  
**Version:** 1.1.0  
**Maintained by:** Development Team  
**Built with:** Next.js 15, React 19, Tailwind CSS

---

*For detailed component documentation, refer to individual component files and inline comments.*
