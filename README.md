# IDE-Style Portfolio Website

Modern IDE-style portfolio website with blog functionality, built with React 19 and Vite, deployed on AWS with serverless architecture. Features a sidebar navigation, hash-based routing, comprehensive blog system, and enhanced visual interactions with mobile optimization.

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
my_personal_website/
├── src/                           # React components and source code
│   ├── components/                # React components
│   │   ├── Layout.jsx            # IDE layout with sidebar navigation
│   │   ├── Router.jsx            # Hash-based routing system
│   │   ├── Blog.jsx              # Blog listing component
│   │   ├── Blog/
│   │   │   └── BlogPost.jsx      # Individual blog post component
│   │   ├── Hero.jsx              # Hero section with centered layout and about content
│   │   ├── Skills.jsx            # Skills section
│   │   ├── Projects.jsx          # Projects section
│   │   ├── Certifications.jsx    # Certifications section
│   │   ├── Experience.jsx        # Thought Leadership & Recognition section
│   │   ├── Contact.jsx           # Contact section
│   │   ├── Navigation.jsx        # Navigation component
│   │   └── VisitorCounter.jsx    # Visitor counter component
│   ├── lib/
│   │   └── blog.js               # Blog data management
│   ├── content/
│   │   └── blog/                  # Blog post markdown files
│   └── App.jsx                   # Main application component
├── public/                        # Static assets (favicon, images)
├── lambda/                        # AWS Lambda functions
│   └── visitor-counter/          # Visitor counter Lambda
├── cloudformation/               # CloudFormation IaC templates
├── scripts/                       # Deployment and setup scripts
├── docs/                          # Project documentation
├── dist/                          # Build output (gitignored)
└── .env.example                   # Environment variables template
```

## Deployment

### Prerequisites

1. Copy `.env.example` to `.env` and fill in your AWS values:
   ```bash
   cp .env.example .env
   ```

2. Configure AWS CLI with your profile:
   ```bash
   aws configure --profile your-profile-name
   ```

### Deploy to AWS

```bash
# Make deploy script executable (first time only)
chmod +x deploy.sh

# Build and deploy
./deploy.sh
```

This will:
- Build the React app
- Upload to S3
- Invalidate CloudFront cache
- Site live in 1-2 minutes

## Documentation

- **[.env.example](.env.example)** - Environment variables template
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Detailed deployment guide for IDE-style portfolio
- **[cloudformation/](cloudformation/)** - CloudFormation templates for AWS resources

### Blog System
- **Blog Creation**: See project documentation for blog post creation instructions
- **Blog Content**: Located in `src/content/blog/`
- **Blog Data**: Managed in `src/lib/blog.js`

## Tech Stack

### Frontend
- **React 19.2.3**: Latest React with hooks and functional components
- **Vite 7.3.0**: Fast build tool and development server
- **CSS3**: Custom styling with IDE dark theme and enhanced animations
- **Hash-based Routing**: Client-side navigation without page reloads
- **SVG Icons**: Professional icon system replacing emojis

### Backend & Infrastructure
- **AWS Lambda**: Serverless functions for visitor counter
- **API Gateway**: REST API endpoints
- **DynamoDB**: NoSQL database for visitor data
- **S3 + CloudFront**: Static hosting with global CDN
- **CloudFormation**: Infrastructure as Code

### Features
- **IDE-style Layout**: 180px sidebar with main content area
- **Blog System**: Full blog with filtering and navigation
- **Responsive Design**: Mobile-optimized with touch interactions
- **GitHub Dark Theme**: Professional IDE aesthetic
- **Enhanced Interactions**: Hover effects, animations, and transitions
- **Mobile Perfection**: Touch-friendly 44px targets and optimized layouts
- **Visual Polish**: Consistent styling across all pages

## Making Updates

### Content Updates
1. **Components**: Edit in `src/components/`
2. **Blog Posts**: Create markdown files in `src/content/blog/` and update `src/lib/blog.js`
3. **Blog Data**: Update `src/lib/blog.js`
4. **Test locally**: `npm run dev`
5. **Build**: `npm run build`

### IDE Features
- **Sidebar Navigation**: Menu items in `src/components/Layout.jsx`
- **Routing**: Hash-based navigation in `src/components/Router.jsx`
- **Blog Filtering**: Categories and tags in `src/lib/blog.js`
- **Styling**: IDE dark theme in component CSS files

## Security

- Never commit `.env` files
- Environment variables for API endpoints
- HTTPS enforced

## Key Features

### IDE-Style Layout
- **180px fixed sidebar** with navigation menu
- **Main content area** with full-width display
- **Hash-based routing** (#home, #about, #blog, etc.)
- **Responsive design** with mobile hamburger menu
- **Centered hero section** with professional layout

### Blog System
- **5 blog posts** covering AI governance, policy-as-code, and projects
- **Category filtering** (GRC, DevOps, AI/ML, Personal Finance, Projects)
- **Tag filtering** by technology and topic
- **Full post content** with code examples and technical details
- **Navigation** between posts and back to blog list

### Enhanced Visual Design
- **Professional SVG icons** replacing all emojis
- **Consistent hover effects** across all interactive elements
- **Smooth animations** with 0.3s transitions
- **Enhanced shadows** and depth effects
- **Modern micro-interactions** for better UX

### Mobile Optimization
- **Touch-friendly targets** with 44px minimum sizing
- **Optimized layouts** for mobile screens
- **Enhanced readability** with proper line heights
- **Consistent spacing** and mobile-first design
- **Performance optimized** for mobile devices

### Thought Leadership & Recognition
- **External publications** in industry publications and platforms
- **Professional contributions** to standards organizations (CSA, ISO)
- **White papers** and thought leadership content
- **Conference presentations** and speaking engagements
- **Leadership roles** and board memberships
- **Professional recognition** and industry validation

### GitHub Dark Theme
- **Professional IDE aesthetic** with #0d1117 background
- **Monospace headers** and code-like styling
- **Subtle borders** and enhanced hover effects
- **Consistent color scheme** throughout
- **Modern visual polish** with contemporary design

## License

© 2026 AJ Williams
