# 🚀 Quantum Computing Visualization App

A modern, interactive React web application for presenting Quantum Computing services using Three.js and Framer Motion. Built for LTIMindtree with a stunning dark futuristic theme.

## ✨ Features

- **3D Quantum Sphere Animation** - Interactive rotating sphere representing qubits
- **Smooth Page Transitions** - Beautiful animations between slides using Framer Motion
- **Floating 3D Cards** - Interactive 3D cards explaining services and offerings
- **Interactive Camera Controls** - Explore 3D visuals with mouse/touch controls
- **Dark Futuristic Theme** - Neon blue and aqua accents with glowing effects
- **Responsive Design** - Works perfectly on desktop and tablet
- **Autoplay Mode** - Slideshow functionality with automatic page transitions
- **Background Music Toggle** - Optional audio support (UI ready)
- **Loading Screen** - Animated loading experience
- **Particle Background** - Glowing grid and particle effects

## 📋 Pages Included

1. **Intro** - Title screen with glowing quantum sphere
2. **What is Quantum Computing** - Animated analogy explaining quantum computing
3. **Use Cases & Benefits** - Interactive icons showcasing benefits
4. **LTIM Service Offerings** - 3D floating cards with service details
5. **Revenue Impact** - Animated chart showing growth projections
6. **Conclusion** - Big CTA: "Quantum is the Future — Let's Lead It"

## 🛠️ Technologies Used

- **React 18** - Latest React version
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Vite** - Fast build tool and dev server

## 📦 Installation

1. **Clone or download the project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## 🚀 Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## 🎮 Usage

### Navigation

- **Previous/Next Buttons** - Click the arrow buttons at the bottom to navigate
- **Page Indicators** - Dots showing current page position
- **Autoplay Toggle** - Click the play/pause button to enable automatic slideshow
- **Keyboard Navigation** - Coming soon (can be added)

### Camera Controls

- **Left Click + Drag** - Rotate the camera around 3D objects
- **Right Click + Drag** - Pan the camera
- **Scroll Wheel** - Zoom in/out (when enabled)

### Background Music

- Click the music icon in the top-right corner to toggle background music
- Note: You'll need to add your own audio file in the `BackgroundMusic` component

## 📁 Project Structure

```
ppt/
├── src/
│   ├── components/
│   │   ├── BackgroundMusic.jsx      # Music toggle component
│   │   ├── FloatingCard.jsx         # 3D floating card for services
│   │   ├── LoadingScreen.jsx        # Loading animation
│   │   ├── Navigation.jsx           # Navigation controls
│   │   ├── ParticleBackground.jsx   # Particle effect background
│   │   └── QuantumSphere.jsx        # 3D quantum sphere component
│   ├── pages/
│   │   ├── ConclusionPage.jsx       # Final page with CTA
│   │   ├── IntroPage.jsx            # Introduction page
│   │   ├── RevenuePage.jsx          # Revenue growth page
│   │   ├── ServicesPage.jsx         # Services offerings page
│   │   ├── UseCasesPage.jsx         # Use cases page
│   │   ├── WhatIsQuantumPage.jsx    # What is quantum page
│   │   └── Page.css                 # Shared page styles
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # App styles
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
└── README.md                        # This file
```

## 🎨 Customization

### Colors

The theme colors can be customized in `src/index.css` and `src/pages/Page.css`:

- Primary Blue: `#00d4ff`
- Aqua/Teal: `#00ffff`
- Background: `#0a0a0f`

### Adding Background Music

1. Add your audio file to `public/` folder
2. Update `src/components/BackgroundMusic.jsx`:

```jsx
const audioRef = useRef(new Audio('/your-audio-file.mp3'))

useEffect(() => {
  if (enabled) {
    audioRef.current.play()
    audioRef.current.loop = true
  } else {
    audioRef.current.pause()
  }
}, [enabled])
```

### Modifying Content

All page content can be easily modified in the respective page components in `src/pages/`.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- The app is optimized for desktop and tablet viewing
- Mobile support can be enhanced by adjusting breakpoints in CSS
- 3D performance depends on device GPU capabilities
- Particle count can be reduced on lower-end devices in `ParticleBackground.jsx`

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for use.

## 🎯 Future Enhancements

- [ ] Keyboard navigation support
- [ ] Touch gesture controls for mobile
- [ ] More interactive 3D models
- [ ] VR/AR support
- [ ] Multi-language support
- [ ] Export to PDF/Video functionality

---

**Built with ❤️ for Quantum Computing Education**


