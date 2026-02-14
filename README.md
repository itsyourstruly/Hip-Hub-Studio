# Hip Hub Studio

A modern music collaboration platform built with React, connecting artists, producers, and musicians.

## Features

- **Side A** - Community features with slideshow
- **Side B** - Production studio features
- Sample catalog with search and filters
- Verse collaboration requests
- Multi-step upload forms
- User authentication

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18
- React Router
- Vite
- CSS (original styles preserved)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context (Auth, etc.)
├── pages/          # Route components
├── styles/         # CSS files
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

## Routes

- `/` - Home (Side B - Studio)
- `/side-a` - Home (Side A - Community)
- `/sample-catalog` - Browse samples
- `/fill-a-verse` - View verse requests
- `/upload-sample` - Upload sample
- `/upload-verse` - Create verse request
- `/signup` - User registration
