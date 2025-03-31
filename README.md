# EngBoost - English Learning Platform

EngBoost is a modern web application designed to help users learn English vocabulary through image recognition technology.

## 📷 Features

- **Image Recognition**: Upload images and get instant English vocabulary with Vietnamese translations
- **Flashcard System**: Create, save, and organize flashcards to study vocabulary
- **Study Progress Tracking**: Monitor your learning progress over time
- **Course Management**: Access structured learning courses for different levels
- **Personalized Learning**: Study at your own pace with customized learning paths

## 🚀 Core Functionality

### Snap & Learn (Snaplang)

Upload any image and EngBoost will automatically:

1. Identify objects in the image
2. Generate relevant English vocabulary
3. Provide Vietnamese translations
4. Create flashcards for future study

### Flashcard Management

- Organize flashcards into folders
- Review flashcards with spaced repetition
- Study with interactive flip cards
- Track your memory retention

## 🔧 Technology Stack

- **Frontend**: React, Redux, Material UI, TailwindCSS
- **UI/UX**: Modern, responsive design optimized for all devices
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router
- **Forms**: React Hook Form
- **Notifications**: React Toastify
- **Animations**: AOS (Animate On Scroll)

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd engboost-frontend

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The app will run at `http://localhost:5173` by default.

## 📦 Build for Production

```bash
# Build the app
yarn build

# Preview the production build
yarn preview
```

## 🌐 Project Structure

- `src/components` - Reusable UI components
- `src/pages` - Application page components
- `src/redux` - Redux store, slices, and reducers
- `src/utils` - Utility functions and constants
- `src/assets` - Static assets like images and icons
- `src/apis` - API service integrations

## 📝 Slogan

**"Fuel your Fluency - Nâng tầm tiếng Anh của bạn"**

---

© EngBoost. All rights reserved.
