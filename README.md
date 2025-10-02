# MyReactNativeApp

A React Native project with **full TypeScript support** and a well-organized structure.

## Project Structure

```
MyReactNativeApp/
├── src/
│   ├── components/          # Reusable UI components (TypeScript)
│   │   ├── Header.tsx
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── screens/             # Screen components (TypeScript)
│   │   ├── HomeScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/          # Navigation configuration
│   ├── services/            # API and external services (TypeScript)
│   │   ├── ApiService.ts
│   │   └── StorageService.ts
│   ├── utils/               # Utility functions (TypeScript)
│   │   └── index.ts
│   ├── constants/           # App constants (TypeScript)
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── assets/              # Static assets
│       ├── images/
│       └── fonts/
├── web/                     # Web-specific files (TypeScript)
│   ├── index.tsx
│   └── index.html
├── android/                 # Android-specific code
├── ios/                     # iOS-specific code
├── App.tsx                  # Main app component (TypeScript)
├── index.tsx               # App entry point (TypeScript)
├── tsconfig.json            # TypeScript configuration
├── tsconfig.web.json        # Web-specific TypeScript config
├── package.json             # Dependencies and scripts
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
├── webpack.config.js        # Webpack configuration (TypeScript support)
├── jest.config.js           # Jest testing configuration
├── .eslintrc.js             # ESLint configuration
├── .prettierrc.js           # Prettier configuration
└── .gitignore               # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js (>= 16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Project Features

- ✅ Organized folder structure
- ✅ Reusable components
- ✅ Sample screens
- ✅ API service layer
- ✅ Storage service
- ✅ Utility functions
- ✅ Constants management
- ✅ TypeScript support
- ✅ ESLint and Prettier configuration
- ✅ Jest testing setup

## Development Guidelines

1. **Components**: Place reusable UI components in `src/components/`
2. **Screens**: Place screen components in `src/screens/`
3. **Services**: Place API calls and external services in `src/services/`
4. **Utils**: Place utility functions in `src/utils/`
5. **Constants**: Place app constants in `src/constants/`
6. **Types**: Place TypeScript definitions in `src/types/`

## Contributing

1. Follow the existing code structure
2. Use ESLint and Prettier for code formatting
3. Write tests for new features
4. Update documentation as needed
