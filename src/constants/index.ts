// API Configuration
export const API_BASE_URL: string = 'https://api.example.com';
export const API_TIMEOUT: number = 10000;

// App Configuration
export const APP_NAME: string = 'MyReactNativeApp';
export const APP_VERSION: string = '1.0.0';

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  SETTINGS: 'app_settings',
} as const;

// Navigation
export const SCREEN_NAMES = {
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
} as const;

// Type definitions for constants
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
export type ScreenName = typeof SCREEN_NAMES[keyof typeof SCREEN_NAMES];
