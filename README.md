# 🚀 Artistic Portfolio Website

A stunning, modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and cutting-edge animations.

## ✨ Features

- **🎨 Modern Design**: Dark theme with glassmorphism effects and gradient animations
- **🚀 3D Elements**: Interactive Three.js backgrounds and floating elements
- **📱 Fully Responsive**: Optimized for all device sizes
- **⚡ Smooth Animations**: Framer Motion and GSAP powered animations
- **🛸 Smooth Scrolling**: Lenis-powered buttery smooth scrolling
- **🎭 Interactive Components**: Hover effects, micro-interactions, and engaging UI
- **📧 Contact Form**: Functional contact form with validation
- **🔧 Easy Customization**: Well-structured, documented code

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Three.js + R3F** - 3D graphics
- **GSAP** - Advanced animations
- **Lenis** - Smooth scrolling
- **Lucide React** - Icon library

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd personal-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## 🎨 Customization Guide

### 1. Personal Information

Update the following files with your information:

**Hero Section** (`src/components/sections/HeroSection.tsx`):
- Change "Your Name" to your actual name
- Update the description and title
- Modify social media links

**About Section** (`src/components/sections/AboutSection.tsx`):
- Update the about me text
- Modify stats (years of experience, projects, etc.)
- Add your photo in place of the User icon

**Contact Section** (`src/components/sections/ContactSection.tsx`):
- Update email, phone, and location
- Modify social media links

### 2. Projects

Edit `src/components/sections/ProjectsSection.tsx`:
- Replace the dummy projects with your real projects
- Update project images, descriptions, and links
- Modify the technology stacks

### 3. Skills

Update `src/components/sections/SkillsSection.tsx`:
- Modify skill categories and items
- Adjust skill levels (percentages)
- Update icons and descriptions

### 4. Colors & Theme

Modify `src/app/globals.css` and `tailwind.config.ts`:
- Change CSS custom properties for colors
- Update gradient combinations
- Modify animation durations

### 5. Add Your Images

Create the following directories and add your images:
```
public/
  images/
    profile.jpg
    projects/
      project1.jpg
      project2.jpg
      ...
```

Then update the image sources in the components.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── navigation.tsx
│       ├── Footer.tsx
│       ├── LoadingScreen.tsx
│       └── SmoothScrollProvider.tsx
└── hooks/
    └── useScrollAnimation.ts
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: `npm run build` then upload `out/` folder
- **GitHub Pages**: Enable GitHub Pages in repository settings

## 🎯 Performance Tips

- Optimize images using Next.js Image component
- Lazy load heavy components
- Use dynamic imports for Three.js components
- Minimize bundle size with tree shaking

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💖 Support

If you found this helpful, please give it a ⭐️!

---

**Made with ❤️ and lots of coffee** ☕

Happy coding! 🚀
